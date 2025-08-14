import { Module } from '@nestjs/common';
import { UserModule } from './app/user/user.module';
import { AuthModule } from './providers/auth/auth.module';
import { EntriesModule } from './app/entries/entries.module';
import { HealthcheckModule } from './app/healthcheck/healthcheck.module';
import { DatabaseModule } from './providers/database/prisma.module';

@Module({
  imports: [
    DatabaseModule,
    UserModule,
    AuthModule,
    EntriesModule,
    HealthcheckModule,
  ],
})
export class AppModule {}
