import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt'

import { UsersService } from '../users/users.service';
import { SignInUserDto } from '../users/dtos/signInUserDto';

export interface IJwtPayload {
  name: string
  email: string
}

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
    ) { }

  async validateUser(email: string, password: string): Promise<boolean> {
    const user = await this.usersService.findOneByEmail(email)
    if (!user) {
      return false
    }
    const compareResult: boolean = await compare(password, user.password)
    return compareResult
  }

  async signIn(email: string) {
    const user = await this.usersService.findOneByEmail(email)
    const payload: IJwtPayload = {
      name: user.name,
      email: user.email
    }
    const accessToken = await this.jwtService.signAsync(payload)
    return {
      accessToken
    }
  }
}
