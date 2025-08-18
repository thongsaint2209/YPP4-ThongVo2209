import 'reflect-metadata';
import { Provider } from './provider';
import { Lifetime, ProviderOptions, ProviderToken, Constructor } from './types';
import { ScopeContext } from './scope';

export class Container {
  private providers = new Map<ProviderToken, Provider>();
  private singletons = new Map<ProviderToken, any>();

  register<T>(options: ProviderOptions<T>) {
    const provider = new Provider(options);
    this.providers.set(provider.token, provider);
  }

  resolve<T>(token: ProviderToken<T>, scope?: ScopeContext): T {
    const provider = this.providers.get(token);
    if (!provider) throw new Error(`No provider for token: ${String(token)}`);

    // Lifetime = Singleton
    if (provider.lifetime === Lifetime.Singleton) {
      if (!this.singletons.has(provider.token)) {
        this.singletons.set(provider.token, this.createInstance(provider));
      }
      return this.singletons.get(provider.token);
    }

    // Lifetime = Scoped
    if (provider.lifetime === Lifetime.Scoped) {
      if (!scope) throw new Error('ScopeContext required for scoped providers');
      if (!scope.get(provider.token)) {
        scope.set(provider.token, this.createInstance(provider, scope));
      }
      return scope.get(provider.token);
    }

    // Lifetime = Transient
    return this.createInstance(provider, scope);
  }

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
      const deps = paramTypes.map((dep) => this.resolve(dep, scope));
      return new provider.useClass(...deps);
    }

    throw new Error('Invalid provider definition');
  }

  createScope(): ScopeContext {
    return new ScopeContext();
  }
}
