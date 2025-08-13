import { BoardService } from "./board.service";
import { CreateBoardDto } from "./dto/create-board.dto";

describe("BoardsService", () => {
  let service: BoardService;

  beforeEach(() => {
    service = new BoardService();
  });

  it("should create a board", () => {
    const dto: CreateBoardDto = { title: "Test", description: "Desc" };
    const board = service.create(dto);
    expect(board).toHaveProperty("id");
    expect(board.title).toBe(dto.title);
    expect(board.description).toBe(dto.description);
  });

  it("should return all boards", () => {
    expect(service.findAll()).toEqual([]);
    service.create({ title: "A" });
    expect(service.findAll().length).toBe(1);
  });
});
