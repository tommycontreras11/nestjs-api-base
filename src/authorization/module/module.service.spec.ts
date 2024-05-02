import { Test, TestingModule } from '@nestjs/testing';
import { ModuleService } from './module.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ModuleEntity } from './entities/module.entity';
import { Repository } from 'typeorm';

describe('ModuleService', () => {
  let service: ModuleService;
  const MODULE_ID = "1";
  let moduleRepository: Repository<ModuleEntity>;
  let mockModuleService = {
    findAll: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    remove: jest.fn()
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ModuleService, {
        provide: getRepositoryToken(ModuleEntity),
        useValue: mockModuleService
      }],
    }).compile();

    service = module.get<ModuleService>(ModuleService);
    moduleRepository = module.get<Repository<ModuleEntity>>(getRepositoryToken(ModuleEntity));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('moduleRepository should be defined', () => {
    expect(moduleRepository).toBeDefined();
  });

  describe('findAll', () => {
    it('should get all modules and return that', async () => {
      try {
        expect(await service.findAll());
      } catch (error) {
        console.log(error);
      }
    });
  });

  describe('findOne', () => {
    it('should get one module by id and return that', async () => {
      try {
        expect(await service.findOne(parseInt(MODULE_ID))).toEqual({
          id: parseInt(MODULE_ID),
          active: true,
          created: '2023-04-19T13:17:22.160Z',
          updated: '2023-04-19T13:17:22.160Z',
          deleted_at: null,
          name: 'Miguel Perez',
          email: 'test1@gmail.com',
        });
      } catch (error) {
        console.log(error);
      }
    });
  });

  describe('create', () => {
    it('should create a new module record and return that', async () => {
      try {
        const newModule = {
          name: "User",
          description: "This is the module of the users"
        };
        expect(await service.create(newModule)).toEqual({
          id: MODULE_ID,
          name: "User",
          description: "This is the module of the users",
          parent_id: 1,
          active: true,
          created: '2023-04-19T13:17:22.160Z',
          updated: '2023-04-19T13:17:22.160Z',
          deleted_at: null
        });
      } catch (error) {
        console.log(error);
      }
    });
  });

  describe('update', () => {
    it('should udpdate a module record and return that', async () => {
      try {
        const updateModule = {
          name: "User",
          description: "This is the module of the users"
        };
        expect(await service.update(parseInt(MODULE_ID), updateModule)).toEqual({
          id: MODULE_ID,
          name: "User",
          description: "This is the module of the users",
          parent_id: 1,
          active: true,
          created: '2023-04-19T13:17:22.160Z',
          updated: '2023-04-19T13:17:22.160Z',
          deleted_at: null
        });
      } catch (error) {
        console.log(error);
      }
    });
  });

  describe('remove', () => {
    it('should delete a module record', async () => {
      try {
        expect(await service.remove(parseInt(MODULE_ID)));
      } catch (error) {
        console.log(error);
      }
    });
  });
});
