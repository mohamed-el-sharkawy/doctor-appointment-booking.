import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { SlotModel } from '../models/slot.model';
import { Slot } from '../interfaces/slot.interface';
import { ISlotRepository } from '../interfaces/slot.interface';
import { Op } from 'sequelize';

@Injectable()
export class SlotRepository implements ISlotRepository {
  constructor(
    @InjectModel(SlotModel)
    private slotModel: typeof SlotModel,
  ) {}

  async findAll(): Promise<Slot[]> {
    return this.slotModel.findAll();
  }

  async findOne(id: string): Promise<Slot> {
    return this.slotModel.findOne({
      where: { id },
    });
  }
  async create(slot: Slot): Promise<Slot> {
    return this.slotModel.create(slot as any);
  }

  async update(id: string, slot: Slot): Promise<Slot[]> {
    const updatedSlots: [number, Slot[]] = await this.slotModel.update(
      { ...slot },
      { where: { id }, returning: true },
    );
    return updatedSlots[1];
  }

  async delete(id: string): Promise<boolean> {
    const noOfDeletedRows = await this.slotModel.destroy({ where: { id } });
    return noOfDeletedRows >= 1;
  }

  async getByTime(time: Date): Promise<Slot[]> {
    return this.slotModel.findAll({
      where: {
        time: {
          [Op.eq]: time,
        },
      },
    });
  }

  async setSlotAsReserved(id: string): Promise<boolean> {
    const affectedCount = await this.slotModel.update(
      { isReserved: true },
      { where: { id } },
    );
    return affectedCount[0] >= 1;
  }
}
