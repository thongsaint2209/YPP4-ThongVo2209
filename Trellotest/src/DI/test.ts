import 'reflect-metadata';
import { Container } from './container';

// --- Injectable decorator ---
function Injectable(): ClassDecorator {
  return () => {};
}

// --- Repository ---
@Injectable()
class CarRepository {
  private cars = ['Toyota', 'Honda', 'Ford'];

  findAll(): string[] {
    console.log('Repository: fetching cars');
    return this.cars;
  }
}

// --- Service ---
@Injectable()
class CarService {
  constructor(private repo: CarRepository) {}

  getAllCars(): string[] {
    console.log('Service: getAllCars called');
    return this.repo.findAll();
  }
}

// --- Controller ---
@Injectable()
class CarController {
  constructor(private service: CarService) {}

  handleRequest(): string[] {
    console.log('Controller: handleRequest called');
    return this.service.getAllCars();
  }
}

// --- Router ---
@Injectable()
class Router {
  constructor(private controller: CarController) {}

  request(): void {
    console.log('Router: request received');
    const result = this.controller.handleRequest();
    console.log('Router: response ->', result);
  }
}

// --- Test ---
const container = new Container();
const router = container.resolve(Router);

router.request();

/* Output dự kiến:
Router: request received
Controller: handleRequest called
Service: getAllCars called
Repository: fetching cars
Router: response -> [ 'Toyota', 'Honda', 'Ford' ]
*/
