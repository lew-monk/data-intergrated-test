import "dotenv/config"
import "reflect-metadata"

import { App } from "./web/application"
import "./web/student/controller"

export async function bootstrap(): Promise<void> {
  new App().setup()
}

bootstrap()
