import { Injectable, NotFoundException } from '@nestjs/common'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { User } from './entities/user.entity'
import { InjectModel } from '@nestjs/sequelize'
import { Membership } from '@/memberships/entities/membership.entity'
import { ResponseUserDto } from '@/users/dto/response-user.dto'
import { GlobalRole } from '@/common/enums/roles.enum'

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
          attributes: ['organizationId', 'roleId'],
          required: false,
        },
      ],
    })

    return users.map(user => this.getUserToResponse(user))
  }

  async findOne(id: string): Promise<ResponseUserDto> {
    const user = await this.userModel.findOne({
      attributes: {
        exclude: ['password'],
      },
      include: [
        {
          model: Membership,
          attributes: ['organizationId', 'roleId'],
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

  findByEmail(email: string) {
    return this.userModel.findOne({
      where: { email },
      include: [
        {
          model: Membership,
          attributes: ['organizationId', 'roleId'],
          required: false,
        },
      ],
    })
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`
  }

  remove(id: string) {
    return `This action removes a #${id} user`
  }

  getUserToResponse(user: User): ResponseUserDto {
    const plainUser = user.get({ plain: true })

    let role: GlobalRole = 'guest'

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
      memberships: plainUser.memberships,
      globalRole: role,
    }
  }
}
