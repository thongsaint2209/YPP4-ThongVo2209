// board.repository.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorkspaceController } from './workspace.controller';
import { WorkspaceService } from './workspace.service';
import { WorkspaceRepository } from './workspace.repository';
import { Workspace } from '../../entities/workspace.entity';

describe('WorkspaceRepository (SQLite in-memory)', () => {
  let controller: WorkspaceController;
  let module: TestingModule;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: 'database.sqlite',
          entities: [__dirname + '/**/*.entity{.ts,.js}'],
        }),
        TypeOrmModule.forFeature([Workspace]),
      ],
      controllers: [WorkspaceController],
      providers: [WorkspaceService, WorkspaceRepository],
    }).compile();

    controller = module.get<WorkspaceController>(WorkspaceController);
  });
  const userId = 1;
  const workspaceId = 1;

  // Get all workspaces that user is member
  it('should get all workspace that User(id=1) is member', async () => {
    const result = await controller.getWorkspacesWhereUserIsMember(userId);

    expect(result).toBeDefined();
    expect(result).not.toBeNull();
    expect(result!.length).toBe(2);
  });

  // Get all workspace types
  it('should get all workspace type', async () => {
    const result = await controller.getWorkspacesType();

    expect(result).toBeDefined();
    expect(result).not.toBeNull();
    expect(result!.length).toBe(9);
  });

  // Get specific workspace that user is member
  it('should get a part specific workspace that user is member', async () => {
    const result = await controller.getWorkspaceIsMember(userId, workspaceId);
    expect(result).toBeDefined();
    expect(result).not.toBeNull();
    expect(result!.length).toBe(1);
  });

  afterAll(async () => {
    await module.close();
  });
});
