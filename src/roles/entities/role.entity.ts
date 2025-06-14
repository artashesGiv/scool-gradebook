import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript'
import { ApiProperty } from '@nestjs/swagger'
import { RoleEnum } from '@/common/enums/roles.enum'
import { Membership } from '@/memberships/entities/membership.entity'

interface RoleCreationAttrs {
  value: RoleEnum
  description?: string
}

@Table({ tableName: 'roles', createdAt: false, updatedAt: false })
export class Role extends Model<Role, RoleCreationAttrs> {
  @ApiProperty({ example: 1 })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    primaryKey: true,
    autoIncrement: true,
  })
  declare id: number

  @ApiProperty({ example: 'guest' })
  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  value: string

  @ApiProperty({ example: 'full permissions' })
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  description: string

  @HasMany(() => Membership) memberships: Membership[]
}
