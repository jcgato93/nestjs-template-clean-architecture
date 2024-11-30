/* eslint-disable @typescript-eslint/no-unused-vars */
import { IAuthenticationService } from '@/domain/interfaces/services/auth/authentication.service.interface';

import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class AuthUseCase {
  constructor(
    @Inject('IAuthenticationService')
    private readonly authService: IAuthenticationService,
  ) {}

  async registerUser(email: string, password: string, name: string) {
    return 'user created';
    //this.authService.createUser(email, password, name);
  }

  async loginUser(email: string, password: string) {
    return 'user logged in';
    //this.authService.authenticateUser(email, password);
  }
}
