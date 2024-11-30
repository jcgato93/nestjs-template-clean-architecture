import { DataSource, DataSourceOptions } from 'typeorm';

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { envs } from '../config/envs';
import { EnvironmentEnum } from '../consts/environment.enum';
import { UserEntity } from './entities/user.entity';
import { userRepositoryProvider } from './repositories/user.repository';

export const databaseProviders = [
  TypeOrmModule.forRootAsync({
    imports: [],
    inject: [],
    async useFactory() {
      return {
        type: 'postgres',
        host: envs.database.host,
        username: envs.database.user,
        port: envs.database.port,
        database: envs.database.name,
        password: envs.database.password,
        entities: [__dirname + '/**/*.entity.{js,ts}'],
        migrations: [__dirname + 'database/migrations/*{.ts,.js}'],
        logging: false,
        synchronize: false,
        ssl: [EnvironmentEnum.PRODUCTION, EnvironmentEnum.STAGING, EnvironmentEnum.QA].includes(envs.environment)
          ? { rejectUnauthorized: false }
          : false,
      } as DataSourceOptions;
      //return config.getTypeOrmConfig() as ConnectionOptions;
    },
    dataSourceFactory: async (options) => {
      const dataSource = await new DataSource(options).initialize();
      return dataSource;
    },
  }),
];

@Module({
  imports: [...databaseProviders, TypeOrmModule.forFeature([UserEntity])],
  providers: [userRepositoryProvider],
  exports: [...databaseProviders],
})
export class DatabaseModule {}
