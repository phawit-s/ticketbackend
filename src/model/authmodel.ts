import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthModel {
  constructor(private readonly db: PrismaService) {}

  async findOneByEmail(email: string) {
    try {
      const find = await this.db.account.findFirst({
        where: {
          email: email,
        },
        omit: {
          password: true,
          accessToken: true,
          refreshToken: true,
        },
      });

      return find;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}
