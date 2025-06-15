import { Injectable } from '@nestjs/common'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { User } from './entities/user.entity'
import { InjectModel } from '@nestjs/sequelize'
import { Membership } from '@/memberships/entities/membership.entity'

@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private userModel: typeof User) {}

  create(createUserDto: Omit<CreateUserDto, 'repeatPassword'>) {
    return this.userModel.create(createUserDto)
  }

  findAll() {
    return this.userModel.findAll({
      attributes: {
        exclude: ['password'],
      },
      include: [
        {
          model: Membership,
          // attributes: ['id'],
          required: false,
        },
      ],
    })
  }

  findOne(id: string) {
    return this.userModel.findOne({
      attributes: {
        exclude: ['password'],
      },
      include: [
        {
          model: Membership,
          // attributes: ['id'],
          required: false,
        },
      ],
      where: {
        id,
      },
    })
  }

  findByEmail(email: string) {
    return this.userModel.findOne({
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
