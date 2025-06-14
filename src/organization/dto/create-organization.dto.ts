import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsString, MinLength } from 'class-validator'

export class CreateOrganizationDto {
  @IsString()
  @MinLength(3)
  @ApiProperty({ example: 'Название' })
  name: string

  @ApiProperty({ example: 'email@gmail.com' })
  @IsEmail({}, { message: 'E-mail организации' })
  email?: string

  @IsString()
  @ApiProperty({ example: 'Описание организации' })
  description?: string

  @IsString()
  @ApiProperty({ example: 'Телефон организации' })
  phone?: string
}
