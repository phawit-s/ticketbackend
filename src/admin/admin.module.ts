import { Module } from "@nestjs/common"
import { AdminService } from "./admin.service"
import { AdminController } from "./admin.controller"
import { BullModule } from "@nestjs/bull"

@Module({
  imports: [BullModule.registerQueue({ name: "notification-queue" }, { name: "sla-queue" })],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule { }
