export class AvailableSlot {
  id: string; 
  time: Date;
  doctorId: string; 
  doctorName: string;
  isReserved: boolean;
  cost: number;

  constructor(id: string, time: Date, doctorId: string, doctorName: string, isReserved: boolean, cost: number) {
    this.id = id;
    this.time = time;
    this.doctorId = doctorId;
    this.doctorName = doctorName;
    this.isReserved = isReserved;
    this.cost = cost;
  }
}