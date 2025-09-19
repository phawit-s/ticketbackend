import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { AdminService } from './admin.service';
import type { Queue } from 'bull';
import { InjectQueue } from '@nestjs/bull';
import { handleError, handleNotfound } from 'src/util/errorhandle';
import { AuthGuard } from 'src/guard/auth.guard';

@Controller('admin/queues')
export class AdminController {
  constructor(
    private readonly adminService: AdminService,
    @InjectQueue('notification-queue') private readonly notificationQ: Queue,
    @InjectQueue('sla-queue') private readonly slaQ: Queue,
  ) { }

  private pickQueueByName(name: string): Queue {
    switch (name) {
      case 'notification-queue':
        return this.notificationQ;
      case 'sla-queue':
        return this.slaQ;
      default:
        handleNotfound('ไม่พบคิวที่ระบุ', 'Queue not found');
    }
  }

  @Get(':name/stats')
  @UseGuards(AuthGuard)
  async getStats(@Param('name') name: string) {
    try {
      const q = this.pickQueueByName(name);
      const counts = await q.getJobCounts();

      const {
        waiting = 0,
        active = 0,
        completed = 0,
        failed = 0,
        delayed = 0,
      } = counts;

      return { data: { waiting, active, completed, failed, delayed } };
    } catch (err) {
      return handleError(err);
    }
  }
}
