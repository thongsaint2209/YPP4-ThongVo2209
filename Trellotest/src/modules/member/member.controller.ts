// MemberMember.controller.ts
import { Controller, Get } from '@nestjs/common';
import { MemberService } from './member.service';
import { AvatarMemberDto } from './dto/avatar-member.dto';

@Controller('Member')
export class MemberController {
  constructor(private readonly memberService: MemberService) {}

  @Get('getAvatarMembersOfBoard')
  getAvatarMembersOfBoard(BoardId: number): Promise<AvatarMemberDto[]> {
    return this.memberService.getAvatarMembersOfBoard(BoardId);
  }
}
