import { Injectable, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './authorization/auth/auth.module';
import { UserModule } from './authorization/user/user.module';
import { RoleModule } from './authorization/role/role.module';
import { PermissionModule } from './authorization/permission/permission.module';
import { ModuleModule } from './authorization/module/module.module';
import { NotificationModule } from './notification/notification.module';
import { LogModule } from './log/log.module';
import { EventEntitySubscriber } from './event.entity.subscriber';
import { AcceptLanguageResolver, I18nModule, I18nResolver, QueryResolver } from 'nestjs-i18n';
import { CountryModule } from './geography/country/country.module';
import { StateModule } from './geography/state/state.module';
import { CityModule } from './geography/city/city.module';
import * as path from 'path';

@Injectable()
export class UserResolver implements I18nResolver {
  resolve = async (ctx: any) => {
    const user = ctx.req.user;
    return ['es'];
  };
}

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env'],
    }),
    I18nModule.forRoot({
      fallbackLanguage: 'en',
      loaderOptions: {
        path: path.join(__dirname, '/i18n/'),
        watch: true,
      },
      resolvers: [
        { use: QueryResolver, options: ['es'] },
        AcceptLanguageResolver,
      ],
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
          synchronize: true,
          // logging: true,
          entities: [__dirname + '/**/*.entity{.ts,.js}'],
        };
      },
    }),
    AuthModule,
    UserModule,
    RoleModule,
    PermissionModule,
    ModuleModule,
    NotificationModule,
    LogModule,
    CountryModule,
    StateModule,
    CityModule,
  ],
  providers: [EventEntitySubscriber],
})
export class AppModule {}
