import { IsString, IsNotEmpty, IsAlpha, IsEmail } from 'class-validator'

export class SignUpUserDto {
  @IsString()
  @IsAlpha()
  @IsNotEmpty()
  name: string

  @IsString()
  password: string

  @IsEmail()
  email: string
}
