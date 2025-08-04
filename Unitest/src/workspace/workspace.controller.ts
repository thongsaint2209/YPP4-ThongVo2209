import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { WorkspaceService } from './workspace.service';
import { Workspace } from './entities/workspace.entity';

@Controller('workspace')
export class WorkspaceController {
  constructor(private readonly workspaceService: WorkspaceService) {}

  // GET all workspaces
  @Get()
  findAll() {
    return this.workspaceService.findAll();
  }

  // GET workspace by ID
  @Get(':id')
  getById(@Param('id') id: string) {
    return this.workspaceService.getWorkspaceById(Number(id));
  }

  // CREATE new workspace
  @Post()
  create(@Body() body: Omit<Workspace, 'id' | 'createdAt'>) {
    return this.workspaceService.create(body);
  }

  // UPDATE workspace by ID
  @Put(':id')
  update(@Param('id') id: string, @Body() body: Partial<Workspace>) {
    return this.workspaceService.update(Number(id), body);
  }

  // DELETE workspace by ID
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.workspaceService.delete(Number(id));
  }
}
