import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common'
import { OrganizationService } from './organization.service'
import { CreateOrganizationDto } from './dto/create-organization.dto'
import { UpdateOrganizationDto } from './dto/update-organization.dto'
import { MembershipsService } from '@/memberships/memberships.service'
import { CreateMembershipDto } from '@/memberships/dto/create-membership.dto'
import { RolesGuard } from '@/auth/roles.guard'
import { Roles } from '@/common/decorators/roles.decorator'
import { Request } from 'express'
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger'
import { Organization } from '@/organization/entities/organization.entity'
import { Membership } from '@/memberships/entities/membership.entity'

@Controller('organization')
export class OrganizationController {
  constructor(
    private readonly organizationService: OrganizationService,
    private readonly membershipService: MembershipsService,
  ) {}

  @ApiOperation({ summary: 'Создать организацию' })
  @ApiBody({ type: CreateOrganizationDto })
  @ApiResponse({ status: 200, type: Organization })
  @Post()
  create(
    @Body() createOrganizationDto: CreateOrganizationDto,
    @Req() req: Request,
  ) {
    return this.organizationService.create(createOrganizationDto, req.user)
  }

  @ApiOperation({ summary: 'Получить все организации' })
  @ApiResponse({ status: 200, type: [Organization] })
  @Get()
  findAll() {
    return this.organizationService.findAll()
  }

  @ApiOperation({ summary: 'Получить организацию по id' })
  @ApiResponse({ status: 200, type: Organization })
  @UseGuards(RolesGuard)
  @Roles('head-teacher', 'teacher', 'student')
  @Get(':orgId')
  findOne(@Param('orgId', new ParseUUIDPipe()) id: Organization['id']) {
    return this.organizationService.findOne(id)
  }

  @ApiOperation({ summary: 'Добавить пользователя к организации' })
  @ApiBody({ type: CreateMembershipDto })
  @ApiResponse({ status: 200, type: Membership })
  @UseGuards(RolesGuard)
  @Roles('head-teacher')
  @Post(':orgId/add-user')
  addUser(
    @Param('orgId', new ParseUUIDPipe()) id: Organization['id'],
    @Body() createMembershipDto: CreateMembershipDto,
  ) {
    return this.membershipService.addUserToOrg(id, createMembershipDto)
  }

  @ApiOperation({ summary: 'Добавить пользователя к организации' })
  @ApiBody({ type: UpdateOrganizationDto })
  @ApiResponse({ status: 200, type: Organization })
  @Patch(':id')
  update(
    @Param('id', new ParseUUIDPipe()) id: Organization['id'],
    @Body() updateOrganizationDto: UpdateOrganizationDto,
  ) {
    return this.organizationService.update(+id, updateOrganizationDto)
  }

  @Delete(':id')
  remove(@Param('id', new ParseUUIDPipe()) id: Organization['id']) {
    return this.organizationService.remove(+id)
  }
}
