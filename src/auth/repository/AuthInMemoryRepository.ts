import { v4 as uuidv4 } from "uuid";
import { users } from "../data.js";
import { type User } from "../types";
import { type AuthRepository } from "./types";

export class AuthInMemoryRepository implements AuthRepository {
  async getUserByUsername(username: string): Promise<User | null> {
    const existingUser = users.find((user) => user.username === username);

    return existingUser ?? null;
  }

  async createUser(
    name: string,
    username: string,
    password: string
  ): Promise<User> {
    const newUser: User = {
      id: uuidv4(),
      name,
      username,
      password,
    };

    users.push(newUser);

    return newUser;
  }
}
