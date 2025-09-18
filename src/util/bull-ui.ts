import Queue from 'bull';
import { ConfigService } from '@nestjs/config';
import { NestApplication } from '@nestjs/core';
import { createBullBoard } from '@bull-board/api';
import { BullAdapter } from '@bull-board/api/bullAdapter';
import { ExpressAdapter as BullBoardExpressAdapter } from '@bull-board/express';

const BullBoardUI = (app: NestApplication): void => {
  const configService = app.get(ConfigService);
  const redis = {
    port: configService.get('REDIS_PORT') || 6379,
    host: configService.get('REDIS_URL'),
  };

  const notificationProcess = new Queue('notification-queue', { redis });
  const slaProcess = new Queue('sla-queue', { redis });

  const serverAdapter = new BullBoardExpressAdapter();
  createBullBoard({
    queues: [
      new BullAdapter(notificationProcess, { readOnlyMode: false }),
      new BullAdapter(slaProcess, { readOnlyMode: false }),
    ],
    serverAdapter: serverAdapter,
  });

  serverAdapter.setBasePath('/queues/ui');
  app.use('/queues/ui', serverAdapter.getRouter());
};

export default BullBoardUI;
