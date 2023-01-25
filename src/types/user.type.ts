export default interface User {
  kind: string
  localId: string
  email: string,
  displayName: string
  idToken: string
  registered: boolean
  refreshToken: string
  expiresIn: string
}

export type UserContextType = {
  user?: User;
  saveUser: (user: User) => void;
}