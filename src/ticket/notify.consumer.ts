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

@Processor('notification-queue')
export class NotifyConsumer {
  constructor(private prisma: PrismaService) {}

  @Process('notify')
  async notifysend(job: Job) {
    Logger.log(`[Notify] ticketId=${job.data.ticketId} (jobId=${job.id})`);
    return true;
  }

  @OnQueueActive()
  onActive(job: Job) {
    Logger.debug(`[Notify] active jobId=${job.id} name=${job.name}`);
  }

  @OnQueueCompleted()
  onCompleted(job: Job) {
    Logger.debug(`[Notify] completed jobId=${job.id}`);
  }

  @OnQueueFailed()
  onFailed(job: Job, err: Error) {
    Logger.error(`[Notify] failed jobId=${job.id} err=${err?.message}`);
  }

  @OnQueueError()
  onQueueError(err: Error) {
    Logger.error(`[Notify] queue error: ${err?.message}`);
  }
}
