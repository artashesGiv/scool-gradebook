import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { Membership } from '@/memberships/entities/membership.entity'
import { Role } from '@/roles/entities/role.entity'
import { OrgRoleEnum, OrgRoleType } from '@/common/enums/roles.enum'
import { CreateMembershipDto } from '@/memberships/dto/create-membership.dto'
import { UsersService } from '@/users/users.service'
import { User } from '@/users/entities/user.entity'
import { Organization } from '@/organization/entities/organization.entity'

@Injectable()
export class MembershipsService {
  constructor(
    @InjectModel(Membership) private membershipModel: typeof Membership,
    @InjectModel(Role) private rolesModel: typeof Role,
    private usersService: UsersService,
  ) {}

  async addUserToOrg(
    orgId: Organization['id'],
    createMembershipDto: CreateMembershipDto,
  ) {
    const candidate = await this.membershipModel.findOne({
      where: { userId: createMembershipDto.userId, organizationId: orgId },
    })

    if (candidate) {
      throw new HttpException(
        'Пользователь уже привязан к организации',
        HttpStatus.BAD_REQUEST,
      )
    }

    const role = await this.rolesModel.findOne({
      where: { value: createMembershipDto.role },
    })
    if (!role) throw new NotFoundException('Role not found')

    const user = await this.usersService.findOne(createMembershipDto.userId)

    if (user.globalRole === 'admin') {
      throw new HttpException(
        'Администратор не может вступать в организации',
        HttpStatus.FORBIDDEN,
      )
    }

    return this.membershipModel.create({
      userId: createMembershipDto.userId,
      organizationId: orgId,
      roleId: role.id,
    })
  }

  getAllMembershipsUser(userId: User['id']) {
    return this.membershipModel.findAll({
      where: { userId },
      attributes: ['id'],
      include: [
        {
          model: Role,
          attributes: ['id', 'value'],
        },
        {
          model: Organization,
          attributes: ['id', 'name'],
        },
      ],
    })
  }

  async changeRole(
    userId: User['id'],
    orgId: Organization['id'],
    roleValue: OrgRoleType,
  ) {
    const role = await this.rolesModel.findOne({ where: { value: roleValue } })
    const membership = await this.membershipModel.findOne({
      where: { userId, organizationId: orgId },
    })
    if (!membership) throw new NotFoundException('Membership not found')
    await membership.update({ roleId: role!.id })
    return membership
  }

  async getRoleCode(
    userId: string,
    orgId: string,
  ): Promise<Maybe<OrgRoleType>> {
    const membership = await this.membershipModel.findOne({
      where: { userId, organizationId: orgId },
      include: [Role],
    })

    const plainMembership = membership?.get({ plain: true })

    return plainMembership?.role?.value as OrgRoleEnum
  }
}
