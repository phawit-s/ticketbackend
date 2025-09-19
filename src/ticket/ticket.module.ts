import { Module } from '@nestjs/common';
import { TicketService } from './ticket.service';
import { TicketController } from './ticket.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { BullModule } from '@nestjs/bull';
import { NotifyConsumer } from './notify.consumer';
import { TicketSLAConsumer } from './ticketsla.consumer';

@Module({
  imports: [
    PrismaModule,
    BullModule.registerQueueAsync({
      name: 'notification-queue',
    }),
    BullModule.registerQueueAsync({
      name: 'sla-queue',
    }),
  ],
  controllers: [TicketController],
  providers: [TicketService, NotifyConsumer, TicketSLAConsumer],
})
export class TicketModule { }
