import { Injectable } from '@nestjs/common'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { User } from './entities/user.entity'
import { InjectModel } from '@nestjs/sequelize'

@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private userModel: typeof User) {}

  create(createUserDto: Omit<CreateUserDto, 'repeatPassword'>) {
    return this.userModel.create(createUserDto)
  }

  async findAll() {
    return await this.userModel.findAll()
  }

  async findOne(id: string) {
    return await this.userModel.findOne({
      attributes: {
        exclude: ['password'],
      },
      where: {
        id,
      },
    })
  }

  async findByEmail(email: string) {
    return await this.userModel.findOne({
      where: { email },
    })
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`
  }

  remove(id: string) {
    return `This action removes a #${id} user`
  }
}
