export enum OrgRoleEnum {
  HEAD_TEACHER = 'head-teacher',
  TEACHER = 'teacher',
  STUDENT = 'student',
}

export enum GlobalRoleEnum {
  ADMIN = 'admin',
  USER = 'user',
  GUEST = 'guest',
}

export type OrgRoleType = `${OrgRoleEnum}`
export type GlobalRole = `${GlobalRoleEnum}`
