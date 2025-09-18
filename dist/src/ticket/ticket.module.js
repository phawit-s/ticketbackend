"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TicketModule = void 0;
const common_1 = require("@nestjs/common");
const ticket_service_1 = require("./ticket.service");
const ticket_controller_1 = require("./ticket.controller");
const prisma_module_1 = require("../prisma/prisma.module");
const bull_1 = require("@nestjs/bull");
const bull_config_1 = require("../config/bull.config");
const notify_consumer_1 = require("./notify.consumer");
const ticketsla_consumer_1 = require("./ticketsla.consumer");
let TicketModule = class TicketModule {
};
exports.TicketModule = TicketModule;
exports.TicketModule = TicketModule = __decorate([
    (0, common_1.Module)({
        imports: [
            prisma_module_1.PrismaModule,
            bull_1.BullModule.registerQueueAsync({
                name: 'notification-queue',
                useClass: bull_config_1.BullConfigService,
            }),
            bull_1.BullModule.registerQueueAsync({
                name: 'sla-queue',
                useClass: bull_config_1.BullConfigService,
            }),
        ],
        controllers: [ticket_controller_1.TicketController],
        providers: [ticket_service_1.TicketService, notify_consumer_1.NotifyConsumer, ticketsla_consumer_1.TicketSLAConsumer],
    })
], TicketModule);
//# sourceMappingURL=ticket.module.js.map