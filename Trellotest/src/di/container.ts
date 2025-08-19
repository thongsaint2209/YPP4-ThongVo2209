import 'reflect-metadata';

export class Container {
  private instances = new Map<any, any>(); // dictionary cache instance
  // ben class ben instance
  resolve<T>(target: new (...args: any[]) => T): T {
    // Nếu instance đã có trong dictionary thì trả luôn (Singleton)
    if (this.instances.has(target)) {
      return this.instances.get(target);
    }
    // chua co instance
    // Lấy metadata: danh sách param types trong constructor
    const paramTypes: any[] =
      Reflect.getMetadata('design:paramtypes', target) || [];

    // Đệ quy resolve từng dependency de
    const deps = paramTypes.map((dep) => this.resolve(dep));

    // Tạo instance mới
    const instance = new target(...deps);

    // Lưu vào dictionary
    this.instances.set(target, instance);

    return instance;
  }
}
