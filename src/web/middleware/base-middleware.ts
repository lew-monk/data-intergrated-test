import { NextFunction, Request, Response } from "express"
import { BaseMiddleware } from "../lib/base-validation-middleware"

export class ValidateRequest extends BaseMiddleware {
  private constructor(
    private readonly _DtoClass: any,
    private _params: boolean = false
  ) {
    super()
  }

  public execute(req: Request, res: Response, next: NextFunction): any {
    if (this._params) {
      req.body = {
        ...req.body,
        ...req.params,
      }
    }
    req.body = this._DtoClass.from(req.body)
    next()
  }

  public static with(dto: any): any {
    return new ValidateRequest(dto, false).execute
  }

  public static withParams(dto: any): any {
    return new ValidateRequest(dto, true).execute
  }
}
