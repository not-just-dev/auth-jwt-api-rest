import jwt, { type JwtPayload } from "jsonwebtoken";
import bcrypt from "bcrypt";
import { type Response } from "express";
import { type AuthRepository } from "../repository/types";
import {
  type RequestWithCredentials,
  type RequestWithUserData,
} from "../types";

export class AuthController {
  constructor(private readonly authRepository: AuthRepository) {}

  public login = async (req: RequestWithCredentials, res: Response) => {
    const { username, password } = req.body;

    const foundUser = await this.authRepository.getUserByUsername(username);

    if (!foundUser) {
      res.status(401).json({ error: "Wrong credentials" });
      return;
    }

    if (!(await bcrypt.compare(password, foundUser.password))) {
      res.status(401).json({ error: "Wrong credentials" });
      return;
    }

    const tokenPayload: JwtPayload = {
      sub: foundUser.id,
      name: foundUser.name,
    };

    const accessToken = jwt.sign(
      tokenPayload,
      process.env.JWT_ACCESS_TOKEN_KEY,
      {
        expiresIn: "1h",
      }
    );

    const refreshToken = jwt.sign(
      tokenPayload,
      process.env.JWT_ACCESS_TOKEN_KEY,
      {
        expiresIn: "1w",
      }
    );

    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });
    res.status(200).json({ token: accessToken });
  };

  public register = async (req: RequestWithUserData, res: Response) => {
    const { name, username, password } = req.body;

    const foundUser = await this.authRepository.getUserByUsername(username);

    if (foundUser) {
      res.status(409).json({ message: "User already exists" });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await this.authRepository.createUser(
      name,
      username,
      hashedPassword
    );

    res.status(201).json({ user: newUser });
  };
}
