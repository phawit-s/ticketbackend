import { TicketService } from './ticket.service';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
export declare class TicketController {
    private readonly ticketService;
    constructor(ticketService: TicketService);
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
    findOne(id: string): import("@prisma/client").Prisma.Prisma__TicketClient<{
        createdAt: Date;
        updatedAt: Date;
        id: number;
        description: string | null;
        title: string;
        status: import("@prisma/client").$Enums.status;
        priority: import("@prisma/client").$Enums.priority;
        accountId: number | null;
    } | null, null, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    update(id: string, updateTicketDto: UpdateTicketDto): Promise<{
        createdAt: Date;
        updatedAt: Date;
        id: number;
        description: string | null;
        title: string;
        status: import("@prisma/client").$Enums.status;
        priority: import("@prisma/client").$Enums.priority;
        accountId: number | null;
    }>;
    remove(id: string): import("@prisma/client").Prisma.Prisma__TicketClient<{
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
