import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { CrateUserDto } from './models/crateUserDto'
import { GetUserDto } from './models/getUserDto';
import { ValidationPipe } from './abc'

@Controller('users')
export class UsersController {

  @Post('')
  createUser(@Body() createuserDto: CrateUserDto) {
    return 'cssasasasasa'
  }

  @Get(':id')
  getUser(@Param() params: GetUserDto) {
    return params
  }
}
