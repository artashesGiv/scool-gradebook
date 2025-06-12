import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common'
import { AuthService } from './auth.service'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { CreateUserDto } from '@/users/dto/create-user.dto'
import { Public } from '@/common/decorators/public.decorator'
import { LoginUserDto } from '@/auth/dto/login-user.dto'
import { Request, Response } from 'express'

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Войти в систему' })
  @ApiResponse({
    status: 200,
    schema: {
      example: { token: 'token' },
    },
  })
  @Public()
  @Post('/login')
  async login(
    @Body() loginDto: LoginUserDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { user, token } = await this.authService.login(loginDto)

    res.cookie('access_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 1000 * 60 * 60 * 24,
    })

    return user
  }

  @ApiOperation({ summary: 'Зарегистрироваться' })
  @ApiResponse({
    status: 200,
    schema: {
      example: { token: 'token' },
    },
  })
  @Public()
  @Post('/registration')
  registration(@Body() createUserDto: CreateUserDto) {
    return this.authService.registration(createUserDto)
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
    const token = req.cookies?.access_token

    return {
      status: 'ok',
      isAuth: Boolean(token),
    }
  }
}
