import { Job } from 'bullmq';
import { PrismaService } from 'src/prisma/prisma.service';
export declare class TicketSLAConsumer {
    private prisma;
    constructor(prisma: PrismaService);
    handle(job: Job<{
        ticketId: number;
    }>): Promise<true | undefined>;
    onActive(job: Job): void;
    onGlobalCompleted(job: Job): Promise<void>;
    onQueueError(error: Error): void;
    onQueueFailed(job: Job, error: Error): void;
}
