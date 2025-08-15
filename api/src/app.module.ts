import { Module } from '@nestjs/common';
import { UserModule } from './app/user/user.module';
import { AuthModule } from './providers/auth/auth.module';
import { EntriesModule } from './app/entries/entries.module';
import { HealthcheckModule } from './app/healthcheck/healthcheck.module';
import { DatabaseModule } from './providers/database/prisma.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { appConfig } from './config/app';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [appConfig] }),
    HttpModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        baseURL: await configService.get('external.baseUrl'),
        timeout: await configService.get('external.timeout'),
      }),
      inject: [ConfigService],
      global: true,
    }),
    DatabaseModule,
    UserModule,
    AuthModule,
    EntriesModule,
    HealthcheckModule,
  ],
})
export class AppModule {}
