import { Column, DataType, Model, Table } from 'sequelize-typescript'

interface UsersCreationAttrs {
  email: string
  password: string
  name: string
  middleName: string
}

@Table({ tableName: 'users' })
export class User extends Model<User, UsersCreationAttrs> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    primaryKey: true,
    autoIncrement: true,
  })
  declare id: number

  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  email: string

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  middleName: string

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  lastName: string
}
