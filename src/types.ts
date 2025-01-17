export enum eventsEnum {
  AppointmentBooked = 'AppointmentBooked',
}

export const EventSubscribers = {
  [eventsEnum.AppointmentBooked]: [
    {
      url: 'http://localhost:3000/slots/events',
    },
  ],
};
