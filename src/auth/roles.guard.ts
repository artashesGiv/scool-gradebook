import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { MembershipsService } from '@/memberships/memberships.service'
import { ResponseUserDto } from '@/users/dto/response-user.dto'
import { ROLES_KEY } from '@/common/decorators/roles.decorator'
import { Request } from 'express'

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

    const req: Request = ctx.switchToHttp().getRequest()
    const user: ResponseUserDto = req.user

    const { orgId, userId } = req.params

    if (userId && user.id === userId) {
      return true
    }

    if (required.includes(user.globalRole) || user.globalRole === 'admin') {
      return true
    }

    if (!orgId) return false

    const roleCode = await this.memberships.getRoleCode(user.id, orgId)

    if (!roleCode) return false

    return required.includes(roleCode)
  }
}
