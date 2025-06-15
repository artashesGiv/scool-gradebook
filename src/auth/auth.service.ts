import { HttpException, HttpStatus, Injectable, UnauthorizedException, } from '@nestjs/common'
import { UsersService } from '@/users/users.service'
import { JwtService } from '@nestjs/jwt'
import { CreateUserDto } from '@/users/dto/create-user.dto'
import * as bcrypt from 'bcryptjs'
import { LoginUserDto } from '@/auth/dto/login-user.dto'
import { ResponseUserDto } from '@/users/dto/response-user.dto'

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(loginDto: LoginUserDto) {
    const user = await this.validateUser(loginDto)
    const token = this.generateToken(user)

    return { user, token }
  }

  async registration(createUserDto: CreateUserDto) {
    const candidate = await this.usersService.findByEmail(createUserDto.email)
    if (candidate) {
      throw new HttpException(
        'Пользователь уже существует',
        HttpStatus.BAD_REQUEST,
      )
    }

    const hashPassword = await bcrypt.hash(createUserDto.password, 5)

    const { repeatPassword: _, ...data } = createUserDto

    const createUser = await this.usersService.create({
      ...data,
      password: hashPassword,
    })

    const user = await this.usersService.findOne(createUser.id)

    return this.generateToken(user)
  }

  private generateToken(user: ResponseUserDto) {
    return this.jwtService.sign(user)
  }

  private async validateUser(userDto: LoginUserDto) {
    const user = await this.usersService.findByEmail(userDto.email)

    if (!user) {
      throw new UnauthorizedException({
        message: 'Пользователь с таким email не найден',
      })
    }

    const plainUser = user.get({ plain: true })

    const passwordEquals = await bcrypt.compare(
      userDto.password,
      plainUser.password,
    )

    if (!passwordEquals) {
      throw new UnauthorizedException({
        message: 'Неверный пароль',
      })
    }

    return this.usersService.getUserToResponse(user)
  }
}
