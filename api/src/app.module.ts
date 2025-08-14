import { Module } from '@nestjs/common';
import { UserModule } from './app/user/user.module';
import { AuthModule } from './app/auth/auth.module';
import { EntriesModule } from './app/entries/entries.module';
import { HealthcheckModule } from './app/healthcheck/healthcheck.module';

@Module({
  imports: [UserModule, AuthModule, EntriesModule, HealthcheckModule],
})
export class AppModule {}
