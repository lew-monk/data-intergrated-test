import { Container } from "inversify"
import { DBService } from "./data/db.service"
import { StudentRepository } from "./data/student/student.repository"
import { StudentService } from "./logic/student/student.service"

export const container = new Container({
  defaultScope: "Singleton",
})

container.bind(DBService).toSelf()
container.bind(StudentService).toSelf()
container.bind(StudentRepository).toSelf()
