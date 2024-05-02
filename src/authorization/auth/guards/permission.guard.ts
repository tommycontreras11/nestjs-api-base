import {
  CanActivate,
  ExecutionContext,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { PERMISSION_RESOURCES_KEY } from '../decorators/permission.procteted.decorator';
import { permissionResource } from '../../permission/permission';
import { User } from '../../user/entities/user.entity';
import { getAllPermissionCodeByRoles } from '../util.user.role';

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const resoruces = this.reflector.get<string[]>(
      PERMISSION_RESOURCES_KEY,
      context.getHandler(),
    );
    if (!resoruces) return true;
    const permissions = (permissionResource.getResources() || []).map(
      (p) => p.code_resource,
    );

    const req = context.switchToHttp().getRequest();
    const user = req.user as User;
    const user_resources = getAllPermissionCodeByRoles(user.roles);

    if (req.body) {
      req.body = {
        ...req.body,
        user_create_id: user.id,
        user_update_id: user.id,
      };
    }

    for (const resource of resoruces) {
      if (permissions.length && !permissions.includes(resource)) {
        throw new InternalServerErrorException(
          `Error: The ${resource} resource does not exist`,
        );
      }
      req.body.user_create_id = user.id;
      req.body.user_update_id = user.id;

      if (user_resources?.includes(resource)) return true;
    }

    return false;
  }
}
