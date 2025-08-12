import { Test, TestingModule } from '@nestjs/testing';
import { BoardService } from './board.service';
import { BoardRepository } from './board.repository';
import { CreateBoardDto } from './dto/create-board.dto';

describe('BoardService - create()', () => {
  let boardService: BoardService;
  let boardRepository: BoardRepository;

  beforeEach(async () => {
    const mockBoardRepository = {
      create: jest.fn((data) => ({
        id: 1,
        title: data.title,
        workspaceName: data.workspaceName,
      })),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BoardService,
        { provide: BoardRepository, useValue: mockBoardRepository },
      ],
    }).compile();

    boardService = module.get<BoardService>(BoardService);
    boardRepository = module.get<BoardRepository>(BoardRepository);
  });

  it('should create a board successfully', () => {
    const dto: CreateBoardDto = {
      title: 'Project Board',
      workspaceName: 'Workspace A',
    };

    const result = boardService.create(dto);

    // Kiểm tra repository.create được gọi đúng tham số
    expect(boardRepository.create).toHaveBeenCalledWith({
      title: dto.title,
      workspaceName: dto.workspaceName,
    });

    // Kiểm tra kết quả trả về
    expect(result).toHaveProperty('id', 1);
    expect(result.title).toBe(dto.title);
    expect(result.workspaceName).toBe(dto.workspaceName);
  });
});
