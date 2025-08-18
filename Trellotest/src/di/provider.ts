import { Lifetime, ProviderOptions, ProviderToken } from './types';

export class Provider<T = any> {
  token: ProviderToken<T>;
  useClass?: any;
  useValue?: any;
  useFactory?: (...args: any[]) => T;
  inject?: ProviderToken[];
  lifetime: Lifetime;

  constructor(options: ProviderOptions<T>) {
    this.token = options.provide;
    this.useClass = options.useClass;
    this.useValue = options.useValue;
    this.useFactory = options.useFactory;
    this.inject = options.inject || [];
    this.lifetime = options.lifetime || Lifetime.Singleton;
  }
}
