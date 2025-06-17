import { ApiProperty } from '@nestjs/swagger'
import { GlobalRoleType } from '@/common/enums/roles.enum'

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
  globalRole: GlobalRoleType

  @ApiProperty({ example: '2025-06-15T09:33:47.932Z' })
  createdAt: Date

  @ApiProperty({ example: '2025-06-15T09:33:47.932Z' })
  updatedAt: Date
}
