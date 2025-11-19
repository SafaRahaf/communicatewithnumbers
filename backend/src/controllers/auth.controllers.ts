import { Request, Response } from "express";
import { User } from "../models/User";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || "changeme";
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "7d";

function createToken(userId: string) {
  // @ts-ignore
  return jwt.sign({ id: userId }, JWT_SECRET as jwt.Secret, {
    expiresIn: JWT_EXPIRES_IN,
  });
}

export const register = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  if (!username || !password)
    return res.status(400).json({ message: "Missing fields" });

  const existing = await User.findOne({ username });
  if (existing) return res.status(400).json({ message: "Username exists" });

  const user = new User({ username, password });
  await user.save();
  const token = createToken(user._id.toString());
  res.json({
    token,
    user: { id: user._id, username: user.username, role: user.role },
  });
};

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  if (!username || !password)
    return res.status(400).json({ message: "Missing fields" });

  const user = await User.findOne({ username });
  if (!user) return res.status(400).json({ message: "Invalid credentials" });

  const ok = await user.comparePassword(password);
  if (!ok) return res.status(400).json({ message: "Invalid credentials" });

  const token = createToken(user._id.toString());
  res.json({
    token,
    user: { id: user._id, username: user.username, role: user.role },
  });
};
