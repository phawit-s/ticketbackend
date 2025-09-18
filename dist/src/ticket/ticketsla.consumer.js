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
exports.TicketSLAConsumer = void 0;
const bull_1 = require("@nestjs/bull");
const common_1 = require("@nestjs/common");
const bullmq_1 = require("bullmq");
const prisma_service_1 = require("../prisma/prisma.service");
let TicketSLAConsumer = class TicketSLAConsumer {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async handle(job) {
        const { ticketId } = job.data;
        const ticket = await this.prisma.ticket.findUnique({
            where: { id: ticketId },
        });
        if (!ticket) {
            common_1.Logger.warn(`[SLA] ticket not found id=${ticketId}`);
            return;
        }
        if (ticket.status === 'RESOLVED') {
            common_1.Logger.log(`[SLA] skip (already RESOLVED) ticketId=${ticketId}`);
            return true;
        }
        common_1.Logger.log(`[SLA] ticket found id=${ticketId}`);
        return true;
    }
    onActive(job) {
        common_1.Logger.debug(`Processing job ${job.id} of type ${job.name}`);
    }
    async onGlobalCompleted(job) {
        console.log(job);
        common_1.Logger.debug(`on completed: job ${job.id} of type ${job.name}`);
    }
    onQueueError(error) {
        common_1.Logger.error(`on error: job -> error: ${error}`);
    }
    onQueueFailed(job, error) {
        common_1.Logger.error(`on fail: job  ${job.id} of type ${job.name} -> result: ${error} with data ${job.data.data.status}`);
    }
};
exports.TicketSLAConsumer = TicketSLAConsumer;
__decorate([
    (0, bull_1.Process)('sla'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [bullmq_1.Job]),
    __metadata("design:returntype", Promise)
], TicketSLAConsumer.prototype, "handle", null);
__decorate([
    (0, bull_1.OnQueueActive)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [bullmq_1.Job]),
    __metadata("design:returntype", void 0)
], TicketSLAConsumer.prototype, "onActive", null);
__decorate([
    (0, bull_1.OnQueueCompleted)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [bullmq_1.Job]),
    __metadata("design:returntype", Promise)
], TicketSLAConsumer.prototype, "onGlobalCompleted", null);
__decorate([
    (0, bull_1.OnQueueError)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Error]),
    __metadata("design:returntype", void 0)
], TicketSLAConsumer.prototype, "onQueueError", null);
__decorate([
    (0, bull_1.OnQueueFailed)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [bullmq_1.Job, Error]),
    __metadata("design:returntype", void 0)
], TicketSLAConsumer.prototype, "onQueueFailed", null);
exports.TicketSLAConsumer = TicketSLAConsumer = __decorate([
    (0, bull_1.Processor)('sla-queue'),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], TicketSLAConsumer);
//# sourceMappingURL=ticketsla.consumer.js.map