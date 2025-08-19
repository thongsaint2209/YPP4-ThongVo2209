import 'reflect-metadata';
import { Lifetime } from './types';

// Để container đọc dc metadata khi useClass
export function Injectable(options?: { lifetime?: Lifetime }) {
  return function (target: any) {
    Reflect.defineMetadata(
      'di:lifetime',
      options?.lifetime ?? Lifetime.Singleton,
      target,
    );
  };
}
