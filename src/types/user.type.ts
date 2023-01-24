export default interface User {
  user_id?: any | null;
  firstName: string,
  lastName: string,
  username: string,
  email: string,
  password: string,
  roles?: Array<string>;
}