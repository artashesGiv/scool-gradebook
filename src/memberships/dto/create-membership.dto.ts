import { ApiProperty } from '@nestjs/swagger'
import { IsNumber, IsString } from 'class-validator'

export class CreateMembershipDto {
  @IsString()
  @ApiProperty({ example: 'uuid' })
  userId: string

  @IsNumber()
  @ApiProperty({ example: 'student' })
  roleId?: number
}
