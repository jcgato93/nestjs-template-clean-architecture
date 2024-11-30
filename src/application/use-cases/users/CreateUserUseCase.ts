import { User } from '@/domain/entities/user.entity';
import { IUserRepository } from '@/domain/interfaces/repositories/user-repository.interface';
import { CreateUserDto } from '@/presentacion/dto/users/create-user.dto';

import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class CreateUserUseCase {
  constructor(
    @Inject('IUserRepository')
    private readonly companyRepository: IUserRepository,
  ) {}

  async execute(createUserDto: CreateUserDto): Promise<User> {
    // Lógica de negocio aquí
    const user = new User({
      ...createUserDto,
      isActive: true,
    });

    return this.companyRepository.create(user);
  }
}
