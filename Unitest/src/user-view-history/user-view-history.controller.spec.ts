import { Test, TestingModule } from '@nestjs/testing';
import { UserViewHistoryController } from './user-view-history.controller';
import { UserViewHistoryService } from './user-view-history.service';

describe('UserViewHistoryController', () => {
  let controller: UserViewHistoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserViewHistoryController],
      providers: [UserViewHistoryService],
    }).compile();

    controller = module.get<UserViewHistoryController>(UserViewHistoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
