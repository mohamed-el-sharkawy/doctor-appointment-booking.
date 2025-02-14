import { Module } from '@nestjs/common';
import { Event } from './app.service';
import { DoctorAvailabilityModule } from './doctor-availability/doctor-availability.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { SlotModel } from './doctor-availability/models/slot.model';
import * as fs from 'fs';
import { ConfigModule } from '@nestjs/config';
import { Dialect } from 'sequelize';
import { AppointmentManagementModule } from './appointment-management/appointment-management';
import { AppointmentBookingModule } from './appointment-booking/appointment-booking.module';
import { AppointmentModel } from './appointment-booking/infrastructure/models/appointment.model';
@Module({
  imports: [
    ConfigModule.forRoot(),
    SequelizeModule.forRoot({
      dialect: process.env.DB_DIALECT as Dialect,
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      models: [SlotModel,AppointmentModel],
      dialectOptions: {
        ssl: {
          ca: fs.readFileSync(process.env.DB_SSL_CA),
        },
      },
      autoLoadModels: true,
      synchronize: true,
    }),
    DoctorAvailabilityModule,
    AppointmentManagementModule,
    AppointmentBookingModule
  ],
  controllers: [],
  providers: [Event],
})
export class AppModule {}
