import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsStrongPassword } from 'class-validator'

export class LoginUserDto {
  @IsEmail({}, { message: 'E-mail указан в неверном формате' })
  @ApiProperty({ example: 'email@gmail.com' })
  email: string

  @IsStrongPassword(
    {},
    { message: 'Пароль должен содержать цифры, символы, буквы' },
  )
  @ApiProperty({ example: '123qweASD' })
  password: string
}
