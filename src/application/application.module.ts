import { Auth0Service } from '@/infrastructure/external-services/auth0/auth0.service';

import { Module } from '@nestjs/common';

import AuthUseCases from './use-cases/auth';
import UserUseCases from './use-cases/users';

const useCases = [...UserUseCases, ...AuthUseCases];

// Application module
@Module({
  imports: [],
  controllers: [],
  providers: [
    ...useCases,
    {
      provide: 'IAuthenticationService',
      useClass: Auth0Service, // Esto viene del módulo de infraestructura
    },
  ],
  exports: [...useCases],
})
export class ApplicationModule {}
