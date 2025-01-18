import { Column, Model, Table, DataType } from 'sequelize-typescript';
import { IsUUID } from 'class-validator';

@Table({ tableName: 'appointments' })
export class AppointmentModel extends Model {
    @Column({
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4,
        primaryKey: true,
    })
    id: string;

    @Column({
        type: DataType.UUID,
        allowNull: false,
        validate: {
            isUUID: 4,
        },
    })
    @IsUUID(4)
    slotId: string;

    @Column({
        type: DataType.UUID,
        allowNull: false,
        validate: {
            isUUID: 4,
        },
    })
    @IsUUID(4)
    patientId: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    patientName: string;

    @Column({
        type: DataType.DATE,
        allowNull: false,
        defaultValue: DataType.NOW,
    })
    reservedAt: Date;
}