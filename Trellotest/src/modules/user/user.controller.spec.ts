// User.repository.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../entities/user.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserRepository } from './user.repository';

describe('UserRepository (SQLite in-memory)', () => {
  let controller: UserController;
  let module: TestingModule;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: 'database.sqlite',
          entities: [__dirname + '/**/*.entity{.ts,.js}'],
        }),
        TypeOrmModule.forFeature([User]),
      ],
      controllers: [UserController],
      providers: [UserService, UserRepository],
    }).compile();

    controller = module.get<UserController>(UserController);
  });
  const userId = 2;
  const Email = 'alice99@example.com';
  //Get Avatar specific user
  it('should return avatar for specific user', async () => {
    const result = await controller.getAvatarUser(userId);
    console.log(result);
    expect(result).toBeDefined();
    expect(result).not.toBeNull();

    expect(result[0]).toHaveProperty('PictureUrl');
    expect(result[0].PictureUrl).toBe(result[0].PictureUrl);
    expect(result[0]).toHaveProperty('Id');
    expect(result[0].Id).toBe(result[0].Id);
  });

  //Get Infor specific user
  it('should return Infor for specific user', async () => {
    const result = await controller.getInforUser(Email);
    console.log(result);
    expect(result).toBeDefined();
    expect(result).not.toBeNull();

    expect(result[0].PictureUrl).toBe(result[0].PictureUrl);
    expect(result[0].Email).toBe(result[0].Email);
    expect(result[0].Username).toBe(result[0].Username);
    expect(result[0].Id).toBe(result[0].Id);
  });

  afterAll(async () => {
    await module.close();
  });
});
