import { Job } from 'bullmq';
import { PrismaService } from 'src/prisma/prisma.service';
export declare class NotifyConsumer {
    private prisma;
    constructor(prisma: PrismaService);
    notifysend(job: Job): Promise<boolean>;
    onActive(job: Job): void;
    onCompleted(job: Job): void;
    onFailed(job: Job, err: Error): void;
    onQueueError(err: Error): void;
}
