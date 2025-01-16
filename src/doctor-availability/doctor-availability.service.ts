import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { Slot, ISlotRepository } from './interfaces/slot.interface';

@Injectable()
export class DoctorAvailabilityService {
  constructor(
    @Inject('SLOT_REPOSITORY')
    private readonly slotRepository: ISlotRepository,
  ) {}

  async findAll(): Promise<Slot[]> {
    return this.slotRepository.findAll();
  }

  async findOne(id: string): Promise<Slot> {
    return this.slotRepository.findOne(id);
  }

  async create(slot: Slot): Promise<Slot> {
    const slots = await this.getByTime(slot.time);
    if (slots.length > 0) {
      throw new BadRequestException('Slot already exists');
    }
    return this.slotRepository.create(slot);
  }

  async update(id: string, slot: Slot): Promise<Slot[]> {
    const existingSlot = await this.getByTime(slot.time)[0];
    const existingSlotId = existingSlot?.id;
    if (existingSlotId && existingSlotId !== id) {
      throw new BadRequestException('Slot time is already occupied');
    }
    return this.slotRepository.update(id, slot);
  }

  async delete(id: string): Promise<boolean> {
    return this.slotRepository.delete(id);
  }

  async getByTime(time: Date): Promise<Slot[]> {
    return this.slotRepository.getByTime(time);
  }
}
