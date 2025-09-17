import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { PrismaService } from 'src/prisma/prisma.service';
export declare class TicketService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createTicketDto: CreateTicketDto): Promise<{
        title: string;
        description: string | null;
        status: import("@prisma/client").$Enums.status;
        priority: import("@prisma/client").$Enums.priority;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        accountId: number | null;
    }>;
    findAll(): import("@prisma/client").Prisma.PrismaPromise<{
        title: string;
        description: string | null;
        status: import("@prisma/client").$Enums.status;
        priority: import("@prisma/client").$Enums.priority;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        accountId: number | null;
    }[]>;
    findOne(id: number): import("@prisma/client").Prisma.Prisma__TicketClient<{
        title: string;
        description: string | null;
        status: import("@prisma/client").$Enums.status;
        priority: import("@prisma/client").$Enums.priority;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        accountId: number | null;
    } | null, null, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    update(id: number, updateTicketDto: UpdateTicketDto): import("@prisma/client").Prisma.Prisma__TicketClient<{
        title: string;
        description: string | null;
        status: import("@prisma/client").$Enums.status;
        priority: import("@prisma/client").$Enums.priority;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        accountId: number | null;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    remove(id: number): import("@prisma/client").Prisma.Prisma__TicketClient<{
        title: string;
        description: string | null;
        status: import("@prisma/client").$Enums.status;
        priority: import("@prisma/client").$Enums.priority;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        accountId: number | null;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
}
