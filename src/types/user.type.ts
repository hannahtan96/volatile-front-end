export default interface User {
  user_id?: any | null;
  firstName: string,
  lastName: string,
  username: string,
  email: string,
  password: string,
  roles?: Array<string>;
}

export default interface loggedInUser {
  user_id?: any | null;
  firstName: string,
  lastName: string,
  username: string,
  email: string,
  password: string,
  roles?: Array<string>;
}