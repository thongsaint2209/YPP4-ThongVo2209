import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WorkspaceModule } from './workspace/workspace.module';
import { DatabaseFunctionModule } from './databasefunction/databasefunction.module';

@Module({
  imports: [WorkspaceModule, DatabaseFunctionModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
