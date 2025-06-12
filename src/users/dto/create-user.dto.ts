import { ApiProperty } from '@nestjs/swagger'
import {
  IsEmail,
  IsOptional,
  IsString,
  IsStrongPassword,
  MinLength,
} from 'class-validator'
import { Match } from '@/common/decorators/match.decorator'

export class CreateUserDto {
  @ApiProperty({ example: 'email@gmail.com' })
  @IsEmail({}, { message: 'E-mail указан в неверном формате' })
  email: string

  @ApiProperty({ example: '123qweASD' })
  @IsStrongPassword(
    {},
    { message: 'Пароль должен содержать цифры, символы, буквы' },
  )
  password: string

  @ApiProperty({ example: '123qweASD' })
  @Match('password', { message: 'Пароли не совпадают' })
  repeatPassword: string

  @IsString()
  @MinLength(3)
  @ApiProperty({ example: 'name' })
  name: string

  @IsString()
  @IsOptional()
  @ApiProperty({ example: null })
  lastName: string
}
