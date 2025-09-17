import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(loginDto: LoginDto): Promise<import("@nestjs/common").HttpException | {
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
    register(registerDto: RegisterDto): Promise<{
        statusCode: number;
        messageTh: string;
        messageEn: string;
    } | undefined>;
    validate(req: {
        user: any;
    }): Promise<{
        statusCode: number;
        message: string;
        data: any;
    }>;
}
