import {
  IsUUID,
  IsString,
  IsBoolean,
  IsNumber,
  Matches,
  MinLength,
} from 'class-validator';

export class SlotDto {
  @IsString()
  readonly time: string;

  @IsUUID(4)
  readonly doctorId: string;

  @IsString()
  @MinLength(2)
  @Matches(/^[A-Za-z\s]+$/, {
    message: 'doctorName must be a proper name',
  })
  readonly doctorName: string;

  @IsBoolean()
  readonly isReserved: boolean;

  @IsNumber()
  readonly cost: number;
}
