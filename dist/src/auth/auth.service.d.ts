import { PrismaService } from 'src/prisma/prisma.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
export declare class AuthService {
    private prisma;
    constructor(prisma: PrismaService);
    login(data: LoginDto): Promise<{
        statusCode: number;
        messageTh: string;
        messageEn: string;
        accessToken?: undefined;
        refreshToken?: undefined;
    } | {
        statusCode: number;
        messageTh: string;
        messageEn: string;
        accessToken: string | null;
        refreshToken: string | null;
    }>;
    register(data: RegisterDto): Promise<{
        statusCode: number;
        messageTh: string;
        messageEn: string;
    } | undefined>;
}
