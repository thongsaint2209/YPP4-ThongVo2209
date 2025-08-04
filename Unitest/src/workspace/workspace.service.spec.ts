import { Test, TestingModule } from '@nestjs/testing';
import { WorkspaceService } from './workspace.service';
import { Workspace } from './entities/workspace.entity';

describe('WorkspaceService - create()', () => {
  let workspaceService: WorkspaceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WorkspaceService],
    }).compile();

    workspaceService = module.get<WorkspaceService>(WorkspaceService);

    // Reset dữ liệu mỗi lần test
    (workspaceService as any).mockData = [];
    (workspaceService as any).nextId = 1;
  });

  it('should create a workspace successfully', () => {
    const input = {
      workspaceName: 'Test Workspace',
      workspaceDescription: 'Test Description',
      categoryId: 1,
      createdAt: new Date(),
      createdBy: 1001,
      updatedAt: new Date(),
      updatedBy: 1,
      logoUrl: 'https://logo.com/image.png',
    };

    const result = workspaceService.create(input);

    expect(result).toHaveProperty('id');
    expect(result.workspaceName).toBe(input.workspaceName);
    expect(result.createdBy).toBe(input.createdBy);
    expect(workspaceService.findAll().length).toBe(1);
  });

  it('should update a workspace', () => {
    // Tạo workspace đầu tiên
    const workspaceToBeUpdated = new Workspace(
      1,
      'New Name',
      'New description',
      2,
      new Date(),
      456,
      undefined,
      undefined,
      'https://new-logo.com/logo.png',
    );

    // Gọi hàm update
    const updated = workspaceService.update(
      workspaceToBeUpdated.id,
      workspaceToBeUpdated,
    );

    // Kiểm tra kết quả
    // expect(updated).not.toBeNull();
    // expect(updated?.workspaceName).toBe('New Name');
    // expect(updated?.workspaceDescription).toBe('New description');
    expect(updated?.categoryId).toBe(2);
    // expect(updated?.logoUrl).toBe('https://new-logo.com/logo.png');
  });
});
