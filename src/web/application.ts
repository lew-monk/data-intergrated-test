import "dotenv/config"
import express from "express"
import { InversifyExpressServer } from "inversify-express-utils"
import { DBService } from "../data/db.service"
import { container } from "../di-container"

export class App {
  public async setup(): Promise<void> {
    const _db = container.get(DBService)

    _db.connect()

    const server = new InversifyExpressServer(container, null, {
      rootPath: "/api",
    })

    server.setConfig((app) => {
      app.use(express.json())
    })

    const app = server.build()

    app.listen(3000, () => {
      console.log("Listening on port 3000")
    })
  }
}
