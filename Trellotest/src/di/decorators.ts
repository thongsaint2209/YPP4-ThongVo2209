import 'reflect-metadata';
import { Lifetime } from './types';

export function Injectable(options?: { lifetime?: Lifetime }) {
  return function (target: any) {
    Reflect.defineMetadata(
      'di:lifetime',
      options?.lifetime ?? Lifetime.Singleton,
      target,
    );
  };
}
