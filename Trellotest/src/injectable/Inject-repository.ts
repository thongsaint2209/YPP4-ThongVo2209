import 'reflect-metadata';

// Key lưu metadata riêng cho repository
const INJECT_REPO_KEY = Symbol('inject_repo');

// Decorator: đánh dấu param nào cần repository
export function InjectRepository(entity: Function): ParameterDecorator {
  return (target, propertyKey, parameterIndex) => {
    // Lưu metadata: paramIndex -> entity
    const existing =
      Reflect.getMetadata(INJECT_REPO_KEY, target) || new Map<number, any>();

    existing.set(parameterIndex, entity);

    Reflect.defineMetadata(INJECT_REPO_KEY, existing, target);
  };
}

// Hàm lấy metadata
export function getInjectRepositories(target: any): Map<number, any> {
  return Reflect.getMetadata(INJECT_REPO_KEY, target) || new Map();
}
