import { doubleCsrf } from "csrf-csrf";
import type { Request } from "express";
import config from "../config";

const csrfSecret = config.csrf_secret;

export const { generateCsrfToken, doubleCsrfProtection } = doubleCsrf({
  getSecret: () => csrfSecret,
  getSessionIdentifier: (req: Request) => req.headers["x-forwarded-for"] as string || req.ip || "unknown",
  cookieName: "csrf-token",
  cookieOptions: {
    httpOnly: false,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  },
  size: 64,
  getCsrfTokenFromRequest: (req: Request) => req.headers["x-csrf-token"] as string,
});
