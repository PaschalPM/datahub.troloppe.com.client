import { UserRoles } from "../enums/user-roles";

export interface User {
  id: number;
  name: string;
  email: string;
  roles: `${UserRoles}`[];
}
