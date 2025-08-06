import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WorkspaceModule } from './workspace/workspace.module';
import { WorkspaceboardModule } from './workspaceboard/workspaceboard.module';

@Module({
  imports: [WorkspaceModule, WorkspaceboardModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
