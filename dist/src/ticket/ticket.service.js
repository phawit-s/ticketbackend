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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TicketService = void 0;
const common_1 = require("@nestjs/common");
const errorhandle_1 = require("../util/errorhandle");
const prisma_service_1 = require("../prisma/prisma.service");
const bullmq_1 = require("@nestjs/bullmq");
const ticket_enum_1 = require("../enum/ticket.enum");
let TicketService = class TicketService {
    prisma;
    notifyQueue;
    slaQueue;
    constructor(prisma, notifyQueue, slaQueue) {
        this.prisma = prisma;
        this.notifyQueue = notifyQueue;
        this.slaQueue = slaQueue;
    }
    async create(createTicketDto) {
        try {
            const ticket = await this.prisma.ticket.create({ data: createTicketDto });
            const notifyJobId = `notify:${ticket.id}`;
            const slaJobId = `sla:${ticket.id}`;
            await this.notifyQueue.add('notify', { ticketId: ticket.id }, {
                jobId: notifyJobId,
                attempts: 3,
                backoff: { type: 'fixed', delay: 1000 },
                removeOnComplete: false,
            });
            await this.slaQueue.add('sla', { ticketId: ticket.id }, {
                jobId: slaJobId,
                delay: 15 * 60 * 1000,
                removeOnComplete: false,
            });
            return { message: 'Ticket created successfully' };
        }
        catch (error) {
            (0, errorhandle_1.handleError)(error);
        }
    }
    findAll() {
        return this.prisma.ticket.findMany();
    }
    findOne(id) {
        return this.prisma.ticket.findUnique({
            where: { id },
        });
    }
    async update(id, updateTicketDto) {
        const updated = await this.prisma.ticket.update({
            where: { id },
            data: updateTicketDto,
        });
        if (updateTicketDto.status === ticket_enum_1.Status.RESOLVED) {
            const slaJobId = `sla:${id}`;
            await this.slaQueue.removeJobs(slaJobId).catch(async () => {
                const job = await this.slaQueue.getJob(slaJobId);
                if (job) {
                    await job.remove();
                }
            });
        }
        return updated;
    }
    remove(id) {
        return this.prisma.ticket.delete({
            where: { id },
        });
    }
};
exports.TicketService = TicketService;
exports.TicketService = TicketService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, bullmq_1.InjectQueue)('notification-queue')),
    __param(2, (0, bullmq_1.InjectQueue)('sla-queue')),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService, Object, Object])
], TicketService);
//# sourceMappingURL=ticket.service.js.map