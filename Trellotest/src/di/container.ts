import 'reflect-metadata';
import { Provider } from './provider';
import { Lifetime, ProviderOptions, ProviderToken } from './types';
import { ScopeContext } from './scope';

export class Container {
  private providers = new Map<ProviderToken, Provider>(); // lưu metadata provider
  private singletons = new Map<ProviderToken, any>(); // cache các instance Singleton

  // Map ánh xạ Lifetime -> hàm xử lý cách tạo/resolve instance
  private lifetimeHandlers = new Map<
    Lifetime,
    (provider: Provider<any>, scope?: ScopeContext) => any
  >();

  constructor() {
    // Flow Singleton:
    // Nếu instance chưa có → tạo bằng createInstance → cache vào singletons.
    // Nếu có rồi → lấy ra dùng lại.
    this.lifetimeHandlers.set(Lifetime.Singleton, (provider, scope) => {
      if (!this.singletons.has(provider.token)) {
        this.singletons.set(
          provider.token,
          this.createInstance(provider, scope),
        );
      }
      return this.singletons.get(provider.token);
    });

    //Scoped
    this.lifetimeHandlers.set(Lifetime.Scoped, (provider, scope) => {
      if (!scope) throw new Error('ScopeContext required for scoped providers');
      if (!scope.get(provider.token)) {
        scope.set(provider.token, this.createInstance(provider, scope));
      }
      return scope.get(provider.token);
    });

    // Transient
    // Mỗi lần resolve → gọi createInstance → tạo mới.
    this.lifetimeHandlers.set(Lifetime.Transient, (provider, scope) =>
      this.createInstance(provider, scope),
    );
  }

  register<T>(options: ProviderOptions<T>) {
    const provider = new Provider(options);
    this.providers.set(provider.token, provider);
  }

  // Resolve -> tìm provider theo token -> gọi handler theo lifetime.
  // Chạy handler để lấy instance (có thể cache hoặc tạo mới).
  resolve<T>(token: ProviderToken<T>, scope?: ScopeContext): T {
    const provider = this.providers.get(token);
    if (!provider) throw new Error(`No provider for token: ${String(token)}`);

    //handler -> quyết định tạo mới, dùng cache singleton, hay cache theo scope.
    const handler = this.lifetimeHandlers.get(provider.lifetime);
    if (!handler)
      throw new Error(`No handler for lifetime: ${provider.lifetime}`);

    return handler(provider, scope);
  }

  // useValue: trả về object/value trực tiếp.
  // useFactory: resolve dependencies rồi gọi function factory.
  // useClass: dùng reflect-metadata để đọc constructor params → resolve từng dependency → new class(...deps)
  private createInstance<T>(provider: Provider<T>, scope?: ScopeContext): T {
    if (provider.useValue !== undefined) return provider.useValue;

    if (provider.useFactory) {
      const deps = (provider.inject || []).map((dep) =>
        this.resolve(dep, scope),
      );
      return provider.useFactory(...deps);
    }

    if (provider.useClass) {
      const paramTypes: any[] =
        Reflect.getMetadata('design:paramtypes', provider.useClass) || [];
      const deps = paramTypes.map((dep) => this.resolve(dep, scope)); // resolve đệ quy qua constructor params (metadata)
      return new provider.useClass(...deps);
    }

    throw new Error('Invalid provider definition');
  }

  createScope(): ScopeContext {
    return new ScopeContext();
  }
}
