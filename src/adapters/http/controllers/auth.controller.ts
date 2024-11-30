import { LoginUserDto } from '@/application/dtos/auth/login-user.dto';
import { RegisterUserDto } from '@/application/dtos/auth/register-user.dto';
import { AuthUseCase } from '@/application/use-cases/auth/auth.use-case';

import { Body, Controller, Post } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  constructor(private readonly authUseCases: AuthUseCase) {}

  @Post('register')
  async register(@Body() registerUserDto: RegisterUserDto) {
    const { email, password, name } = registerUserDto;
    return await this.authUseCases.registerUser(email, password, name);
  }

  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto) {
    const { email, password } = loginUserDto;
    return await this.authUseCases.loginUser(email, password);
  }
}
