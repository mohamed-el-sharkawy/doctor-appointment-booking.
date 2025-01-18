export interface BookAppointmentInterface {
  slotId: string; 
  patientId: string; 
  patientName: string;
  reservedAt: Date; 
}

export interface BookAppointmentOutput {
  appointmentId: string; 
  message: string; 
}