import { Injectable } from '@nestjs/common';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { handleError } from 'src/util/errorhandle';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TicketService {
  constructor(private prisma: PrismaService) {}
  async create(createTicketDto: CreateTicketDto) {
    try {
      const ticket = await this.prisma.ticket.create({
        data: createTicketDto,
      });
      return ticket;
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

  update(id: number, updateTicketDto: UpdateTicketDto) {
    return this.prisma.ticket.update({
      where: { id },
      data: updateTicketDto,
    });
  }

  remove(id: number) {
    return this.prisma.ticket.delete({
      where: { id },
    });
  }
}
