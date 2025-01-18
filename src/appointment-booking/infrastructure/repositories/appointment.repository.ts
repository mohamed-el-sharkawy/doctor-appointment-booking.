import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { AppointmentModel } from '../models/appointment.model';
import { IAppointmentRepository } from '../../core/interfaces/repositories/appointment.repository.interface';
import { Appointment } from '../../core/domain/entities/appointment.entity';
import { SlotModel } from '../../../doctor-availability/models/slot.model';

@Injectable()
export class AppointmentRepository implements IAppointmentRepository {
    constructor(
        @InjectModel(AppointmentModel)
        private appointmentModel: typeof AppointmentModel,
        @InjectModel(SlotModel)
        private slotModel: typeof SlotModel,
    ) {}

    async save(appointment: Appointment): Promise<Appointment> {
        const created = await this.appointmentModel.create({
            id: appointment.id,
            slotId: appointment.slotId,
            patientId: appointment.patientId,
            patientName: appointment.patientName,
            reservedAt: appointment.reservedAt
        });
        return this.mapToEntity(created);
    }

    async isSlotAvailable(slotId: string): Promise<boolean> {
        const slot = await this.slotModel.findOne({
            where: { id: slotId }
        });
        return slot && !slot.isReserved;
    }

    async findAvailableSlots(): Promise<any[]> {
        return this.slotModel.findAll({
            where: { isReserved: false }
        });
    }

    private mapToEntity(model: AppointmentModel): Appointment {
        return new Appointment(
            model.id,
            model.slotId,
            model.patientId,
            model.patientName,
            model.reservedAt
        );
    }
}