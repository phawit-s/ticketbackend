import { NestApplication, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import BullBoardUI from './util/bull-ui';

async function bootstrap() {
  const app = await NestFactory.create<NestApplication>(AppModule);
  BullBoardUI(app);
  const config = new DocumentBuilder()
    .setTitle('Ticket API')
    .setDescription('API documentation for Ticket Service')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(process.env.PORT ?? 3000);
}
void bootstrap();
