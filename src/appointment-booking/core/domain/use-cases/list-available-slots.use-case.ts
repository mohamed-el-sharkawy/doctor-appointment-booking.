import { AppointmentRepositoryInterface } from '../repositories/appointment.repository-interface';

export class ListAvailableSlotsUseCase {
  constructor(private readonly appointmentRepository: AppointmentRepositoryInterface) {}

  async execute(): Promise<AvailableSlot[]> {
    return await this.appointmentRepository.findAvailableSlots();
  }
}