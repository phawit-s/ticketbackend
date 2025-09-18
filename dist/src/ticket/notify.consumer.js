"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotifyConsumer = void 0;
const bull_1 = require("@nestjs/bull");
const common_1 = require("@nestjs/common");
const bullmq_1 = require("bullmq");
const prisma_service_1 = require("../prisma/prisma.service");
let NotifyConsumer = class NotifyConsumer {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async notifysend(job) {
        common_1.Logger.log(`[Notify] ticketId=${job.data.ticketId} (jobId=${job.id})`);
        return true;
    }
    onActive(job) {
        common_1.Logger.debug(`[Notify] active jobId=${job.id} name=${job.name}`);
    }
    onCompleted(job) {
        common_1.Logger.debug(`[Notify] completed jobId=${job.id}`);
    }
    onFailed(job, err) {
        common_1.Logger.error(`[Notify] failed jobId=${job.id} err=${err?.message}`);
    }
    onQueueError(err) {
        common_1.Logger.error(`[Notify] queue error: ${err?.message}`);
    }
};
exports.NotifyConsumer = NotifyConsumer;
__decorate([
    (0, bull_1.Process)('notify'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [bullmq_1.Job]),
    __metadata("design:returntype", Promise)
], NotifyConsumer.prototype, "notifysend", null);
__decorate([
    (0, bull_1.OnQueueActive)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [bullmq_1.Job]),
    __metadata("design:returntype", void 0)
], NotifyConsumer.prototype, "onActive", null);
__decorate([
    (0, bull_1.OnQueueCompleted)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [bullmq_1.Job]),
    __metadata("design:returntype", void 0)
], NotifyConsumer.prototype, "onCompleted", null);
__decorate([
    (0, bull_1.OnQueueFailed)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [bullmq_1.Job, Error]),
    __metadata("design:returntype", void 0)
], NotifyConsumer.prototype, "onFailed", null);
__decorate([
    (0, bull_1.OnQueueError)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Error]),
    __metadata("design:returntype", void 0)
], NotifyConsumer.prototype, "onQueueError", null);
exports.NotifyConsumer = NotifyConsumer = __decorate([
    (0, bull_1.Processor)('notification-queue'),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], NotifyConsumer);
//# sourceMappingURL=notify.consumer.js.map