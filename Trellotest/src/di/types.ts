export type Constructor<T = any> = new (...args: any[]) => T;

export type ProviderToken<T = any> = string | symbol | Constructor<T>; // key để định danh provider

export enum Lifetime {
  Singleton = 'SINGLETON',
  Transient = 'TRANSIENT',
  Scoped = 'SCOPED',
}

// config khi register provider
export interface ProviderOptions<T = any> {
  provide: ProviderToken<T>;
  useClass?: Constructor<T>;
  useValue?: T;
  useFactory?: (...args: any[]) => T;
  inject?: ProviderToken[];
  lifetime?: Lifetime;
}
