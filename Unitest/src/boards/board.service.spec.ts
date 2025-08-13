// board.service.spec.ts
import { BoardRepository } from './board.repository';
import { BoardService } from './board.service';
import { TestDatabaseHelper } from '../config/test-database';

describe('BoardService.getStarredBoard', () => {
  let dbHelper: TestDatabaseHelper;
  let repository: BoardRepository;
  let service: BoardService;

  beforeAll(() => {
    dbHelper = new TestDatabaseHelper();
    dbHelper.connect();
    dbHelper.createSchema();
    dbHelper.seedTestData();

    repository = new BoardRepository(dbHelper.getDb()); // truyền db vào repository
    service = new BoardService(repository); // truyền repository vào service
  });

  afterAll(() => {
    dbHelper.close();
  });

  it('should return only active starred boards for a given user', () => {
    const result = service.getStarredBoard(1);

    expect(result).toHaveLength(1);
    expect(result[0]).toMatchObject({
      UserId: 1,
      BoardId: 1,
      BoardName: 'Test Board 1',
      BackgroundUrl: 'url1',
      BoardStatus: 'active',
      StarredBoardsStatus: 1,
    });
  });

  it('should return empty array if user has no active starred boards', () => {
    const result = service.getStarredBoard(999);
    expect(result).toEqual([]);
  });
});
