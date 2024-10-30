import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigifyModule } from '@itgorillaz/configify';
import { ScheduleModule } from '@nestjs/schedule';
import { CronjobsModule } from './cronjobs/cronjobs.module';
import { MoralisModule } from './moralis/moralis.module';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { DbConfig } from './config/db.config';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';
import { MailersendModule } from './mailersend/mailersend.module';

@Module({
  imports: [
    ConfigifyModule.forRootAsync(),
    ScheduleModule.forRoot(),
    MikroOrmModule.forRootAsync({
      inject: [DbConfig],
      useFactory: async (dbConfig: DbConfig) => ({
        driver: PostgreSqlDriver,
        host: dbConfig.dbHost,
        port: dbConfig.dbPort,
        user: dbConfig.dbUser,
        password: dbConfig.dbPassword,
        dbName: dbConfig.dbName,
        entities: ['./dist/entities/*.js'],
        allowGlobalContext: true,
      }),
    }),
    CronjobsModule,
    MoralisModule,
    MailersendModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
