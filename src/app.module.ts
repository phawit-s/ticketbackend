import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TicketModule } from './ticket/ticket.module';
import { AuthModule } from './auth/auth.module';
import { ModelModule } from './model';

@Module({
  imports: [TicketModule, AuthModule, ModelModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
