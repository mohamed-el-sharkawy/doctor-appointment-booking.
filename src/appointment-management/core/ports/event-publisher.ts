import { AppointmentCompleted, AppointmentCancelled } from '../../../types';
import { eventsEnum } from 'src/types';

export interface EventPublisher {
  publish(
    event: eventsEnum,
    data: AppointmentCancelled | AppointmentCompleted,
  ): Promise<boolean>;
}
