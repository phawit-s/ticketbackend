"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bull_1 = __importDefault(require("bull"));
const config_1 = require("@nestjs/config");
const api_1 = require("@bull-board/api");
const bullAdapter_1 = require("@bull-board/api/bullAdapter");
const express_1 = require("@bull-board/express");
const BullBoardUI = (app) => {
    const configService = app.get(config_1.ConfigService);
    const redis = {
        port: configService.get('REDIS_PORT') || 6379,
        host: configService.get('REDIS_URL'),
    };
    const notificationProcess = new bull_1.default('notification-queue', { redis });
    const slaProcess = new bull_1.default('sla-queue', { redis });
    const serverAdapter = new express_1.ExpressAdapter();
    (0, api_1.createBullBoard)({
        queues: [
            new bullAdapter_1.BullAdapter(notificationProcess, { readOnlyMode: false }),
            new bullAdapter_1.BullAdapter(slaProcess, { readOnlyMode: false }),
        ],
        serverAdapter: serverAdapter,
    });
    serverAdapter.setBasePath('/queues/ui');
    app.use('/queues/ui', serverAdapter.getRouter());
};
exports.default = BullBoardUI;
//# sourceMappingURL=bull-ui.js.map