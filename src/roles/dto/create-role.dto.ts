import { RoleEnum } from '@/common/enums/roles.enum'

export class CreateRoleDto {
  readonly value: RoleEnum
  readonly description?: string
}
