import { Global, Module } from '@nestjs/common';

import { PrismaModule } from 'src/prisma/prisma.module';
import { AuthModel } from './authmodel';

@Global()
@Module({
  imports: [PrismaModule],
  providers: [AuthModel],
  exports: [AuthModel],
})
export class ModelModule {}
