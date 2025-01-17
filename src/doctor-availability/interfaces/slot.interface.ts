export interface Slot {
  id?: string;
  time: Date;
  doctorId: string;
  doctorName: string;
  isReserved: boolean;
  cost: number;
  createdAt?: Date;
  updatedAt?: Date;
}
