import {IUser} from "@/models/IUser.ts";

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: IUser;
}