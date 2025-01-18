export enum eventsEnum {
  AppointmentBooked = 'AppointmentBooked',
  AppointmentCancelled = 'AppointmentCancelled',
  AppointmentCompleted = 'AppointmentCompleted',
}

export const EventSubscribers = {
  [eventsEnum.AppointmentBooked]: [
    {
      url: 'http://localhost:3000/slots/events',
    },
  ],
  [eventsEnum.AppointmentCancelled]: [
    {
      url: 'http://localhost:3000/appointment-booking/events',
    },
  ],
  [eventsEnum.AppointmentCompleted]: [
    {
      url: 'http://localhost:3000/appointment-booking/events',
    },
  ],
};

export type AppointmentBooked = {
  slotId: string;
};

export type AppointmentCancelled = {
  appointmentId: string;
};

export type AppointmentCompleted = {
  appointmentId: string;
};
