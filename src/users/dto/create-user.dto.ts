import { ApiProperty } from '@nestjs/swagger'
import {
  IsEmail,
  IsOptional,
  IsString,
  IsStrongPassword,
  MinLength,
} from 'class-validator'

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

  @IsString()
  @MinLength(3)
  @ApiProperty({ example: 'name' })
  name: string

  @IsString()
  @MinLength(3)
  @ApiProperty({ example: 'middle name' })
  middleName: string

  @IsString()
  @IsOptional()
  @ApiProperty({ example: null })
  lastName?: string
}
