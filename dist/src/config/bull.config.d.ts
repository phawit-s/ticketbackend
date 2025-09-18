import { BullModuleOptions, BullOptionsFactory } from '@nestjs/bull';
import { ConfigService } from '@nestjs/config';
export declare class BullConfigService implements BullOptionsFactory {
    private readonly configService;
    constructor(configService: ConfigService);
    createBullOptions(): Promise<BullModuleOptions> | BullModuleOptions;
}
