import {
  OnQueueActive,
  OnQueueCompleted,
  OnQueueError,
  OnQueueFailed,
  Process,
  Processor,
} from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { Job } from 'bullmq';
import { PrismaService } from 'src/prisma/prisma.service';

@Processor('sla-queue')
export class TicketSLAConsumer {
  constructor(private prisma: PrismaService) {}

  @Process('sla')
  async handle(job: Job<{ ticketId: number }>) {
    const { ticketId } = job.data;
    const ticket = await this.prisma.ticket.findUnique({
      where: { id: ticketId },
    });
    if (!ticket) {
      Logger.warn(`[SLA] ticket not found id=${ticketId}`);
      return;
    }

    if (ticket.status === 'RESOLVED') {
      Logger.log(`[SLA] skip (already RESOLVED) ticketId=${ticketId}`);
      return true;
    }

    Logger.log(`[SLA] ticket found id=${ticketId}`);

    return true;
  }

  @OnQueueActive()
  onActive(job: Job): void {
    Logger.debug(`Processing job ${job.id} of type ${job.name}`);
  }

  @OnQueueCompleted()
  async onGlobalCompleted(job: Job): Promise<void> {
    Logger.debug(`on completed: job ${job.id} of type ${job.name}`);
  }

  @OnQueueError()
  onQueueError(error: Error): void {
    Logger.error(`on error: job -> error: ${error}`);
  }

  @OnQueueFailed()
  onQueueFailed(job: Job, error: Error): void {
    Logger.error(
      `on fail: job  ${job.id} of type ${job.name} -> result: ${error} with data ${job.data.data.status}`,
    );
  }
}
