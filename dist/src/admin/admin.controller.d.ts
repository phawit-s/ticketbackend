import { AdminService } from './admin.service';
import type { Queue } from 'bull';
export declare class AdminController {
    private readonly adminService;
    private readonly notificationQ;
    private readonly slaQ;
    constructor(adminService: AdminService, notificationQ: Queue, slaQ: Queue);
    private pickQueueByName;
    getStats(name: string): Promise<{
        waiting: number;
        active: number;
        completed: number;
        failed: number;
        delayed: number;
    }>;
}
