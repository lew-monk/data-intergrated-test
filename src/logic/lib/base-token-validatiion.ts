import { NextFunction, Request, Response } from "express"

export abstract class TokenVerify {
  public _secretKey = process.env.TOKEN_KEY || "secret"
  protected constructor() {
    this.verfifyToken = this.verfifyToken.bind(this)
  }

  public abstract verfifyToken(
    req: Request,
    res: Response,
    next: NextFunction
  ): void | Promise<void>
}
