export interface Seeder {
  name: string;
  run: () => Promise<void>;
}
