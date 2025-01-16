import { Column, Model, Table, DataType } from 'sequelize-typescript';
import { IsUUID } from 'class-validator';

@Table({ tableName: 'slots' })
export class SlotModel extends Model {
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
  doctorId: string;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  time: Date;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  doctorName: string;

  @Column({ defaultValue: false })
  isReserved: boolean;

  @Column({
    type: DataType.FLOAT,
    allowNull: false,
  })
  cost: number;
}
