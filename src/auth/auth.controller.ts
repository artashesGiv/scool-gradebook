import { Body, Controller, Post } from '@nestjs/common'
import { AuthService } from './auth.service'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { CreateUserDto } from '@/users/dto/create-user.dto'
import { Public } from '@/common/decorators/public.decorator'
import { LoginUserDto } from '@/auth/dto/login-user.dto'

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
  login(@Body() loginDto: LoginUserDto) {
    return this.authService.login(loginDto)
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
}
