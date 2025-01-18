import { Appointment } from 'src/appointment-management/interfaces/Appointment';

export interface ListAppointments {
  listAppointments(): Promise<Appointment[]>;
}
