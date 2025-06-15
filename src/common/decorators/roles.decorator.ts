import { SetMetadata } from '@nestjs/common'
import { OrgRoleType } from '@/common/enums/roles.enum'

export const ROLES_KEY = 'roles'
export const Roles = (...roles: OrgRoleType[]) => SetMetadata(ROLES_KEY, roles)
