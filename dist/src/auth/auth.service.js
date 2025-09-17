"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const auth_1 = require("../util/auth");
const errorhandle_1 = require("../util/errorhandle");
let AuthService = class AuthService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async login(data) {
        try {
            const { email, password } = data;
            const findemail = await this.prisma.account.findUnique({
                where: { email: email },
            });
            if (!findemail) {
                return {
                    statusCode: 400,
                    messageTh: 'ไม่พบอีเมลในระบบ',
                    messageEn: 'No email found',
                };
            }
            const user = await (0, auth_1.comparePasswords)(password, findemail.password);
            if (!user) {
                return (0, errorhandle_1.handleunauthorize)('อีเมล์/รหัสผ่านไม่ถูกต้อง', 'Email/Password is incorrect');
            }
            const newdata = {
                id: findemail.id,
                email: findemail.email,
                fname: findemail.fname,
                lname: findemail.lname,
                role: findemail.role,
            };
            const accessToken = await (0, auth_1.createAccessToken)(newdata);
            const refreshToken = await (0, auth_1.createRefreshToken)(newdata);
            return {
                statusCode: 200,
                messageTh: 'เข้าสู่ระบบสำเร็จ',
                messageEn: 'Login successfully',
                accessToken: accessToken,
                refreshToken: refreshToken,
            };
        }
        catch (error) {
            if (error instanceof common_1.HttpException)
                throw error;
            (0, errorhandle_1.handleError)(error);
        }
    }
    async register(data) {
        try {
            const [findemail] = await Promise.all([
                this.prisma.account.findUnique({
                    where: { email: data.email },
                }),
            ]);
            if (findemail) {
                (0, errorhandle_1.handleNotfound)('อีเมลซ้ำกับในระบบ', 'Duplicate email found');
                return;
            }
            const gethashpassword = await (0, auth_1.hashPassword)(data.password);
            await this.prisma.$transaction(async (tx) => {
                const createdata = await tx.account.create({
                    data: {
                        fname: data.fname,
                        lname: data.lname,
                        email: data.email,
                        password: gethashpassword,
                        role: 'USER',
                    },
                });
                if (!createdata) {
                    (0, errorhandle_1.handleError)('ลงทะเบียนไม่สำเร็จ');
                }
            });
            return {
                statusCode: 200,
                messageTh: 'ลงทะเบียนสำเร็จ',
                messageEn: 'Register successfully',
            };
        }
        catch (error) {
            console.log(error);
            return (0, errorhandle_1.handleError)(error);
        }
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AuthService);
//# sourceMappingURL=auth.service.js.map