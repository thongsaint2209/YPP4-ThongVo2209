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
      workspaceName: 'Create Workspace',
      workspaceDescription: 'Create Description',
      createdBy: 1001,
    };

    const result = workspaceService.create(input);

    expect(result).toHaveProperty('id');
    expect(result.workspaceName).toBe(input.workspaceName);
    expect(result.workspaceDescription).toBe(input.workspaceDescription);
    expect(result.createdBy).toBe(input.createdBy);
    expect(workspaceService.findAll().length).toBe(1);
  });

  // Update workspaces
  it('should update a workspace', () => {
    // create workspace
    workspaceService.create({
      workspaceName: 'Old Name',
      workspaceDescription: 'Old Description',
      logoUrl: 'https://logo.com/old.png',
    });

    // console.log('🟢 Mock Data:', (workspaceService as any).mockData);

    // Update workspace
    const updated = workspaceService.update(1, {
      workspaceName: 'New Name',
      workspaceDescription: 'New Description Name',
      logoUrl: 'https://new-logo.com/logo.png',
    });

    // Assert: kiểm tra kết quả
    expect(updated).not.toBeNull();
    expect(updated?.workspaceName).toBe('New Name');
    expect(updated?.workspaceDescription).toBe('New Description Name');
    expect(updated?.logoUrl).toBe('https://new-logo.com/logo.png');
  });

  // Delete workspace
  it('should delete a workspace from multiple items', () => {
    // Tạo 2 workspace ban đầu
    [
      {
        workspaceName: 'Workspace 1',
        workspaceDescription: 'Description 1',
        logoUrl: 'https://logo.com/1.png',
      },
      {
        workspaceName: 'Workspace 2',
        workspaceDescription: 'Description 2',
        logoUrl: 'https://logo.com/2.png',
      },
    ].forEach((ws) => workspaceService.create(ws));

    // Số lượng ban đầu phải là 2
    const initialCount = workspaceService.findAll().length;

    expect(initialCount).toBe(2);

    // Xóa workspace có id = 1
    const deleted = workspaceService.delete(1);

    // Kiểm tra xóa thành công
    expect(deleted).toBe(true);

    // Số lượng sau khi xóa phải giảm 1
    const afterDeleteCount = workspaceService.findAll().length;
    expect(afterDeleteCount).toBe(initialCount - 1);

    // Kiểm tra dữ liệu trong mockData không còn workspace có id = 1
    workspaceService.delete(1);
    expect(workspaceService.getById(1)).toBeNull(); // ✅ pass
  });
});
