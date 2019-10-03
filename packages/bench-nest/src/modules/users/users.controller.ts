import { Controller, Post, Body, Get, Param, UseGuards, HttpCode } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { GetUserDto } from './dtos/getUserDto';
import { UsersService } from './users.service';
import { SignInUserDto } from './dtos/signInUserDto';
import { SignUpUserDto } from './dtos/singUpUserDto';
import { resolveException } from '../../exceptions';

@Controller('users')
export class UsersController {
  constructor(
    private usersService: UsersService
  ) { }

  @Post('/sign-in/')
  @UseGuards(AuthGuard('local'))
  @HttpCode(200)
  signInUser(@Body() user: SignInUserDto) {
    return 'sucessful login'
  }

  @Post('/sign-up/')
  async signUpUser(@Body() user: SignUpUserDto) {
    try{
      await this.usersService.create(user)
    }
    catch(e) {
      resolveException(e)
    }
  }

  @Get()
  async getusers() {
    return ''
  }
  @Get(':id')
  getUser(@Param() params: GetUserDto) {
    return params
  }
}
