import { Controller, Get, Post, Body } from '@nestjs/common';
import { BookAppointmentDto } from '../dtos/book-appointment.dto';
import { AvailableSlotDto } from '../dtos/available-slot.dto';
import { ListAvailableSlotsUseCase } from '../../core/domain/use-cases/list-available-slots.use-case';
import { BookAppointmentUseCase } from '../../core/domain/use-cases/book-appointment.use-case';

@Controller('appointments')
export class AppointmentController {
  constructor(
    private readonly listAvailableSlotsUseCase: ListAvailableSlotsUseCase,
    private readonly bookAppointmentUseCase: BookAppointmentUseCase,
  ) {}

  @Get('available-slots')
  async getAvailableSlots(): Promise<AvailableSlotDto[]> {
    return this.listAvailableSlotsUseCase.execute();
  }

  @Post('book')
  async bookAppointment(@Body() bookAppointmentDto: BookAppointmentDto): Promise<void> {
    return this.bookAppointmentUseCase.execute(bookAppointmentDto);
  }
}