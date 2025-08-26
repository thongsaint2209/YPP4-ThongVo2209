import { UserController } from "../src/controller/user-controller";
import { UserRepository } from "../src/repositories/user-repository";
import { HttpContext } from "../src/server/http-context";
import { UserService } from "../src/service/user-service";

// Mock View.render để kiểm tra output mà không đọc file thật
jest.mock("../src/server/View", () => ({
  View: {
    render: jest.fn(),
  },
}));

describe("MVC Flow Test", () => {
  let repo: UserRepository;
  let service: UserService;
  let controller: UserController;
  let ctx: HttpContext;

  beforeEach(() => {
    // Repository
    repo = new UserRepository();

    // Service
    service = new UserService(repo);

    // Controller
    controller = new UserController(service);

    // HttpContext mock
    ctx = {
      req: {} as any,
      res: {} as any,
      query: { userId: "1", name: "Alice" },
      params: {},
      body: {},
    } as HttpContext;

    jest.clearAllMocks();
  });

  // --- Repository Test ---
  it("Repository: getInfo returns correct user", () => {
    const user = repo.getInfo("1", "Alice");
    expect(user).toEqual({ userId: "1", name: "Alice" });
  });

  it("Repository: getInfo returns undefined for invalid user", () => {
    expect(repo.getInfo("99", "Bob")).toBeUndefined();
  });

  // --- Service Test ---
  it("Service: getUser returns correct user", () => {
    const user = service.getUser("1", "Alice");
    expect(user).toEqual({ userId: "1", name: "Alice" });
  });

  it("Service: getUser returns undefined for invalid user", () => {
    expect(service.getUser("99", "Bob")).toBeUndefined();
  });

  // --- Controller Test ---
  // it("Controller: getUser calls View.render with user data", () => {
  //   controller.getUser(ctx);
  //   expect(View.render).toHaveBeenCalledWith(ctx.res, expect.any(String), {
  //     userId: "1",
  //     name: "Alice",
  //   });
  // });
});
