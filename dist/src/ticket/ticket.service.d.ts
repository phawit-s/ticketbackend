import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import type { Queue } from 'bull';
export declare class TicketService {
    private prisma;
    private notifyQueue;
    private slaQueue;
    constructor(prisma: PrismaService, notifyQueue: Queue, slaQueue: Queue);
    create(createTicketDto: CreateTicketDto): Promise<{
        message: string;
    }>;
    findAll(): import("@prisma/client").Prisma.PrismaPromise<{
        createdAt: Date;
        updatedAt: Date;
        id: number;
        description: string | null;
        title: string;
        status: import("@prisma/client").$Enums.status;
        priority: import("@prisma/client").$Enums.priority;
        accountId: number | null;
    }[]>;
    findOne(id: number): import("@prisma/client").Prisma.Prisma__TicketClient<{
        createdAt: Date;
        updatedAt: Date;
        id: number;
        description: string | null;
        title: string;
        status: import("@prisma/client").$Enums.status;
        priority: import("@prisma/client").$Enums.priority;
        accountId: number | null;
    } | null, null, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    update(id: number, updateTicketDto: UpdateTicketDto): Promise<{
        createdAt: Date;
        updatedAt: Date;
        id: number;
        description: string | null;
        title: string;
        status: import("@prisma/client").$Enums.status;
        priority: import("@prisma/client").$Enums.priority;
        accountId: number | null;
    }>;
    remove(id: number): import("@prisma/client").Prisma.Prisma__TicketClient<{
        createdAt: Date;
        updatedAt: Date;
        id: number;
        description: string | null;
        title: string;
        status: import("@prisma/client").$Enums.status;
        priority: import("@prisma/client").$Enums.priority;
        accountId: number | null;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
}
