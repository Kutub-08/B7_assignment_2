import jwt from "jsonwebtoken";

interface JwtPayload {
  id: number;
  name: string;
  role: "contributor" | "maintainer";
}

export const generateToken = (payload: JwtPayload) => {
  return jwt.sign(
    payload,
    process.env.JWT_SECRET as string,
    {
      expiresIn: "7d",
    }
  );
};