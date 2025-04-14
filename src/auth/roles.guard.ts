import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { ROLES_KEY } from '@/common/decorators/roles.decorator'
import { User } from '@/users/entities/user.entity'
import { RoleType } from '@/common/enums/roles.enum'

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> {
    try {
      const requiredRoles = this.reflector.getAllAndOverride<RoleType[]>(
        ROLES_KEY,
        [context.getHandler(), context.getClass()],
      )

      if (!requiredRoles) {
        return true
      }

      const request = context.switchToHttp().getRequest()
      const user: User = request.user
      const isAllowed = user.roles.some(role =>
        requiredRoles.includes(role.value as RoleType),
      )
      const paramId = +request.params.id
      const isOwner = user?.id === paramId

      if (isAllowed || isOwner) {
        return true
      }

      throw new HttpException('Нет доступа', HttpStatus.FORBIDDEN)
    } catch (e) {
      console.error(e)
      throw new HttpException('Нет доступа', HttpStatus.FORBIDDEN)
    }
  }
}
