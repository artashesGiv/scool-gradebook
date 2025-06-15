import { ApiProperty } from '@nestjs/swagger'
import { IsString } from 'class-validator'
import { OrgRoleType } from '@/common/enums/roles.enum'

export class CreateMembershipDto {
  @IsString()
  @ApiProperty({ example: 'uuid' })
  userId: string

  @IsString()
  @ApiProperty({ example: 'student' })
  role?: OrgRoleType
}
