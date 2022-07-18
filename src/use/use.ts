export interface UserForm {
  username: string,
  desc: string,
  sex: 0 | 1,
  hobby: number[] | null,
  bothDate: Date | null,
  school: number | null,
}