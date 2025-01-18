export interface BookAppointmentInterface {
  slotId: string; 
  patientId: string; 
  patientName: string; // string
  reservedAt: Date; // Date
}

export interface BookAppointmentOutput {
  appointmentId: string; 
  message: string; // Confirmation message
}