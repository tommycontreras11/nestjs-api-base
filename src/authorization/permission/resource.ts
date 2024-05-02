// Definición del tipo Resource
export type Resource = {
  name: string;
  code_resource: string;
  description: string;
};

// Definición de la clase ResourceArray
export class ResourceArray {
  private resources: Resource[];

  constructor() {
    this.resources = [];
  }

  addResource(
    name: string,
    code_resource: string,
    description: string,
  ): boolean {
    if (this.isCodeResourceUnique(code_resource)) {
      const newResource: Resource = {
        name,
        code_resource,
        description,
      };
      this.resources.push(newResource);
      return true;
    }
    return false;
  }

  private isCodeResourceUnique(code_resource: string): boolean {
    return !this.resources.some(
      (resource) => resource.code_resource === code_resource,
    );
  }

  getResources(): Resource[] {
    return this.resources;
  }
}
