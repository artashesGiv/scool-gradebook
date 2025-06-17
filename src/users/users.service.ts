import { Injectable, NotFoundException } from '@nestjs/common'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { User } from './entities/user.entity'
import { InjectModel } from '@nestjs/sequelize'
import { ResponseUserDto } from '@/users/dto/response-user.dto'
import { GlobalRoleType } from '@/common/enums/roles.enum'
import { Membership } from '@/memberships/entities/membership.entity'
import { Role } from '@/roles/entities/role.entity'

@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private userModel: typeof User) {}

  create(createUserDto: Omit<CreateUserDto, 'repeatPassword'>) {
    return this.userModel.create(createUserDto)
  }

  async findAll() {
    const users = await this.userModel.findAll({
      attributes: {
        exclude: ['password'],
      },
      include: [
        {
          model: Membership,
          attributes: ['organizationId'],
          required: false,
        },
      ],
    })

    return users.map(user => this.getUserToResponse(user))
  }

  async findOne(id: User['id']): Promise<ResponseUserDto> {
    const user = await this.userModel.findOne({
      attributes: {
        exclude: ['password'],
      },
      include: [
        {
          model: Membership,
          attributes: ['organizationId'],
          required: false,
        },
      ],
      where: {
        id,
      },
    })

    if (!user) throw new NotFoundException(`Пользователь не найден`)

    return this.getUserToResponse(user)
  }

  findByEmail(email: User['id']) {
    return this.userModel.findOne({
      where: { email },
      include: [
        {
          model: Membership,
          attributes: ['organizationId'],
          required: false,
          include: [Role],
        },
      ],
    })
  }

  async update(id: User['id'], updateUserDto: UpdateUserDto) {
    const user = await this.userModel.findByPk(id)
    if (!user) {
      throw new NotFoundException('Пользователь не найден')
    }

    const updatedUser = await user.update(updateUserDto)
    return this.getUserToResponse(updatedUser)
  }

  async remove(id: User['id']) {
    const user = await this.userModel.findByPk(id)
    if (!user) {
      throw new NotFoundException('Пользователь не найден')
    }

    await user.destroy()
  }

  getUserToResponse(user: User): ResponseUserDto {
    const plainUser = user.get({ plain: true })

    let role: GlobalRoleType = 'guest'

    if (plainUser.memberships?.length) {
      role = 'user'
    }

    if (plainUser.isSystemAdmin) {
      role = 'admin'
    }

    return {
      id: plainUser.id,
      middleName: plainUser.middleName,
      email: plainUser.email,
      lastName: plainUser.lastName,
      name: plainUser.name,
      phone: plainUser.phone,
      globalRole: role,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    }
  }
}
