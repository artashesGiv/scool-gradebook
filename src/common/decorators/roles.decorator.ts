import { SetMetadata } from '@nestjs/common'
import { GlobalRoleType, OrgRoleType } from '@/common/enums/roles.enum'

export const ROLES_KEY = 'roles'
export const Roles = (...roles: OrgRoleType[] | GlobalRoleType[]) =>
  SetMetadata(ROLES_KEY, roles)
