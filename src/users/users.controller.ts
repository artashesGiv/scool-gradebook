import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Req,
  UseGuards,
} from '@nestjs/common'
import { UsersService } from './users.service'
import { UpdateUserDto } from './dto/update-user.dto'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { User } from './entities/user.entity'
import { RolesGuard } from '@/auth/roles.guard'
import { Request } from 'express'
import { Roles } from '@/common/decorators/roles.decorator'

@ApiTags('Пользователи')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: 'Получить всех пользователей' })
  @ApiResponse({ status: 200, type: [User] })
  @UseGuards(RolesGuard)
  @Roles('admin')
  @Get()
  findAll() {
    return this.usersService.findAll()
  }

  @ApiOperation({ summary: 'Получить авторизованного пользователя' })
  @ApiResponse({ status: 200, type: User })
  @Get('/profile')
  findOwner(@Req() req: Request) {
    return this.usersService.findOne(req.user!.id)
  }

  @ApiOperation({ summary: 'Получить пользователя' })
  @ApiResponse({ status: 200, type: User })
  @UseGuards(RolesGuard)
  @Roles('admin')
  @Get(':id')
  findOne(
    @Param('id', new ParseUUIDPipe())
    id: string,
  ) {
    return this.usersService.findOne(id)
  }

  @UseGuards(RolesGuard)
  @Roles('admin')
  @Patch(':id')
  update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(id, updateUserDto)
  }

  @UseGuards(RolesGuard)
  @Roles('admin')
  @Delete(':id')
  remove(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.usersService.remove(id)
  }
}
