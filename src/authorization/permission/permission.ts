import { ResourceArray } from './resource';

export const permissionResource = new ResourceArray();
//permission to manage user
permissionResource.addResource(
  'Permission to read users',
  'USER_READ',
  'The permission allows you to read users',
);
permissionResource.addResource(
  'Permission to create users',
  'USER_CREATE',
  'The permission allows you to create users',
);
permissionResource.addResource(
  'Permission to delete users',
  'USER_DELETE',
  'The permission allows you to delete users',
);
permissionResource.addResource(
  'Permission to update users',
  'USER_UPDATE',
  'The permission allows you to update users',
); 

//permission to manage roles
permissionResource.addResource(
  'Permission to read roles',
  'ROLE_READ',
  'The permission allows you to read roles',
);
permissionResource.addResource(
  'Permission to create roles',
  'ROLE_CREATE',
  'The permission allows you to create roles',
);
permissionResource.addResource(
  'Permission to delete roles',
  'ROLE_DELETE',
  'The permission allows you to delete roles',
);
permissionResource.addResource(
  'Permission to update roles',
  'ROLE_UPDATE',
  'The permission allows you to update roles',
); 


//permission to manage modules
permissionResource.addResource(
  'Permission to read modules',
  'MODULE_READ',
  'The permission allows you to read modules',
);
permissionResource.addResource(
  'Permission to create modules',
  'MODULE_CREATE',
  'The permission allows you to create modules',
);
permissionResource.addResource(
  'Permission to delete modules',
  'MODULE_DELETE',
  'The permission allows you to delete modules',
);
permissionResource.addResource(
  'Permission to update modules',
  'MODULE_UPDATE',
  'The permission allows you to update modules',
); 


//permission to manage permission
permissionResource.addResource(
  'Permission to read permissions',
  'PERMISSION_READ',
  'The permission allows you to read permissions',
);