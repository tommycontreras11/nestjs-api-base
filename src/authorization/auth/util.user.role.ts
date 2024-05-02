type Permission = {
  id: number;
  code_resource: string;
  name: string;
  description: string;
};

type Module = {
  id: number;
  name: string;
  description: string;
  permissions: Permission[];
  children?: Module[]; // Aquí hacemos que children sea opcional
};

type Role = {
  id: number;
  name: string;
  description: string;
  modules: Module[];
};

const data: Role[] = [
  // ... tu array aquí
];

function extractPermissions(module: Module): Permission[] {
  const permissions: Permission[] = [];

  if (module.permissions) {
    permissions.push(...module.permissions);
  }

  if (module.children) {
    // Aquí verificamos si children está presente antes de iterar
    module.children.forEach((child) => {
      permissions.push(...extractPermissions(child));
    });
  }

  return permissions;
}

export const getAllPermissionCodeByRoles = (roles: Role[]): string[] => {
  const codeResources: string[] = [];

  roles.forEach((role) => {
    role.modules.forEach((module) => {
      const permissions = extractPermissions(module);
      permissions.forEach((permission) => {
        codeResources.push(permission.code_resource);
      });
    });
  });

  return codeResources;
};
