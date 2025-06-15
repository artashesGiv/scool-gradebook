import { User } from '@/users/entities/user.entity'

declare global {
  type Maybe<T> = T | undefined | null

  namespace Express {
    interface Request {
      user?: User
    }
  }
}
