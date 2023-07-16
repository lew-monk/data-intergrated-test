import "dotenv/config"
import express, { NextFunction, Request, Response } from "express"
import { InversifyExpressServer } from "inversify-express-utils"
import { DBService } from "../data/db.service"
import { container } from "../di-container"
import { UnauthorizedException } from "../logic/exceptions/unauthorized"
import { ValidationException } from "../logic/exceptions/validation-exception"
import { BaseHttpResponse } from "./lib/base-http-response"

export class App {
  public async setup(): Promise<void> {
    const _db = container.get(DBService)

    _db.connect()

    const server = new InversifyExpressServer(container, null, {
      rootPath: "/api",
    })

    server.setErrorConfig((expressApp: any) => {
      expressApp.use(
        (err: any, req: Request, res: Response, next: NextFunction) => {
          if (err instanceof ValidationException) {
            const response = BaseHttpResponse.failed(err.message, 400)
            return res.status(response.statusCode).json(response)
          }
          if (err instanceof Error) {
            const response = BaseHttpResponse.failed(err.message, 500)
            return res.status(response.statusCode).json(response)
          }
          if (err instanceof UnauthorizedException) {
            const response = BaseHttpResponse.failed(err.message, 401)
            return res.status(response.statusCode).json(response)
          }

          next()
        }
      )
    })
    server.setConfig((app) => {
      app.use(express.json())
    })

    const app = server.build()

    app.listen(process.env.PORT, () => {
      console.log("Listening on port ==> ", process.env.PORT)
    })
  }
}
