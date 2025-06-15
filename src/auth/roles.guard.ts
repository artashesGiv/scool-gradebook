import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { MembershipsService } from '@/memberships/memberships.service'
import { ResponseUserDto } from '@/users/dto/response-user.dto'
import { ROLES_KEY } from '@/common/decorators/roles.decorator'

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private memberships: MembershipsService,
  ) {}

  async canActivate(ctx: ExecutionContext): Promise<boolean> {
    const required =
      this.reflector.get<string[]>(ROLES_KEY, ctx.getHandler()) ?? []

    if (!required.length) {
      return true
    }

    const req = ctx.switchToHttp().getRequest()
    const user: ResponseUserDto = req.user

    if (required.includes(user.globalRole) || user.globalRole === 'admin') {
      return true
    }

    const { orgId } = req.params
    if (!orgId) return false
    const roleCode = await this.memberships.getRoleCode(user.id, orgId)
    return required.includes(roleCode)
  }
}
