/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { injectable } from "inversify"
import mongoose from "mongoose"
import { gaurdianModel } from "./gaurdian/gaurdian.model"
import { studentModel } from "./student/students.model"

@injectable()
export class DBService {
  private _db: typeof mongoose

  public async connect(): Promise<void> {
    this._db = await mongoose.connect(process.env.DB_URI!)
    console.log("Connected to MongoDB")
  }

  public get student() {
    return this._db.model("Student", studentModel)
  }
  public get gaurdian() {
    return this._db.model("Gaurdian", gaurdianModel)
  }
}
