import { type User } from "../types";

export interface AuthRepository {
  getUserByUsername: (username: string) => Promise<User | null>;
  createUser: (
    name: string,
    username: string,
    password: string
  ) => Promise<User>;
}
