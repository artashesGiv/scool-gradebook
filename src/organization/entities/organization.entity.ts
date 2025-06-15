import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript'
import { ApiProperty } from '@nestjs/swagger'
import { Membership } from '@/memberships/entities/membership.entity'

interface OrganizationCreationAttrs {
  name: string
  email?: string
  description?: string
}

@Table({ tableName: 'organizations' })
export class Organization extends Model<
  Organization,
  OrganizationCreationAttrs
> {
  @ApiProperty({ example: 'uuid' })
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  declare id: string

  @ApiProperty({ example: 'middle name' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string

  @ApiProperty({ example: 'Волгоград' })
  @Column({
    type: DataType.STRING,
  })
  city?: string

  @ApiProperty({ example: 'email@gmail.com' })
  @Column({
    type: DataType.STRING,
  })
  email?: string

  @ApiProperty({ example: '+79996277016' })
  @Column({
    type: DataType.STRING,
    unique: true,
  })
  phone?: string

  @ApiProperty({ example: null })
  @Column({
    type: DataType.STRING,
  })
  description?: string

  @HasMany(() => Membership) memberships: Membership[]
}
