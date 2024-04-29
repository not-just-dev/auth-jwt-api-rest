import { type Request } from "express";

export interface UserCredentials {
  username: string;
  password: string;
}

export interface UserData extends UserCredentials {
  name: string;
}

export interface User extends UserData {
  id: string;
}

export type RequestWithCredentials = Request<
  Record<string, unknown>,
  Record<string, unknown>,
  UserCredentials
>;

export type RequestWithUserData = Request<
  Record<string, unknown>,
  Record<string, unknown>,
  UserData
>;
