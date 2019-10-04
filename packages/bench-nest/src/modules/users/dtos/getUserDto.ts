import { IsInt, IsNumberString, IsNumber } from 'class-validator'
import { Transform } from 'class-transformer'

export class GetUserDto {
  @Transform( val => Number(val))
  @IsNumber()
  id: number
}
