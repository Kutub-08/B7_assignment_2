import { pool } from "../../db";
import bcrypt from "bcryptjs";
import type { IUser } from "./auth.interface";
import config from "../../config";
import jwt, { type JwtPayload } from "jsonwebtoken";
const createUserIntoDB=async (payload:IUser) => {

  const { name, email, password, role } = payload;
  const hashedPassword = await bcrypt.hash(password, 10);

  const result = await pool.query(
    `
        INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, COALESCE($4, 'contributor'))
        RETURNING *
    `,
    [name, email, hashedPassword, role],
  );

  delete result.rows[0].password;
  return result;
};

const loginUserIntoDB=async (email: string, password: string) => {

  const userData = await pool.query(
    `
        SELECT * FROM users WHERE email = $1
    `,
    [email],
  );


  if (userData.rows.length === 0) {
    throw new Error("User Not Found");
  }

  const user = userData.rows[0];

  const matchPassword = await bcrypt.compare(password, user.password);

  if (!matchPassword) {
    throw new Error("Invalid credentials!!");
  }

  const jwtPayload = {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  };

  const secret = (config as any).accessToken_key as string || "";
  const token = jwt.sign(jwtPayload, secret, {
    expiresIn: "1d",
  });
  delete user.password;

  return { token, user };
};


export const authService={
  createUserIntoDB,
  loginUserIntoDB
}