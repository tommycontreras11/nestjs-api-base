import { NestFactory } from '@nestjs/core';
import { SeederModule } from './seeder.module';
import { seederProduction } from './seeder.production';
import { seederGlobal } from './seeder.global';
import { seederDeloment } from './seeder.develoment';

(async () => {
  try {
    const app = await NestFactory.createApplicationContext(SeederModule);
    seederGlobal(app);

    if (process.env.NODE_ENV === 'production') {
      seederProduction(app);
    }
    if (process.env.NODE_ENV === 'develoment') {
      seederDeloment(app);
    }
  } catch (error) {
    console.error('Seeder error:', error);
  }
})();
