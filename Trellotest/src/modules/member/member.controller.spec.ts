// Member.repository.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Member } from '../../entities/member.entity';
import { MemberController } from './member.controller';
import { MemberService } from './member.service';
import { MemberRepository } from './member.repository';

describe('MemberRepository (SQLite in-memory)', () => {
  let controller: MemberController;
  let module: TestingModule;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: 'database.sqlite',
          entities: [__dirname + '/**/*.entity{.ts,.js}'],
        }),
        TypeOrmModule.forFeature([Member]),
      ],
      controllers: [MemberController],
      providers: [MemberService, MemberRepository],
    }).compile();

    controller = module.get<MemberController>(MemberController);
  });
  const BoardId = 1;
  const MemberId = 1;
  const StagePoision = 1;
  //Get avatar's member in a specific board
  it('should return get avatar member in a specific board', async () => {
    const result = await controller.getAvatarMembersOfBoard(BoardId);
    console.log(result);
    expect(result).toBeDefined();
    expect(result).not.toBeNull();
    expect(result.length).toBe(3);
  });

  afterAll(async () => {
    await module.close();
  });
});
