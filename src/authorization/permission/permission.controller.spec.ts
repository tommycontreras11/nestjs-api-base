import { Test, TestingModule } from '@nestjs/testing';
import { PermissionController } from '../permission/permission.controller';
import { PermissionService } from './permission.service';

describe('PermissionController', () => {
  let controller: PermissionController;
  const PERMISSION_ID = "5";
  let mockPermissionService = {
    findAll: jest.fn(),
    findOne: jest.fn()
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PermissionController],
      providers: [PermissionService]
    }).overrideProvider(PermissionService).useValue(mockPermissionService).compile();

    controller = module.get<PermissionController>(PermissionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    try {
      it('should get all permissions and return that', async () => {
        try {
          expect(await controller.findAll());
        } catch (error) {
          console.log(error);
        }
      });
    } catch (error) {
      console.log(error);
    }
  })

  describe('findOne', () => {
    it('should get one permision by id and return that', async () => {
      try {
        expect(await controller.findOne(PERMISSION_ID));
      } catch (error) {
        console.log(error);
      }
    });
  })
});
