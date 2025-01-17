import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { EventSubscribers } from './types';
@Injectable()
export class Event {
  // Fake eventBus for app purpose
  async emit(event: string, data: any): Promise<boolean> {
    const subscribers = EventSubscribers[event];
    for (const subscriber of subscribers) {
      let retryCount = 3;
      while (retryCount--) {
        try {
          const response = await axios.post(subscriber.url, {
            event: event,
            data: data,
          });
          if (response.data) {
            return true;
          }
        } catch (error) {
          console.error(error);
        }
      }
    }
    return true;
  }
}
