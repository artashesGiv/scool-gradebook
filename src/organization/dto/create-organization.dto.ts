import { ApiProperty } from '@nestjs/swagger'
import {
  IsEmail,
  IsOptional,
  IsPhoneNumber,
  IsString,
  MinLength,
} from 'class-validator'

export class CreateOrganizationDto {
  @IsString()
  @MinLength(3)
  @ApiProperty({ example: 'Название' })
  name: string

  @IsOptional()
  @ApiProperty({ example: 'email@gmail.com' })
  @IsEmail({}, { message: 'E-mail организации' })
  email?: string

  @IsOptional()
  @IsString()
  @ApiProperty({ example: 'Описание организации' })
  description?: string

  @IsOptional()
  @IsString()
  @ApiProperty({ example: 'Город организации' })
  city?: string

  @IsOptional()
  @IsPhoneNumber('RU', {
    message: 'Укажите корректный номер в формате +7XXXXXXXXXX',
  })
  @ApiProperty({ example: 'Телефон организации' })
  phone?: string
}
