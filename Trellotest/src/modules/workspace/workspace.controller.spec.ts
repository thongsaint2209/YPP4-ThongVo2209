// board.repository.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorkspaceController } from './workspace.controller';
import { WorkspaceService } from './workspace.service';
import { WorkspaceRepository } from './workspace.repository';
import { Workspace } from 'src/entities/workspace.entity';

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
  const OwnerTypeValue = 'WORKSPACE';
  it('should get all workspace that User(id=1) is member', async () => {
    const result = await controller.getWorkspacesUserIsMember(userId);

    expect(result).toBeDefined();
    expect(result).not.toBeNull();
    expect(result!.length).toBe(2);
    result!.forEach((workspace) => {
      expect(workspace.WorkspaceId).toBe('active');
    });
  });

  afterAll(async () => {
    await module.close();
  });
});
