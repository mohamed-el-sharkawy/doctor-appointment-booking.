import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Delete,
  Param,
  BadRequestException,
} from '@nestjs/common';
import { DoctorAvailabilityService } from './doctor-availability.service';
import { SlotDto } from './dto/slot.dto';
import { Slot } from './interfaces/slot.interface';
import { validate as uuidValidate, version as uuidVersion } from 'uuid';

@Controller('slots')
export class DoctorAvailabilityController {
  constructor(
    private readonly doctorAvailabilityService: DoctorAvailabilityService,
  ) {}

  private parseTimeString(timeStr: string): Date {
    // Regular expression to match "DD/MM/YYYY HH:MM am|pm" format
    const timeFormat = /^(\d{2})\/(\d{2})\/(\d{4})\s(\d{2}):(\d{2})\s(am|pm)$/i;
    const match = timeStr.match(timeFormat);

    if (!match) {
      throw new BadRequestException(
        'Invalid slot time: Must have the format DD/MM/YYYY HH:MM am|pm',
      );
    }

    const [, day, month, year, hours, minutes, meridiem] = match;
    // Convert hours to 24-hour format
    let hour = parseInt(hours);
    if (meridiem.toLowerCase() === 'pm' && hour !== 12) {
      hour += 12;
    } else if (meridiem.toLowerCase() === 'am' && hour === 12) {
      hour = 0;
    }

    const date = new Date();
    date.setFullYear(parseInt(year));
    date.setMonth(parseInt(month) - 1); // Months are 0-based
    date.setDate(parseInt(day));
    date.setHours(hour);
    date.setMinutes(parseInt(minutes));
    date.setSeconds(0);
    date.setMilliseconds(0);

    return date;
  }

  private isValidUUID(uuid: string): boolean {
    return uuidValidate(uuid) && uuidVersion(uuid) === 4;
  }

  @Get()
  slots(): Promise<Slot[]> {
    return this.doctorAvailabilityService.findAll();
  }

  @Get(':id')
  slot(@Param('id') id: string): Promise<Slot> {
    return this.doctorAvailabilityService.findOne(id);
  }

  @Post()
  async createSlot(@Body() slot: SlotDto): Promise<Slot> {
    const slotTime = this.parseTimeString(slot.time);

    if (!this.isValidUUID(slot.doctorId)) {
      throw new BadRequestException(
        'Invalid doctorId: Must be a valid UUID v4',
      );
    }

    return this.doctorAvailabilityService.create({
      ...slot,
      time: slotTime,
    });
  }

  @Put(':id')
  async updateSlot(
    @Param('id') id: string,
    @Body() slot: SlotDto,
  ): Promise<Slot[]> {
    const slotTime = this.parseTimeString(slot.time);

    const updatedSlots = await this.doctorAvailabilityService.update(id, {
      ...slot,
      time: slotTime,
    });
    return updatedSlots;
  }

  @Delete(':id')
  deleteSlot(@Param('id') id: string): Promise<boolean> {
    return this.doctorAvailabilityService.delete(id);
  }
}
