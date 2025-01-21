import { Module } from '@nestjs/common';
import { AppointmentManagementController } from './adaptors/appointment-management.controller';
import { AppointmentManagementService } from './core/domain/appointment-management.service';

@Module({
  imports: [],
  providers: [AppointmentManagementService],
  controllers: [AppointmentManagementController],
})
export class AppointmentManagementModule {}
