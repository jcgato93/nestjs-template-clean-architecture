import { AuthController } from '@/adapters/http/controllers/auth.controller';
import { ApplicationModule } from '@/application/application.module';
import { DatabaseModule } from '@/infrastructure/database/database.module';
import { Auth0Module } from '@/infrastructure/external-services/auth0/auth0.module';

import { Module } from '@nestjs/common';

@Module({
  imports: [DatabaseModule, Auth0Module, ApplicationModule],
  controllers: [AuthController],
  providers: [],
})
export class AppModule {}
