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
    workspaceService.mockData = [];
    workspaceService.nextId = 1;
  });

  // Create a new workspace
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

  // Update workspaces
  it('should update a workspace', () => {
    // create workspace
    workspaceService.create({
      workspaceName: 'Old Name',
      workspaceDescription: 'Old Description',
      categoryId: 1,
      createdBy: 123,
      updatedBy: 1,
      logoUrl: 'https://logo.com/old.png',
    });

    console.log('🟢 Mock Data:', (workspaceService as any).mockData);

    // Update workspace
    const updated = workspaceService.update(1, {
      workspaceName: 'New Name',
      logoUrl: 'https://new-logo.com/logo.png',
    });

    // Assert: kiểm tra kết quả
    expect(updated).not.toBeNull();
    expect(updated?.workspaceName).toBe('New Name');
    expect(updated?.logoUrl).toBe('https://new-logo.com/logo.png');
  });
});
