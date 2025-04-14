import { ApiProperty } from '@nestjs/swagger'

export class LoginUserDto {
  @ApiProperty({ example: 'email@gmail.com' })
  email: string

  @ApiProperty({ example: '123qweASD' })
  password: string
}
