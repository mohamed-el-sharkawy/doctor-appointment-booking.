export interface ListPendingAppointmentsDto {
  id: string;
  slotId: string;
  patientId: string;
  patientName: string;
  reservedAt: Date;
}
