import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { MembershipsService } from '@/memberships/memberships.service'

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private memberships: MembershipsService,
  ) {}

  async canActivate(ctx: ExecutionContext): Promise<boolean> {
    const required =
      this.reflector.get<string[]>('roles', ctx.getHandler()) ?? []
    if (!required.length) return true

    const req = ctx.switchToHttp().getRequest()
    const user = req.user

    if (user.isSystemAdmin) return true

    const { orgId } = req.params
    if (!orgId) return false
    const roleCode = await this.memberships.getRoleCode(user.id, orgId)
    return required.includes(roleCode)
  }
}
