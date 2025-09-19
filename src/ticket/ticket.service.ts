import { Injectable } from '@nestjs/common';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { handleError } from 'src/util/errorhandle';
import { PrismaService } from 'src/prisma/prisma.service';
import { InjectQueue } from '@nestjs/bullmq';
import type { Queue } from 'bull';
import { Status } from 'src/enum/ticket.enum';

@Injectable()
export class TicketService {
  constructor(
    private prisma: PrismaService,
    @InjectQueue('notification-queue')
    private notifyQueue: Queue,

    @InjectQueue('sla-queue')
    private slaQueue: Queue,
  ) {}
  async create(createTicketDto: CreateTicketDto) {
    try {
      const ticket = await this.prisma.ticket.create({ data: createTicketDto });

      const notifyJobId = `notify:${ticket.id}`;
      const slaJobId = `sla:${ticket.id}`;

      await this.notifyQueue.add(
        'notify',
        { ticketId: ticket.id },
        {
          jobId: notifyJobId,
          attempts: 3,
          backoff: { type: 'fixed', delay: 1000 },
          removeOnComplete: false,
        },
      );

      await this.slaQueue.add(
        'sla',
        { ticketId: ticket.id },
        {
          jobId: slaJobId,
          delay: 15 * 60 * 1000,
          removeOnComplete: false,
        },
      );
      return { message: 'Ticket created successfully' };
    } catch (error) {
      handleError(error);
    }
  }

  findAll() {
    return this.prisma.ticket.findMany();
  }

  findOne(id: number) {
    return this.prisma.ticket.findUnique({
      where: { id },
    });
  }

  async update(id: number, updateTicketDto: UpdateTicketDto) {
    // อัปเดต DB ก่อน (กัน race กับ worker)
    const updated = await this.prisma.ticket.update({
      where: { id },
      data: updateTicketDto,
    });

    if (updateTicketDto.status === Status.RESOLVED) {
      const slaJobId = `sla:${id}`;

      await this.slaQueue.removeJobs(slaJobId).catch(async () => {
        const job = await this.slaQueue.getJob(slaJobId);
        if (job) {
          await job.remove();
        }
      });
    }

    return updated;
  }

  remove(id: number) {
    return this.prisma.ticket.delete({
      where: { id },
    });
  }
}
