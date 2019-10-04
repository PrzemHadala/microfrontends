import { Controller, Post, Body, Get, Param, UseGuards, HttpCode, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { UsersService } from './users.service';
import { SignInUserDto } from './dtos/signInUserDto';
import { SignUpUserDto } from './dtos/singUpUserDto';
import { resolveException } from '../../exceptions';
import { AuthService } from '../auth/auth.service';

@Controller('users')
export class UsersController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService
  ) { }

  @UseGuards(AuthGuard('local'))
  @Post('/sign-in/')
  @HttpCode(200)
  async signInUser(@Body() user: SignInUserDto) {
    return this.authService.signIn(user.email)
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

  @UseGuards(AuthGuard('jwt'))
  @Get()
  async getusers(@Req() req) {
    return req.user
  }

}
