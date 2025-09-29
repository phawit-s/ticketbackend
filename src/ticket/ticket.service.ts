import { Injectable } from "@nestjs/common"
import { CreateTicketDto } from "./dto/create-ticket.dto"
import { UpdateTicketDto } from "./dto/update-ticket.dto"
import { handleError } from "src/util/errorhandle"
import { PrismaService } from "src/prisma/prisma.service"
import { InjectQueue } from "@nestjs/bullmq"
import type { Queue } from "bull"
import { Status } from "src/enum/ticket.enum"

@Injectable()
export class TicketService {
  constructor(
    private prisma: PrismaService,
    @InjectQueue("notification-queue")
    private notifyQueue: Queue,

    @InjectQueue("sla-queue")
    private slaQueue: Queue,
  ) { }
  async create(createTicketDto: CreateTicketDto) {
    try {
      const ticket = await this.prisma.ticket.create({ data: createTicketDto })

      const notifyJobId = `notify:${ticket.id}`
      const slaJobId = `sla:${ticket.id}`

      await this.notifyQueue.add(
        "notify",
        { ticketId: ticket.id },
        {
          jobId: notifyJobId,
          attempts: 3,
          backoff: { type: "fixed", delay: 1000 },
          removeOnComplete: false,
        },
      )

      await this.slaQueue.add(
        "sla",
        { ticketId: ticket.id },
        {
          jobId: slaJobId,
          delay: 15 * 60 * 1000,
          removeOnComplete: false,
        },
      )
      return { message: "Ticket created successfully" }
    } catch (error) {
      handleError(error)
    }
  }

  async findAll(params: {
    status?: string
    priority?: string
    search?: string
    page?: number
    pageSize?: number
    sortBy?: string
    sortOrder?: "asc" | "desc"
  }) {
    const {
      status,
      priority,
      search,
      page = 1,
      pageSize = 10,
      sortBy = "createdAt",
      sortOrder = "desc",
    } = params

    const where: any = {}

    if (status) {
      where.status = status
    }

    if (priority) {
      where.priority = priority
    }

    if (search) {
      where.OR = [
        { title: { contains: search, mode: "insensitive" } },
        { description: { contains: search, mode: "insensitive" } },
      ]
    }

    const [data, total] = await this.prisma.$transaction([
      this.prisma.ticket.findMany({
        where,
        skip: (page - 1) * pageSize,
        take: pageSize,
        orderBy: { [sortBy]: sortOrder },
      }),
      this.prisma.ticket.count({ where }),
    ])

    return {
      data,
      messageEN: "Tickets retrieved successfully",
      messageTH: "ดึงข้อมูลตั๋วสำเร็จ",
      total,
      page,
      pageSize,
    }
  }

  async findOne(id: number) {
    const data = await this.prisma.ticket.findUnique({
      where: { id },
    })
    return { data }
  }

  async update(id: number, updateTicketDto: UpdateTicketDto) {
    const updated = await this.prisma.ticket.update({
      where: { id },
      data: updateTicketDto,
    })

    if (updateTicketDto.status === Status.RESOLVED) {
      const slaJobId = `sla:${id}`

      await this.slaQueue.removeJobs(slaJobId).catch(async () => {
        const job = await this.slaQueue.getJob(slaJobId)
        if (job) {
          await job.remove()
        }
      })
    }

    return updated
  }

  async remove(id: number) {
    const deletedata = await this.prisma.ticket.delete({
      where: { id },
    })
    const slaJobId = `sla:${id}`

    await this.slaQueue.removeJobs(slaJobId).catch(async () => {
      const job = await this.slaQueue.getJob(slaJobId)
      if (job) {
        await job.remove()
      }
    })
    return deletedata
  }
}
