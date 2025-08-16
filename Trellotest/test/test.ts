// --- Router ---
export class Router {
  constructor(private readonly controller1: Controller1) {}

  request(path: string): void {
    console.log(`🚏 Router: Received request for path '${path}'`);
    const result = this.controller1.request();
    console.log('📤 Router: Sending response to client:', result);
  }
}

// --- Controller ---
export class Controller1 {
  constructor(private readonly userService: UserService) {}

  request(): News {
    return this.userService.request();
  }
}

// --- Service ---
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  request(): News {
    return this.userRepository.request();
  }
}

// --- Repository ---
export class UserRepository {
  constructor(private readonly news: News) {}

  request(): News {
    return this.news;
  }
}

// --- Model ---
export class News {
  constructor(
    public id: number,
    public name: string,
  ) {}
}

// Flow
const newsData = new News(1, 'Breaking News: TypeScript OOP Simulation!');
const repository = new UserRepository(newsData);
const service = new UserService(repository);
const controller = new Controller1(service);
const router = new Router(controller);
