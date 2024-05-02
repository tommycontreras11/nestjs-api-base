import { Logger } from '../utils/logger.util';
import { RoleSeeder } from '../authorization/role/seeds/role.seeder';
const logger = new Logger();
export async function seederProduction(app) {
  //   if (!app) throw new Error('The add dont work');
  try {
    console.info('RUN seeder in PRODUTION')
    const roleSeeder = app.get(RoleSeeder);

    const seeders = [roleSeeder];

    for (const seeder of seeders) {
      await seeder.run();
      console.log(`Running ${seeder.name} seeder...`);
    }
    logger.log(`Running  seeder...`);

    await app.close();
  } catch (error) {
    console.error(error);
    logger.error(error);
  }
}
