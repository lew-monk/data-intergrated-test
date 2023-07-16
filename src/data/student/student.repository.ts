import { injectable } from "inversify"
import { DBService } from "../db.service"
import { IStudent } from "./students.model"

@injectable()
export class StudentRepository {
  public constructor(private readonly _dbService: DBService) {}

  public async all(): Promise<IStudent[]> {
    return await this._dbService.student.find({})
  }

  public async findByEmail(email: string): Promise<IStudent | null> {
    return await this._dbService.student
      .findOne({ email: email })
      .then((student) => {
        return student
      })
      .catch(() => null)
  }
  public async findById(id: string): Promise<IStudent | null> {
    return await this._dbService.student
      .findById(id)
      .then((student) => {
        return student
      })
      .catch(() => null)
  }

  public async updateOneById(data: any): Promise<null> {
    return await this._dbService.student
      .updateOne({ _id: data.id }, data)
      .then(() => {
        return null
      })
      .catch(() => null)
  }

  public async create(studentData: any): Promise<IStudent | null> {
    return await this._dbService.student.create(studentData)
  }
}
