import { COOKIE_NAME, ONE_YEAR_MS } from "@shared/const";
import type { Express, Request, Response } from "express";
import * as db from "../db";
import { getSessionCookieOptions } from "./cookies";
import { sdk } from "./sdk";

function getQueryParam(req: Request, key: string): string | undefined {
  const value = req.query[key];
  return typeof value === "string" ? value : undefined;
}

export function registerOAuthRoutes(app: Express) {
  // Session creation endpoint for token-based auth
  app.post("/api/oauth/create-session", async (req: Request, res: Response) => {
    const { openId, name, email } = req.body;

    if (!openId) {
      res.status(400).json({ error: "openId is required" });
      return;
    }

    try {
      await db.upsertUser({
        openId,
        name: name || null,
        email: email ?? null,
        loginMethod: "direct",
        lastSignedIn: new Date(),
      });

      const sessionToken = await sdk.createSessionToken(openId, {
        name: name || "",
        expiresInMs: ONE_YEAR_MS,
      });

      const cookieOptions = getSessionCookieOptions(req);
      res.cookie(COOKIE_NAME, sessionToken, { ...cookieOptions, maxAge: ONE_YEAR_MS });

      res.json({ success: true, token: sessionToken });
    } catch (error) {
      console.error("[Auth] Session creation failed", error);
      res.status(500).json({ error: "Session creation failed" });
    }
  });
}
