import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { User } from '../users/models/user.entity';
import { compare } from 'bcrypt'

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) { }

  async validateUser(email: string, password: string): Promise<boolean> {
    const user = await this.usersService.findOneByEmail(email)
    if (!user) {
      return false
    }
    const compareResult: boolean = await compare(password, user.password)
    return compareResult
  }
}
