import { Controller, Post, Body, Get } from '@nestjs/common';
import { ChangeStatusDto } from '../dto/change-status-dto';
import { EventPublisher } from '../core/ports/event-publisher';
import { eventsEnum } from 'src/types';
import { ListAppointments } from '../core/ports/list-appointments';
import { ListPendingAppointmentsDto } from '../dto/list-pending-appointments-dto';
@Controller('appointment-management')
export class AppointmentManagementController {
  constructor(
    private readonly eventPublisher: EventPublisher,
    private readonly listAppointments: ListAppointments,
  ) {}

  @Get('list-pending')
  async listPendingAppointments(): Promise<ListPendingAppointmentsDto[]> {
    const appointments = await this.listAppointments.listAppointments();

    const appointmentsData: ListPendingAppointmentsDto[] = appointments.map(
      (appointment) => {
        const { id, slotId, patientId, patientName, reservedAt } = appointment;
        return { id, slotId, patientId, patientName, reservedAt };
      },
    );

    return appointmentsData;
  }

  @Post('cancel')
  async cancelAppointment(@Body() body: ChangeStatusDto): Promise<boolean> {
    return this.eventPublisher.publish(eventsEnum.AppointmentCancelled, {
      appointmentId: body.appointmentId,
    });
  }

  @Post('complete')
  async completeAppointment(@Body() body: ChangeStatusDto): Promise<boolean> {
    return this.eventPublisher.publish(eventsEnum.AppointmentCompleted, {
      appointmentId: body.appointmentId,
    });
  }
}
