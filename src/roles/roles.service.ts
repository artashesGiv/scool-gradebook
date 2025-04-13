import { Injectable } from '@nestjs/common'
import { CreateRoleDto } from './dto/create-role.dto'
import { RoleEnum } from '@/common/enums/roles.enum'
import { InjectModel } from '@nestjs/sequelize'
import { Role } from './entities/role.entity'

@Injectable()
export class RolesService {
  constructor(@InjectModel(Role) private roleModel: typeof Role) {}

  async create(createRoleDto: CreateRoleDto) {
    return await this.roleModel.create(createRoleDto)
  }

  async getByValue(value: RoleEnum) {
    return await this.roleModel.findOne({ where: { value: value as string } })
  }
}
