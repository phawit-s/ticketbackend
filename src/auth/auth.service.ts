import { HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  comparePasswords,
  createAccessToken,
  createRefreshToken,
  hashPassword,
} from 'src/util/auth';
import {
  handleError,
  handleNotfound,
  handleUnauthorize,
} from 'src/util/errorhandle';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async login(data: LoginDto) {
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

      const user = await comparePasswords(password, findemail.password);
      if (!user) {
        return handleUnauthorize(
          'อีเมล์/รหัสผ่านไม่ถูกต้อง',
          'Email/Password is incorrect',
        );
      }

      const newdata = {
        id: findemail.id,
        email: findemail.email,
        fname: findemail.fname,
        lname: findemail.lname,
        role: findemail.role,
      };
      const accessToken = await createAccessToken(newdata);
      const refreshToken = await createRefreshToken(newdata);

      return {
        statusCode: 200,
        messageTh: 'เข้าสู่ระบบสำเร็จ',
        messageEn: 'Login successfully',
        accessToken: accessToken,
        refreshToken: refreshToken,
      };
    } catch (error) {
      if (error instanceof HttpException) throw error;
      handleError(error);
    }
  }

  async register(data: RegisterDto) {
    try {
      const [findemail] = await Promise.all([
        this.prisma.account.findUnique({
          where: { email: data.email },
        }),
      ]);
      if (findemail) {
        handleNotfound('อีเมลซ้ำกับในระบบ', 'Duplicate email found');
        return;
      }

      const gethashpassword = await hashPassword(data.password);
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
          handleError('ลงทะเบียนไม่สำเร็จ');
        }
      });
      return {
        statusCode: 200,
        messageTh: 'ลงทะเบียนสำเร็จ',
        messageEn: 'Register successfully',
      };
    } catch (error) {
      console.log(error);

      return handleError(error);
    }
  }
}
