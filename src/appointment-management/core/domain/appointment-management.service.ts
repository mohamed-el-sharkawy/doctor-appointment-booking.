import { Injectable } from '@nestjs/common';
import { EventPublisher } from '../ports/event-publisher';
import {
  AppointmentCancelled,
  AppointmentCompleted,
  eventsEnum,
} from 'src/types';
import { Event } from 'src/app.service';
import { ListAppointments } from '../ports/list-appointments';
import { Appointment } from 'src/appointment-management/interfaces/Appointment';
import axios from 'axios';

@Injectable()
export class AppointmentManagementService
  implements EventPublisher, ListAppointments
{
  constructor() {}
  publish(
    event: eventsEnum,
    eventData: AppointmentCancelled | AppointmentCompleted,
  ): Promise<boolean> {
    const eventService = new Event();
    return eventService.emit(event, eventData);
  }

  async listAppointments(): Promise<Appointment[]> {
    const appointments = await axios.get(
      'http://localhost:3000/appointment-booking/list-pending',
    );

    const appointmentsData: Appointment[] = appointments.data.map(
      (appointment) => {
        const { id, slotId, patientId, patientName, reservedAt } = appointment;
        return { id, slotId, patientId, patientName, reservedAt };
      },
    );
    return appointmentsData;
  }

  async cancelAppointment(appointmentId: string): Promise<boolean> {
    this.publish(eventsEnum.AppointmentCancelled, {
      appointmentId,
    });
    return true;
  }

  async completeAppointment(appointmentId: string): Promise<boolean> {
    this.publish(eventsEnum.AppointmentCompleted, {
      appointmentId,
    });
    return true;
  }
}
