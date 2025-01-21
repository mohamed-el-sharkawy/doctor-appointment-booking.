import { Module } from '@nestjs/common';
import { AppointmentController } from './presentation/controllers/appointment.controller';
import { AppointmentRepository } from './infrastructure/repositories/appointment.repository';
import { BookAppointmentUseCase } from './core/domain/use-cases/book-appointment.use-case';
import { ListAvailableSlotsUseCase } from './core/domain/use-cases/list-available-slots.use-case';

@Module({
  controllers: [AppointmentController],
  providers: [
    AppointmentRepository,
    BookAppointmentUseCase,
    ListAvailableSlotsUseCase,
  ],
})
export class AppointmentBookingModule {}