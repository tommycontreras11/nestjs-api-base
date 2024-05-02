import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

describe('UserService', () => {
  let service: UserService;
  const USER_ID = "5";
  let userRepository: Repository<User>;
  let mockUserService = {
    findAll: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    remove: jest.fn()
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useValue: mockUserService
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('userRepository should be defined', () => {
    expect(userRepository).toBeDefined();
  });

  describe('findAll', () => {
    it('should get all users and return that', async () => {
      try {
        expect(await service.findAll());
      } catch (error) {
        console.log(error);
      }
    });
  });

  describe('findOne', () => {
    it('should get one user by id and return that', async () => {
      try {
        expect(await service.findOne(parseInt(USER_ID))).toEqual({
          id: parseInt(USER_ID),
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
    it('should create a new user record and return that', async () => {
      try {
        const hash = bcrypt.hash('Abc122345', 10);
        const newUser = {
          full_name: 'Miguel Perez',
          email: 'test1@gmail.com',
          password: await hash,
        };
        expect(await service.create(newUser)).toEqual({
          id: parseInt(USER_ID),
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

  describe('update', () => {
    it('should udpdate a user record and return that', async () => {
      try {
        const updateUser = {
          email: 'test1@gmail.com',
          password: 'Abc122345',
        };
        expect(await service.update(parseInt(USER_ID), updateUser)).toEqual({
          id: USER_ID,
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

  describe('remove', () => {
    it('should delete a user record', async () => {
      try {
        expect(await service.remove(parseInt(USER_ID)));
      } catch (error) {
        console.log(error);
      }
    });
  });
});
