import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';

describe('AuthController', () => {
  let controller: AuthController;
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
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService, JwtStrategy],
    })
      .overrideProvider(AuthService)
      .useValue(mockAuthService)
      .overrideProvider(JwtStrategy)
      .useValue(mockJwtService)
      .compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    try {
      it('should create a new user record and return that', async () => {
        const newUser = {
          full_name: 'Miguel Perez',
          email: 'test1@gmail.com',
          password: 'Abc12234',
        };
        expect(controller.create(newUser)).toEqual({
          ...newUser,
        });
      });
    } catch (error) {
      console.log(error);
    }
  });

  describe('loginAuth', () => {
    try {
      it('should log in and return that user', async () => {
        const user = { email: 'test1@gmail.com', password: 'Abc12234' };
        expect(controller.login(user)).toEqual({
          ...user,
        });
      });
    } catch (error) {
      console.log(error);
    }
  });
});
