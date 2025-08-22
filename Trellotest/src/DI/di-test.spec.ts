import 'reflect-metadata';
import { Container, Injectable } from './container'; // file container bạn vừa viết

// === Repository ===
@Injectable()
class UserRepository {
  findUser(id: number) {
    return { id, name: 'Alice' };
  }
}

// === Service ===
@Injectable()
class UserService {
  constructor(private repo: UserRepository) {}

  getUserName(id: number) {
    const user = this.repo.findUser(id);
    return user.name;
  }
}

// === Controller ===
@Injectable()
class UserController {
  constructor(private service: UserService) {}

  getUser(id: number) {
    return this.service.getUserName(id);
  }
}

// === Router ===
class Router {
  constructor(private controller: UserController) {}

  handleRequest(path: string, id: number) {
    if (path === '/user') {
      return this.controller.getUser(id);
    }
    return null;
  }
}

// === Unit Test ===
describe('Router → Controller → Service → Repository', () => {
  beforeEach(() => {
    // Clear container state
    (Container as any).instances.clear?.();
    (Container as any).providers.clear?.();

    // Register providers manually (decorator Injectable() cũng làm điều này)
    Container.register(UserRepository);
    Container.register(UserService);
    Container.register(UserController);
  });

  describe('Container.register', () => {
    it('should register all services in container', () => {
      expect((Container as any).providers.has(UserRepository)).toBe(true);
      expect((Container as any).providers.has(UserService)).toBe(true);
      expect((Container as any).providers.has(UserController)).toBe(true);
    });
  });

  describe('Container.resolve', () => {
    it('should resolve the full chain and return correct value', () => {
      const userId = 1;
      const controller = Container.resolve(UserController);
      const router = new Router(controller);

      const result = router.handleRequest('/user', userId);
      expect(result).toBe('Alice');
    });

    it('should resolve SINGLETON service and return same instance', () => {
      const userId = 1;
      const service1 = Container.resolve(UserService);
      const service2 = Container.resolve(UserService);

      expect(service1).toBe(service2);
      expect(service1.getUserName(userId)).toBe('Alice');
    });
  });
});
