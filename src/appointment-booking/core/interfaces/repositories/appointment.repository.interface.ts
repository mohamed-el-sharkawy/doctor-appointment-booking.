export interface AppointmentRepositoryInterface {
  save(appointment: Appointment): Promise<Appointment>;
  findById(id: string): Promise<Appointment | null>;
  findAll(): Promise<Appointment[]>;
  findBySlotId(slotId: string): Promise<Appointment[]>;
  delete(id: string): Promise<void>;
}