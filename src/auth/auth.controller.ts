import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
} from '@nestjs/common'
import { AuthService } from './auth.service'
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { CreateUserDto } from '@/users/dto/create-user.dto'
import { Public } from '@/common/decorators/public.decorator'
import { LoginUserDto } from '@/auth/dto/login-user.dto'
import { Request, Response } from 'express'
import { JwtService } from '@nestjs/jwt'
import { User } from '@/users/entities/user.entity'
import { ResponseUserDto } from '@/users/dto/response-user.dto'

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  private readonly tokenCookieName = 'access_token'

  constructor(
    private readonly authService: AuthService,
    private readonly jwtService: JwtService,
  ) {}
  @ApiBody({ type: LoginUserDto })
  @ApiOperation({ summary: 'Войти в систему' })
  @ApiResponse({
    status: 200,
    schema: {
      example: { user: ResponseUserDto, token: 'token' },
    },
  })
  @Public()
  @Post('/login')
  @HttpCode(HttpStatus.OK)
  async login(
    @Body() loginDto: LoginUserDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { user, token } = await this.authService.login(loginDto)

    res.cookie(this.tokenCookieName, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 1000 * 60 * 60 * 24,
    })

    return user
  }

  @ApiOperation({ summary: 'Зарегистрироваться' })
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({
    status: 201,
  })
  @Public()
  @Post('/registration')
  @HttpCode(HttpStatus.CREATED)
  async registration(@Body() createUserDto: CreateUserDto) {
    await this.authService.registration(createUserDto)
  }

  @ApiOperation({ summary: 'Выйти из системы' })
  @ApiResponse({
    status: 200,
  })
  @Public()
  @Get('/logout')
  @HttpCode(HttpStatus.OK)
  logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie(this.tokenCookieName, {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      path: '/',
    })

    return { message: 'Вы успешно вышли из системы' }
  }

  @ApiOperation({ summary: 'Проверка связи с сервером' })
  @ApiResponse({
    status: 200,
    schema: {
      example: { status: 'ok' },
    },
  })
  @Public()
  @Get('/ping')
  ping(@Req() req: Request) {
    const token = req.cookies?.['access_token']
    let user: User | null = null

    if (token) {
      user = this.jwtService.verify<User>(token)
    }

    return {
      status: 'ok',
      user,
    }
  }
}
