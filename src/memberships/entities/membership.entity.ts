import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript'
import { User } from '@/users/entities/user.entity'
import { Organization } from '@/organization/entities/organization.entity'
import { Role } from '@/roles/entities/role.entity'
import { ApiProperty } from '@nestjs/swagger'
import { Optional } from 'sequelize'

export interface MembershipAttributes {
  id: number
  userId: string
  organizationId: string
  roleId: number
}

export interface MembershipCreationAttributes
  extends Optional<MembershipAttributes, 'id'> {}

@Table({
  tableName: 'memberships',
  indexes: [{ unique: true, fields: ['userId', 'organizationId'] }], // нельзя дублироваться
})
export class Membership
  extends Model<Membership, MembershipCreationAttributes>
  implements MembershipAttributes
{
  @ApiProperty({ example: 1 })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    primaryKey: true,
    autoIncrement: true,
  })
  declare id: number

  @ForeignKey(() => User) @Column(DataType.UUID) userId: string
  @ForeignKey(() => Organization) @Column(DataType.UUID) organizationId: string
  @ForeignKey(() => Role) @Column(DataType.INTEGER) roleId!: number

  @BelongsTo(() => User) user: User
  @BelongsTo(() => Organization) organization: Organization
  @BelongsTo(() => Role) role: Role
}
