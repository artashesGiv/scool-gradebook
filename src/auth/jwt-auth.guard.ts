import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Reflector } from '@nestjs/core'
import { PUBLIC_KEY } from '@/common/decorators/public.decorator'

@Injectable()
export class JwtAuthGuard implements CanActivate {
  private readonly tokenCookieName = 'access_token'

  constructor(
    private readonly jwtService: JwtService,
    private readonly reflector: Reflector,
  ) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ])

    if (isPublic) {
      return true
    }

    const request = context.switchToHttp().getRequest()

    try {
      const token: string | undefined =
        request.cookies?.[this.tokenCookieName] ||
        request.signedCookies?.[this.tokenCookieName]

      if (!token) {
        throw new UnauthorizedException({
          message: 'Пользователь не авторизован',
        })
      }

      request.user = this.jwtService.verify(token)

      return true
    } catch (_error) {
      throw new UnauthorizedException({
        message: 'Пользователь не авторизован',
      })
    }
  }
}
