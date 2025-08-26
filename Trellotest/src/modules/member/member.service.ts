import { Injectable } from '@nestjs/common';
import { MemberRepository } from './member.repository';
import { AvatarMemberDto } from './dto/avatar-member.dto';

@Injectable()
export class MemberService {
  constructor(private readonly memberRepository: MemberRepository) {}

  getAvatarBoardMembers(BoardId: number): Promise<AvatarMemberDto[]> {
    return this.memberRepository.getAvatarBoardMembers(BoardId);
  }
}
