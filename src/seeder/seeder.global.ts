import { PermissionSeeder } from '../authorization/permission/seeds/permission.global.seed';
import { Logger } from '../utils/logger.util';
import { RoleSeeder } from '../authorization/role/seeds/role.seeder';
import { UserSeeder } from '../authorization/user/seeder/user.global.seed';
import { ModuleSeeder } from '../authorization/module/seeds/module.global.seed';
import { UserRoleSeeder } from '../authorization/user/seeder/user.role.global.seed';
import { RoleModuleSeeder } from '../authorization/role/seeds/role.module.seed';
import { CountrySeeder } from '../geography/country/seeder/country.global.seed';
import { StateSeeder } from '../geography/state/seeder/state.global.seed';
import { CitySeeder } from '../geography/city/seeder/city.global.seed';

const logger = new Logger();
export async function seederGlobal(app) {
  //   if (!app) throw new Error('The add dont work');
  try {
    console.info('RUN seeder in PRODUTION AND DEVELOMENT');

    const seeders = [
      app.get(UserSeeder),
      app.get(PermissionSeeder),
      app.get(RoleSeeder),
      app.get(ModuleSeeder),
      app.get(UserRoleSeeder),
      app.get(RoleModuleSeeder),
      //app.get(CountrySeeder),
      // app.get(StateSeeder),
      // app.get(CitySeeder),
    ];
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
