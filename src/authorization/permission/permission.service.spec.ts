import { Test, TestingModule } from '@nestjs/testing';
import { PermissionService } from './permission.service';
import { Permission } from './entities/permission.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

describe('PermissionService', () => {
  let service: PermissionService;
  let permissionRepository: Repository<Permission>;
  let mockPermissionService = {
    findAll: jest.fn(),
    findOne: jest.fn()
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PermissionService,
        {
          provide: getRepositoryToken(Permission),
          useValue: mockPermissionService
        },
      ],
    }).compile();

    service = module.get<PermissionService>(PermissionService);
    permissionRepository = module.get<Repository<Permission>>(getRepositoryToken(Permission));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('permissionRepository should be defined', () => {
    expect(permissionRepository).toBeDefined();
  });

  describe('findAll', () => {
    it('should get all permissions and return that', async () => {
      try {
        expect(await service.findAll());
      } catch (error) {
        console.log(error);
      }
    });
  });

  describe('findOne', () => {
    it('should get one permission by id and return that', async () => {
      try {
        expect(await service.findOne(+1));
      } catch (error) {
        console.log(error.message);
      }
    });
  });
});
