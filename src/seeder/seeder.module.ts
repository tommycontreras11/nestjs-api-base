import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { RoleSeeder } from '../authorization/role/seeds/role.seeder';
import { Logger } from '../utils/logger.util';
import { PermissionSeeder } from '../authorization/permission/seeds/permission.global.seed';
import { UserSeeder } from '../authorization/user/seeder/user.global.seed';
import { ModuleSeeder } from '../authorization/module/seeds/module.global.seed';
import { UserRoleSeeder } from '../authorization/user/seeder/user.role.global.seed';
import { RoleModuleSeeder } from '../authorization/role/seeds/role.module.seed';
import { CountrySeeder } from '../geography/country/seeder/country.global.seed';
import { StateSeeder } from '../geography/state/seeder/state.global.seed';
import { CitySeeder } from '../geography/city/seeder/city.global.seed';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useFactory: async () => {
        return {
          type: 'mysql',
          host: process.env.DATABASE_HOST,
          port: +process.env.DATABASE_PORT,
          username: process.env.DATABASE_USER,
          password: process.env.DATABASE_PASSWORD,
          database: process.env.DATABASE_NAME,
          autoLoadEntities: true,
          dropSchema: true,
          synchronize: true,
          entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        };
      },
    }),
  ],
  providers: [
    UserSeeder,
    RoleSeeder,
    Logger,
    PermissionSeeder,
    ModuleSeeder,
    UserRoleSeeder,
    RoleModuleSeeder,
    CountrySeeder,
    StateSeeder,
    CitySeeder,
  ],
})
export class SeederModule {}
