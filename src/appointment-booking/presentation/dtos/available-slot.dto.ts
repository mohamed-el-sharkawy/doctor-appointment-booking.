export class AvailableSlotDto {
    id: string;
    time: Date;
    doctorId: string;
    doctorName: string;
    isReserved: boolean;
    cost: number;
}