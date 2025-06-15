import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from '@nestjs/common'
import { OrganizationService } from './organization.service'
import { CreateOrganizationDto } from './dto/create-organization.dto'
import { UpdateOrganizationDto } from './dto/update-organization.dto'
import { MembershipsService } from '@/memberships/memberships.service'
import { CreateMembershipDto } from '@/memberships/dto/create-membership.dto'

@Controller('organization')
export class OrganizationController {
  constructor(
    private readonly organizationService: OrganizationService,
    private readonly membershipService: MembershipsService,
  ) {}

  @Post()
  create(@Body() createOrganizationDto: CreateOrganizationDto) {
    return this.organizationService.create(createOrganizationDto)
  }

  @Get()
  findAll() {
    return this.organizationService.findAll()
  }

  @Get(':id')
  findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.organizationService.findOne(id)
  }

  @Post(':id/add-user')
  addUser(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() createMembershipDto: CreateMembershipDto,
  ) {
    return this.membershipService.addUserToOrg(id, createMembershipDto)
  }

  @Patch(':id')
  update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateOrganizationDto: UpdateOrganizationDto,
  ) {
    return this.organizationService.update(+id, updateOrganizationDto)
  }

  @Delete(':id')
  remove(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.organizationService.remove(+id)
  }
}
