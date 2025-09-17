import { PrismaService } from 'src/prisma/prisma.service';
export declare class AuthModel {
    private readonly db;
    constructor(db: PrismaService);
    findOneByEmail(email: string): Promise<{
        email: string;
        fname: string | null;
        lname: string | null;
        role: import("@prisma/client").$Enums.role;
        createdAt: Date;
        updatedAt: Date;
        id: number;
    } | null>;
}
