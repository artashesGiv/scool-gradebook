import { Injectable, OnModuleInit } from '@nestjs/common'
import { RoleEnum } from '@/common/enums/roles.enum'
import { InjectModel } from '@nestjs/sequelize'
import { Role } from './entities/role.entity'

@Injectable()
export class RolesService implements OnModuleInit {
  constructor(@InjectModel(Role) private roleModel: typeof Role) {}

  async onModuleInit() {
    await this.seedRoles()
  }

  private async seedRoles() {
    const roles = Object.values(RoleEnum)

    for (const value of roles) {
      await this.roleModel.findOrCreate({
        where: { value },
        defaults: { value, description: `${value} role` },
      })
    }
  }

  async getByValue(value: RoleEnum) {
    return await this.roleModel.findOne({ where: { value: value as string } })
  }
}
