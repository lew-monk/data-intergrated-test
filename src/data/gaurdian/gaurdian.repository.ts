import { injectable } from "inversify"
import { DBService } from "../db.service"
import { IGaurdian } from "./gaurdian.model"

@injectable()
export class GaurdianRepository {
  public constructor(private readonly _dbService: DBService) {}

  public async all(): Promise<IGaurdian[]> {
    return await this._dbService.gaurdian.find({})
  }

  public async findByEmail(email: string): Promise<IGaurdian | null> {
    return await this._dbService.gaurdian
      .findOne({ email: email })
      .then((gaurdian) => {
        return gaurdian
      })
      .catch(() => null)
  }
  public async findById(id: string): Promise<IGaurdian | null> {
    return await this._dbService.gaurdian
      .findById(id)
      .then((gaurdian) => {
        return gaurdian
      })
      .catch(() => null)
  }

  public async create(gaurdianData: any): Promise<IGaurdian> {
    return await this._dbService.gaurdian.create(gaurdianData)
  }
}
