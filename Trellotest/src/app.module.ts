import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardModule } from './modules/board/board.module';
import { CacheModule } from './common/cache/cache.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'data/dev.sqlite', // sẽ tự tạo nếu chưa có
      synchronize: true, // chỉ dùng DEV
      autoLoadEntities: true, // tự nhận entity từ các module
      logging: false,
    }),
    BoardModule, // (bước 4 tạo)
  ],
})
export class AppModule {}
