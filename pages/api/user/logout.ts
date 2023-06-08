import { NextApiRequest, NextApiResponse } from "next";
import { setCookie } from 'libs/service';

import { ServerErrorStatus } from "types/error";

export interface LoginResponse {
  id: string;
  nickname: string;
  isNewUser: string;
  access_token: string;
}

export type UserResponse = any;

const logTitle = "Account Logout ";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<UserResponse>
) {
  try {
    setCookie(res, 'Ultiverse_Demo_Authorization', '', { maxAge: 1000, path: '/', domain: process.env.USER_COOKIE_DOMAIN });

    res.status(200).json({
      success: true,
      data: null,
    });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({
      success: false,
      err: ServerErrorStatus.ServerError
    });
  }
}
