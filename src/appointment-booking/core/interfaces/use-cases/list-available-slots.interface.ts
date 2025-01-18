export interface ListAvailableSlotsInterface {
  execute(): Promise<AvailableSlotDto[]>;
}

export interface AvailableSlotDto {
  id: string; 
  time: Date;
  doctorId: string; 
  doctorName: string;
  isReserved: boolean;
  cost: number;
}