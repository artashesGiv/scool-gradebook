import { ApiProperty } from '@nestjs/swagger'

// TODO добавить проверку пароля
export class CreateUserDto {
  @ApiProperty({ example: 'email@gmail.com' })
  email: string

  @ApiProperty({ example: '123qweASD' })
  password: string

  @ApiProperty({ example: 'name' })
  name: string

  @ApiProperty({ example: 'middle name' })
  middleName: string

  @ApiProperty({ example: null })
  lastName?: string
}
