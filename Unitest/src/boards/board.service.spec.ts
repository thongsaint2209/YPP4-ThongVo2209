import { Test, TestingModule } from '@nestjs/testing';
import { BoardService } from './board.service';
import { Board } from './entities/board.entity';

describe('BoardService - create() & update()', () => {
  let boardService: BoardService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BoardService],
    }).compile();

    boardService = module.get<BoardService>(BoardService);

    // Reset dữ liệu mỗi lần test
    boardService.mockData = [];
    boardService.nextId = 1;
  });

  // ✅ Create a new board
  it('should create a board successfully', () => {
    const input = {
      boardName: 'Project Board',
      boardDescription: 'Description of project board',
      workspaceId: 1,
      createdBy: 1001,
      backgroundUrl: 'https://example.com/bg.png',
    };

    const result = boardService.create(input);

    expect(result).toHaveProperty('id');
    expect(result.boardName).toBe(input.boardName);
    expect(result.boardDescription).toBe(input.boardDescription);
    expect(result.workspaceId).toBe(input.workspaceId);
    expect(result.createdBy).toBe(input.createdBy);
    expect(result.backgroundUrl).toBe(input.backgroundUrl);
    expect(boardService.findAll().length).toBe(1);
  });

  // ✅ Update board
  it('should update a board successfully', () => {
    // Step 1: Create board
    boardService.create({
      boardName: 'Old Board',
      boardDescription: 'Old description',
      workspaceId: 1,
      createdBy: 1001,
      backgroundUrl: 'https://old.com/bg.png',
    });

    // Step 2: Update board
    const updated = boardService.update(1, {
      boardName: 'New Board',
      boardDescription: 'New description',
      backgroundUrl: 'https://new.com/bg.png',
      updatedBy: 2002,
    });

    // Step 3: Assert
    expect(updated).not.toBeNull();
    expect(updated?.boardName).toBe('New Board');
    expect(updated?.boardDescription).toBe('New description');
    expect(updated?.backgroundUrl).toBe('https://new.com/bg.png');
    expect(updated?.updatedBy).toBe(2002);
    expect(updated?.updatedAt).toBeInstanceOf(Date);
  });
});
