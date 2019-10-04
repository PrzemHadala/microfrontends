import { Module, forwardRef } from '@nestjs/common'
import { PassportModule } from '@nestjs/passport'
import { JwtModule } from '@nestjs/jwt'

import { AuthService } from './auth.service'
import { UsersModule } from '../users/users.module'
import { LocalStrategy } from './strategies/local.strategy'
import { getJwtConfig } from '../../configs/jwt'
import { JwtStrategy } from './strategies/jwt'

@Module({
  imports: [
    forwardRef(() => UsersModule),
    JwtModule.register(getJwtConfig()),
    PassportModule
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService]
})
export class AuthModule { }
