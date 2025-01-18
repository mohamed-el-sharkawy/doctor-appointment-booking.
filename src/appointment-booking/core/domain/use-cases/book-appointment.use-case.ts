import { v4 as uuidv4 } from 'uuid';

export class BookAppointmentUseCase {
    constructor(private appointmentRepository: AppointmentRepositoryInterface) {}

    async execute(slotId: string, patientId: string, patientName: string, reservedAt: Date): Promise<Appointment> {
        const appointment = new Appointment();
        appointment.id = uuidv4;
        appointment.slotId = slotId;
        appointment.patientId = patientId;
        appointment.patientName = patientName;
        appointment.reservedAt = reservedAt;

        return await this.appointmentRepository.save(appointment);
    }

    
}