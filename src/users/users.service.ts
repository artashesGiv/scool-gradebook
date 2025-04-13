import { Injectable } from '@nestjs/common'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { User } from './entities/user.entity'
import { InjectModel } from '@nestjs/sequelize'
import { RolesService } from '@/roles/roles.service'
import { RoleEnum } from '@/common/enums/roles.enum'
import { Role } from '@/roles/entities/role.entity'

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private userModel: typeof User,
    private roleService: RolesService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const user = await this.userModel.create(createUserDto)
    const role = await this.roleService.getByValue(RoleEnum.USER)
    if (role) {
      await user.$set('roles', [role.id])
    }
    return user
  }

  async findAll() {
    return await this.userModel.findAll({
      include: {
        model: Role,
        through: { attributes: [] }, // чтобы не возвращать промежуточную таблицу user_roles
      },
    })
  }

  findOne(id: number) {
    return `This action returns a #${id} user`
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`
  }

  remove(id: number) {
    return `This action removes a #${id} user`
  }
}
