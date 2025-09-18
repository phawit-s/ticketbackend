import { Module } from '@nestjs/common';
import { TicketService } from './ticket.service';
import { TicketController } from './ticket.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { BullModule } from '@nestjs/bull';
import { BullConfigService } from 'src/config/bull.config';
import { NotifyConsumer } from './notify.consumer';
import { TicketSLAConsumer } from './ticketsla.consumer';

@Module({
  imports: [
    PrismaModule,

    BullModule.registerQueueAsync({
      name: 'notification-queue',
      useClass: BullConfigService,
    }),
    BullModule.registerQueueAsync({
      name: 'sla-queue',
      useClass: BullConfigService,
    }),
  ],
  controllers: [TicketController],
  providers: [TicketService, NotifyConsumer, TicketSLAConsumer],
})
export class TicketModule {}
