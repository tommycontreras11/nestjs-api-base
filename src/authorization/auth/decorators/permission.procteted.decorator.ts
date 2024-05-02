import { SetMetadata } from '@nestjs/common';

export const PERMISSION_RESOURCES_KEY = 'permission_resources';
export const PermissionProcteted = (...args: string[]) => {
  return SetMetadata(PERMISSION_RESOURCES_KEY, args);
};
