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
exports.AdminController = void 0;
const common_1 = require("@nestjs/common");
const admin_service_1 = require("./admin.service");
const bull_1 = require("@nestjs/bull");
const errorhandle_1 = require("../util/errorhandle");
let AdminController = class AdminController {
    adminService;
    notificationQ;
    slaQ;
    constructor(adminService, notificationQ, slaQ) {
        this.adminService = adminService;
        this.notificationQ = notificationQ;
        this.slaQ = slaQ;
    }
    pickQueueByName(name) {
        switch (name) {
            case 'notification-queue':
                return this.notificationQ;
            case 'sla-queue':
                return this.slaQ;
            default:
                (0, errorhandle_1.handleNotfound)('ไม่พบคิวที่ระบุ', 'Queue not found');
        }
    }
    async getStats(name) {
        try {
            const q = this.pickQueueByName(name);
            const counts = await q.getJobCounts();
            const { waiting = 0, active = 0, completed = 0, failed = 0, delayed = 0, } = counts;
            return { waiting, active, completed, failed, delayed };
        }
        catch (err) {
            return (0, errorhandle_1.handleError)(err);
        }
    }
};
exports.AdminController = AdminController;
__decorate([
    (0, common_1.Get)(':name/stats'),
    __param(0, (0, common_1.Param)('name')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "getStats", null);
exports.AdminController = AdminController = __decorate([
    (0, common_1.Controller)('admin/queues'),
    __param(1, (0, bull_1.InjectQueue)('notification-queue')),
    __param(2, (0, bull_1.InjectQueue)('sla-queue')),
    __metadata("design:paramtypes", [admin_service_1.AdminService, Object, Object])
], AdminController);
//# sourceMappingURL=admin.controller.js.map