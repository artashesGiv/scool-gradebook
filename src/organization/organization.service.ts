import { Injectable } from '@nestjs/common'
import { CreateOrganizationDto } from './dto/create-organization.dto'
import { UpdateOrganizationDto } from './dto/update-organization.dto'
import { InjectModel } from '@nestjs/sequelize'
import { Organization } from '@/organization/entities/organization.entity'

@Injectable()
export class OrganizationService {
  constructor(
    @InjectModel(Organization) private organizationModel: typeof Organization,
  ) {}

  create(createOrganizationDto: CreateOrganizationDto) {
    return this.organizationModel.create(createOrganizationDto)
  }

  findAll() {
    return this.organizationModel.findAll()
  }

  findOne(id: string) {
    return this.organizationModel.findOne({
      where: { id },
    })
  }

  update(id: number, updateOrganizationDto: UpdateOrganizationDto) {
    return `This action updates a #${id} organization`
  }

  remove(id: number) {
    return `This action removes a #${id} organization`
  }
}
