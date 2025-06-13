import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'

import { ROLES_KEY } from '@/common/decorators/roles.decorator'
import { RoleEnum, RoleType } from '@/common/enums/roles.enum'
import { User } from '@/users/entities/user.entity'

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    // Роли, требуемые для текущего обработчика/контроллера
    const requiredRoles =
      this.reflector.getAllAndOverride<RoleType[]>(ROLES_KEY, [
        context.getHandler(),
        context.getClass(),
      ]) ?? []

    // Если роли не заданы, доступ открыт
    if (requiredRoles.length === 0) {
      return true
    }

    const request = context.switchToHttp().getRequest()
    const user: User = request.user

    // ADMIN имеет доступ ко всем маршрутам
    const isAdmin = user.roles?.some(
      userRole => (userRole.value as RoleType) === RoleEnum.ADMIN,
    )
    if (isAdmin) {
      return true
    }

    // Проверяем пересечение ролей пользователя и требуемых ролей
    const hasRequiredRole = user.roles?.some(userRole =>
      requiredRoles.includes(userRole.value as RoleType),
    )

    if (!hasRequiredRole) {
      throw new ForbiddenException('Недостаточно прав')
    }

    return true
  }
}
