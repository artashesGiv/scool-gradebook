import { ApiProperty } from '@nestjs/swagger'
import {
  IsEmail,
  IsOptional,
  IsPhoneNumber,
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
  @ApiProperty({ example: 'Имя' })
  name: string

  @IsString()
  @ApiProperty({ example: 'Фамилия' })
  lastName: string

  @IsOptional()
  @IsString()
  @ApiProperty({ example: 'Отчество' })
  middleName?: string

  @IsOptional()
  @IsPhoneNumber('RU', {
    message: 'Укажите корректный номер в формате +7XXXXXXXXXX',
  })
  @ApiProperty({ example: 'Телефон организации' })
  phone?: string
}
