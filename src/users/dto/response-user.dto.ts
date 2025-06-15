import { ApiProperty } from '@nestjs/swagger'
import { Membership } from '@/memberships/entities/membership.entity'
import { GlobalRole } from '@/common/enums/roles.enum'

export class ResponseUserDto {
  @ApiProperty({ example: 'uuid' })
  id: string

  @ApiProperty({ example: 'email@gmail.com' })
  email: string

  @ApiProperty({ example: 'Имя' })
  name: string

  @ApiProperty({ example: 'Фамилия' })
  lastName: string

  @ApiProperty({ example: 'Отчество' })
  middleName?: string

  @ApiProperty({ example: 'Телефон организации' })
  phone?: string

  @ApiProperty({ example: 'user' })
  globalRole: GlobalRole

  @ApiProperty({ example: [] })
  memberships: Membership[]
}
