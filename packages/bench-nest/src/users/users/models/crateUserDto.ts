import { IsString, IsNotEmpty, IsAlpha } from 'class-validator';

export class CrateUserDto {
  @IsString()
  @IsAlpha()
  @IsNotEmpty()
  name: string;
}
