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
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { User } from './entities/user.entity'
import { RolesGuard } from '@/auth/roles.guard'
import { Request } from 'express'
import { Roles } from '@/common/decorators/roles.decorator'
import { Membership } from '@/memberships/entities/membership.entity'
import { MembershipsService } from '@/memberships/memberships.service'
import { ResponseUserDto } from '@/users/dto/response-user.dto'

@ApiTags('Пользователи')
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly membershipService: MembershipsService,
  ) {}

  @ApiOperation({ summary: 'Получить всех пользователей' })
  @ApiResponse({ status: 200, type: [ResponseUserDto] })
  @UseGuards(RolesGuard)
  @Roles('admin')
  @Get()
  findAll() {
    return this.usersService.findAll()
  }

  @ApiOperation({ summary: 'Получить авторизованного пользователя' })
  @ApiResponse({ status: 200, type: ResponseUserDto })
  @Get('/profile')
  findOwner(@Req() req: Request) {
    return this.usersService.findOne(req.user.id)
  }

  @ApiOperation({ summary: 'Получить пользователя' })
  @ApiResponse({ status: 200, type: ResponseUserDto })
  @UseGuards(RolesGuard)
  @Roles('admin')
  @Get(':userId')
  findOne(
    @Param('userId', new ParseUUIDPipe())
    id: User['id'],
  ) {
    return this.usersService.findOne(id)
  }

  @ApiOperation({ summary: 'Редактировать пользователя' })
  @ApiResponse({ status: 200, type: ResponseUserDto })
  @ApiBody({ type: UpdateUserDto })
  @UseGuards(RolesGuard)
  @Roles('admin')
  @Patch(':userId')
  update(
    @Param('userId', new ParseUUIDPipe()) id: User['id'],
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(id, updateUserDto)
  }

  @ApiOperation({ summary: 'Удалить пользователя' })
  @ApiResponse({ status: 200 })
  @UseGuards(RolesGuard)
  @Roles('admin')
  @Delete(':userId')
  remove(@Param('userId', new ParseUUIDPipe()) id: User['id']) {
    return this.usersService.remove(id)
  }

  @ApiOperation({ summary: 'Получить организации одного пользователя' })
  @ApiResponse({ status: 200, type: [Membership] })
  @UseGuards(RolesGuard)
  @Roles('admin')
  @Get(':userId/organizations')
  findOrganizations(@Param('userId', new ParseUUIDPipe()) userId: User['id']) {
    return this.membershipService.getAllMembershipsUser(userId)
  }
}
