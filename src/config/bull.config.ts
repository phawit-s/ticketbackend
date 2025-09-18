import { BullModuleOptions, BullOptionsFactory } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class BullConfigService implements BullOptionsFactory {
  constructor(private readonly configService: ConfigService) {}
  createBullOptions(): Promise<BullModuleOptions> | BullModuleOptions {
    return {
      redis: {
        host: this.configService.get<string>('REDIS_URL'),
        port: this.configService.get<number>('REDIS_PORT') || 6379,
      },
    };
  }
}
