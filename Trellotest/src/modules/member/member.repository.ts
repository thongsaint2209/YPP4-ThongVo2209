import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Member } from '../../entities/member.entity';
import { AvatarMemberDto } from './dto/avatar-member.dto';

@Injectable()
export class MemberRepository {
  constructor(
    @InjectRepository(Member)
    private readonly memberRepository: Repository<Member>,
  ) {}

  getAvatarBoardMembers(BoardId: number): Promise<AvatarMemberDto[]> {
    const sql = `
        SELECT 
          usr.Id UserId, 
          usr.PictureUrl UserPicture, 
          owt.OwnerTypeValue, 
          mmb.OwnerId BoardId 
        FROM 
          Members mmb 
          JOIN OwnerType owt ON owt.Id = mmb.OwnerTypeId 
          JOIN Users usr ON usr.Id = mmb.UserId 
        WHERE 
          owt.OwnerTypeValue = 'BOARD' 
          AND mmb.OwnerId = ?
`;

    return this.memberRepository.query(sql, [BoardId]);
  }
}
