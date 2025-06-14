import { Injectable } from '@nestjs/common'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { User } from './entities/user.entity'
import { InjectModel } from '@nestjs/sequelize'
import { Role } from '@/roles/entities/role.entity'

@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private userModel: typeof User) {}

  create(createUserDto: Omit<CreateUserDto, 'repeatPassword'>) {
    return this.userModel.create(createUserDto)
  }

  async findAll() {
    return await this.userModel.findAll({
      include: {
        model: Role,
        through: { attributes: [] },
      },
    })
  }

  async findOne(id: number) {
    return await this.userModel.findOne({
      attributes: {
        exclude: ['password'],
      },
      where: {
        id,
      },
      include: {
        model: Role,
        through: { attributes: [] },
      },
    })
  }

  async findByEmail(email: string) {
    return await this.userModel.findOne({
      where: { email },
      include: {
        model: Role,
        through: { attributes: [] },
      },
    })
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`
  }

  remove(id: number) {
    return `This action removes a #${id} user`
  }
}
