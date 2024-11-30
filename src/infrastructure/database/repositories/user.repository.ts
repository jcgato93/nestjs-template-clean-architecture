import { User } from '@/domain/entities/user.entity';
import { IUserRepository } from '@/domain/interfaces/repositories/user-repository.interface';
import { Repository } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { UserEntity } from '../entities/user.entity';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userEntityRepository: Repository<UserEntity>,
  ) {}

  async findById(id: string): Promise<User | null> {
    const userEntity = await this.userEntityRepository.findOne({
      where: { id },
    });
    return userEntity ? UserMapper.toDomain(userEntity) : null;
  }

  async findByEmail(email: string): Promise<User | null> {
    const userEntity = await this.userEntityRepository.findOne({
      where: { email },
    });
    return userEntity ? UserMapper.toDomain(userEntity) : null;
  }

  async create(user: User): Promise<User> {
    const userEntity = UserMapper.toEntity(user);
    const savedEntity = await this.userEntityRepository.save(userEntity);
    return UserMapper.toDomain(savedEntity);
  }

  async update(user: User): Promise<User> {
    const userEntity = UserMapper.toEntity(user);
    const updatedEntity = await this.userEntityRepository.save(userEntity);
    return UserMapper.toDomain(updatedEntity);
  }

  async delete(id: string): Promise<void> {
    await this.userEntityRepository.delete(id);
  }
}

// Mapper for converting between domain and persistence models
class UserMapper {
  static toDomain(userEntity: UserEntity): User {
    const user = new User();
    user.id = userEntity.id;
    user.email = userEntity.email;
    user.isActive = userEntity.isActive;
    user.name = userEntity.name;
    return user;
  }

  static toEntity(user: User): UserEntity {
    const userEntity = new UserEntity();
    userEntity.id = user.id;
    userEntity.email = user.email;
    userEntity.isActive = user.isActive;
    userEntity.name = user.name;
    return userEntity;
  }
}

export const userRepositoryProvider = {
  provide: 'IUserRepository',
  useClass: UserRepository,
};
