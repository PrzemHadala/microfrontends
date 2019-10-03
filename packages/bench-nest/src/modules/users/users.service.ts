import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { hash } from 'bcrypt'
import { User } from './models/user.entity';
import { SignUpUserDto } from './dtos/singUpUserDto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) { }

  async create(user: SignUpUserDto) {
    user.password = await hash(user.password, 10);
    const newUser = this.userRepository.create(user);
    const result = await this.userRepository.save(newUser)
    return result
  }

  async findAll() {
    const result = await this.userRepository.find()
    return result
  }

  async findOneByEmail(email: string): Promise<User> {
    const result = this.userRepository.find({
      where: {
        email
      }
    })
    return result[0]
  }
}
