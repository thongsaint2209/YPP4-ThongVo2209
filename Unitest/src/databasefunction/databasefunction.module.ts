import { Module } from '@nestjs/common';
import { DatabaseFunctionService } from './databasefunction.service';
import { DatabaseFunctionController } from './databasefunction.controller';

@Module({
  controllers: [DatabaseFunctionController],
  providers: [DatabaseFunctionService],
})
export class DatabaseFunctionModule {}
