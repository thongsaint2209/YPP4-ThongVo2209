import "reflect-metadata";

// === Type Provider ===
// class constructor có thể new.
export type ClassType<T = unknown> = new (...args: any[]) => T;

// === Container ===
export class Container {
  private static instances = new Map<ClassType, any>();
  private static providers = new Set<ClassType>();

  // Register provider
  static register(target: ClassType) {
    this.providers.add(target);
  }

  static resolve<T>(target: ClassType<T>): T {
    // Check instance in dictionary return (Singleton)
    if (this.instances.has(target)) {
      return this.instances.get(target);
    }

    // Check if provider is registered
    if (!this.providers.has(target)) {
      throw new Error(`Class ${target.name} is not registered as provider`);
    }

    // No instance
    // Get Metadata: Param Types list in constructor
    const paramTypes: any[] =
      Reflect.getMetadata("design:paramtypes", target) || [];

    // De quy resolve dependency
    const deps = paramTypes.map((dep) => this.resolve(dep));

    // Create new instance
    const instance = new target(...deps);

    // Cache instance
    this.instances.set(target, instance);

    return instance;
  }
}

// Injectable decorator
export function Injectable() {
  return function (target: ClassType) {
    Container.register(target);
  };
}
