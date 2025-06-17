import { Injectable, NotFoundException, UseGuards } from '@nestjs/common'
import { CreateOrganizationDto } from './dto/create-organization.dto'
import { UpdateOrganizationDto } from './dto/update-organization.dto'
import { InjectModel } from '@nestjs/sequelize'
import { Organization } from '@/organization/entities/organization.entity'
import { ResponseUserDto } from '@/users/dto/response-user.dto'
import { MembershipsService } from '@/memberships/memberships.service'
import { GlobalRoleEnum, OrgRoleEnum } from '@/common/enums/roles.enum'
import { RolesGuard } from '@/auth/roles.guard'
import { Roles } from '@/common/decorators/roles.decorator'

@Injectable()
export class OrganizationService {
  constructor(
    @InjectModel(Organization) private organizationModel: typeof Organization,
    private readonly membershipService: MembershipsService,
  ) {}

  @UseGuards(RolesGuard)
  @Roles('admin')
  async create(
    createOrganizationDto: CreateOrganizationDto,
    user: ResponseUserDto,
  ) {
    const organization = await this.organizationModel.create(
      createOrganizationDto,
    )

    if (user.globalRole !== GlobalRoleEnum.ADMIN) {
      await this.membershipService.addUserToOrg(organization.id, {
        userId: user.id,
        role: OrgRoleEnum.HEAD_TEACHER,
      })
    }

    return organization
  }

  findAll() {
    return this.organizationModel.findAll()
  }

  async findOne(id: string) {
    const organization = await this.organizationModel.findOne({
      where: { id },
    })

    if (!organization) throw new NotFoundException(`Организация не найдена`)

    return organization
  }

  async update(id: number, updateOrganizationDto: UpdateOrganizationDto) {
    const organization = await this.organizationModel.findByPk(id)
    if (!organization) {
      throw new NotFoundException('Организация не найдена')
    }

    return await organization.update(updateOrganizationDto)
  }

  async remove(id: number) {
    const organization = await this.organizationModel.findByPk(id)
    if (!organization) {
      throw new NotFoundException('Организация не найдена')
    }

    await organization.destroy()
  }
}
