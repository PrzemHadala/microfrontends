import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { getDbConfig } from './configs/db';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    UsersModule,
    TypeOrmModule.forRoot(getDbConfig({
      debug: true,
      trace: true,
      loggerLevel: 'debug',
    })),
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule { }
