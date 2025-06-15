import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { Membership } from '@/memberships/entities/membership.entity'
import { Role } from '@/roles/entities/role.entity'
import { OrgRoleEnum, OrgRoleType } from '@/common/enums/roles.enum'

@Injectable()
export class MembershipsService {
  constructor(
    @InjectModel(Membership) private membershipModel: typeof Membership,
    @InjectModel(Role) private rolesModel: typeof Role,
  ) {}

  async addUserToOrg(
    userId: string,
    orgId: string,
    roleValue: OrgRoleType = 'student',
  ) {
    const role = await this.rolesModel.findOne({ where: { value: roleValue } })
    if (!role) throw new NotFoundException('Role not found')

    return this.membershipModel.create({
      userId,
      organizationId: orgId,
      roleId: role.id,
    })
  }

  async changeRole(userId: string, orgId: string, roleValue: OrgRoleType) {
    const role = await this.rolesModel.findOne({ where: { value: roleValue } })
    const membership = await this.membershipModel.findOne({
      where: { userId, organizationId: orgId },
    })
    if (!membership) throw new NotFoundException('Membership not found')
    await membership.update({ roleId: role!.id })
    return membership
  }

  async getRoleCode(userId: string, orgId: string): Promise<OrgRoleType> {
    const membership = await this.membershipModel.findOne({
      where: { userId, organizationId: orgId },
      include: [Role],
    })

    return (membership?.role?.value ?? OrgRoleEnum.STUDENT) as OrgRoleEnum
  }
}
