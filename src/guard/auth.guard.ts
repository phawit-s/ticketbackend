import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpException,
} from '@nestjs/common';
import { AuthModel } from 'src/model/authmodel';
import { decodeToken } from 'src/util/auth';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(public authModel: AuthModel) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    if ((await this.validateRequest(request)) === true) {
      return await this.validateRequest(request);
    } else {
      throw new HttpException(
        {
          messageEn: 'Forbidden resource',
          messageTh: 'คุณไม่มีสิทธิ์เข้าถึงข้อมูล',
          statusCode: 403,
        },
        403,
      );
    }
  }

  private async validateRequest(request: any): Promise<boolean> {
    const headerAuth = request.headers['authorization'];

    if (headerAuth) {
      try {
        const token = headerAuth.split(' ')[1];

        const decodedata = await decodeToken(token);

        if (decodedata) {
          const userdata = await this.authModel.findOneByEmail(
            decodedata.email,
          );

          if (userdata) {
            request.user = { ...userdata };
            return true;
          } else {
            return false;
          }
        } else {
          return false;
        }
      } catch (error) {
        console.log('error at validate auth token');
        console.error(error);
        return false;
      }
    }

    return false;
  }
}
