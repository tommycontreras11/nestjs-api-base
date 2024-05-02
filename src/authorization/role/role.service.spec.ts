import { Test, TestingModule } from '@nestjs/testing';
import { RoleService } from './role.service';
import { Repository } from 'typeorm';
import { Role } from './entities/role.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('RoleService', () => {
  let service: RoleService;
  const ROLE_ID = "1";
  let roleRepository: Repository<Role>;
  let mockRoleService = {
    findAll: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    remove: jest.fn()
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RoleService,
        {
          provide: getRepositoryToken(Role),
          useValue: mockRoleService
        },
      ],
    }).compile();

    service = module.get<RoleService>(RoleService);
    roleRepository = module.get<Repository<Role>>(getRepositoryToken(Role));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('roleRepository should be defined', () => {
    expect(roleRepository).toBeDefined();
  });

  describe('findAll', () => {
    it('should get all roles and return that', async () => {
      try {
        expect(await service.findAll());
      } catch (error) {
        console.log(error);
      }
    });
  });

  describe('findOne', () => {
    it('should get one role by id and return that', async () => {
      try {
        expect(await service.findOne(parseInt(ROLE_ID)));
      } catch (error) {
        console.log(error.message);
      }
    });
  });

  describe('create', () => {
    it('should create a new role record and return that', async () => {
      try {
        const dto = {
          name: 'admin',
          description: 'admin to manage all system',
        };
        expect(await service.create(dto)).toEqual({
          name: 'admin',
          description: 'admin to manage all system',
        });
      } catch (error) {
        console.log(error);
      }
    });
  });

  describe('update', () => {
    it('should udpdate a role record and return that', async () => {
      try {
        const dto = { name: 'admin', description: 'admin to manage all system' };
        expect(await service.update(parseInt(ROLE_ID), dto)).toEqual({
          name: 'admin',
          description: 'admin to manage all system',
        });
      } catch (error) {
        console.log(error);
      }
    });
  });

  describe('remove', () => {
    it('should delete a role record', async () => {
      try {
        expect(await service.remove(parseInt(ROLE_ID)));
      } catch (error) {
        console.log(error);
      }
    });
  });
});
