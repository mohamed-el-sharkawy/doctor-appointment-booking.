import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { DoctorAvailabilityService } from './doctor-availability.service';
import { DoctorAvailabilityController } from './doctor-availability.controller';
import { SlotModel } from './models/slot.model';
import { SlotRepository } from './repositories/slot.repository';

@Module({
  imports: [SequelizeModule.forFeature([SlotModel])],
  providers: [
    DoctorAvailabilityService,
    SlotRepository,
    {
      provide: 'SLOT_REPOSITORY',
      useExisting: SlotRepository,
    },
  ],
  controllers: [DoctorAvailabilityController],
})
export class DoctorAvailabilityModule {}
