import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { Repository } from 'typeorm';
import { User } from '../user/entities/user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { JwtStrategy } from './strategies/jwt.strategy';

describe('AuthService', () => {
  let service: AuthService;
  let userRepository: Repository<User>;
  let mockAuthService = {
    create: jest.fn((dto) => {
      return {
        ...dto,
      };
    }),
    login: jest.fn((dto) => {
      return {
        ...dto,
      };
    }),
  };
  let mockJwtService = {};
  const AUTH_REPOSITORY_TOKEN = getRepositoryToken(User);
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        JwtStrategy,
        {
          provide: AUTH_REPOSITORY_TOKEN,
          useValue: mockAuthService,
        },
      ],
    })
      .overrideProvider(AuthService)
      .useValue(mockAuthService)
      .overrideProvider(JwtStrategy)
      .useValue(mockJwtService)
      .compile();

    service = module.get<AuthService>(AuthService);
    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('roleRepository should be defined', () => {
    expect(userRepository).toBeDefined();
  });

  describe('create', () => {
    it('should create a new user record and return that', async () => {
      try {
        const newUser = {
          full_name: 'Miguel Perez',
          email: 'test1@gmail.com',
          password: 'Abc12234',
        };
        expect(await service.create(newUser)).toEqual({
          ...newUser,
        });
      } catch (error) {
        console.log(error);
      }
    });
  });

  describe('login', () => {
    it('should log in and return that user', async () => {
      try {
        const user = {
          full_name: 'Miguel Perez',
          email: 'test1@gmail.com',
          password: 'Abc12234',
        };
        expect(await service.login(user)).toEqual({
          ...user,
        });
      } catch (error) {
        console.log(error);
      }
    });
  });
});
