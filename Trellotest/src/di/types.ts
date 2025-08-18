export type Constructor<T = any> = new (...args: any[]) => T;

export type ProviderToken<T = any> = string | symbol | Constructor<T>;

export enum Lifetime {
  Singleton = 'SINGLETON',
  Transient = 'TRANSIENT',
  Scoped = 'SCOPED',
}

export interface ProviderOptions<T = any> {
  provide: ProviderToken<T>;
  useClass?: Constructor<T>;
  useValue?: T;
  useFactory?: (...args: any[]) => T;
  inject?: ProviderToken[];
  lifetime?: Lifetime;
}
