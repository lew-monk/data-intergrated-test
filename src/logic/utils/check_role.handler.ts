import { NextFunction, Request, Response } from "express"
import { UnauthorizedException } from "../exceptions/unauthorized"

export abstract class checkRoleAbstract {
  public constructor(protected readonly roles: string[]) {
    this.check = this.check.bind(this)
  }
  public abstract check(
    req: Request,
    res: Response,
    next: NextFunction
  ): void | Promise<void>
}

export class CheckRole extends checkRoleAbstract {
  public constructor(public readonly roles: string[]) {
    super(roles)
  }
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  public check(req: Request, res: Response, next: NextFunction) {
    if (!this.roles.includes(req.body.user.role)) {
      throw new UnauthorizedException(
        "You do not have enough permissions to complete this action"
      )
    } else {
      next()
    }
  }
}
