import { ApiError } from "../utils/ApiError";
import jwt from "jsonwebtoken"
import { asyncHandler } from "../utils/Asynchandle";
import User, { IUser } from "../models/user.model";
import { Request, Response, NextFunction } from "express";

declare global {
  namespace Express {
    interface Request {
      user?: IUser;
    }
  }
}

export const VerifyJWT = asyncHandler(async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      throw new ApiError(401, "Unauthorize request");
    }

    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!) as jwt.JwtPayload;

    const Userd = await User
      .findById(decodedToken._id)
      .select("-password -refreshtoken");

    if (!Userd) {
      throw new ApiError(401, "Invalid Access Token");
    }

    req.user = Userd;
    next();
  } catch (error: any) {
    throw new ApiError(401, error?.message || "Invalid access token");
  }
});