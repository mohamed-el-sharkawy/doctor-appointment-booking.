import { Slot } from './slot.interface';

export interface ISlotRepository {
  findAll(): Promise<Slot[]>;
  findOne(id: string): Promise<Slot>;
  create(slot: Slot): Promise<Slot>;
  update(id: string, slot: Slot): Promise<Slot[]>;
  delete(id: string): Promise<boolean>;
  getByTime(time: Date): Promise<Slot[]>;
  setSlotAsReserved(id: string): Promise<boolean>;
  getAvailableSlots(): Promise<Slot[]>;
}
