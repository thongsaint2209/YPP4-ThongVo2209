import { Test, TestingModule } from '@nestjs/testing';
import { UserViewHistoryService } from './user-view-history.service';

describe('UserViewHistoryService', () => {
  let service: UserViewHistoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserViewHistoryService],
    }).compile();

    service = module.get<UserViewHistoryService>(UserViewHistoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
