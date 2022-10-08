import { sign } from "jsonwebtoken";
import { UserSchema } from "../models/user.model";
import config from "../config/config";

const signJWT = (
  user: UserSchema,
  callback: (error: Error | null, token?: string) => void
) => {
  sign(
    user.get(),
    config.token.secret,
    {
      issuer: config.token.issuer,
      expiresIn: config.token.expiresIn,
      algorithm: "HS256",
    },
    (error, token) => {
      callback(error, token);
    }
  );
};

export default signJWT;
