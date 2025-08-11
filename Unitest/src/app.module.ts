import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WorkspaceModule } from './workspace/workspace.module';
import { DatabaseFunctionModule } from './databasefunction/databasefunction.module';
import { UserModule } from './user/user.module';
import { UserViewHistoryModule } from './user-view-history/user-view-history.module';

@Module({
  imports: [WorkspaceModule, DatabaseFunctionModule, UserModule, UserViewHistoryModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
