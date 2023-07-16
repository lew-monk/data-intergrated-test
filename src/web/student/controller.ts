import { Request, Response } from "express"
import {
  controller,
  httpGet,
  httpPatch,
  httpPost,
} from "inversify-express-utils"
import { SignUpDTO } from "../../logic/dtos/student"
import { GetStudentIDDTO } from "../../logic/dtos/student/get-user.dto"
import { LoginDTO } from "../../logic/dtos/student/login.dto"
import { UpdateStudentDTO } from "../../logic/dtos/student/update-student.tdo"
import { StudentService } from "../../logic/student/student.service"
import { BaseHttpResponse } from "../lib/base-http-response"
import { ValidateRequest } from "../middleware/base-middleware"

@controller("/students")
export class StudentsController {
  private constructor(private readonly studentsService: StudentService) {}

  @httpGet("/")
  private async index(req: Request, res: Response): Promise<void> {
    const students = await this.studentsService.all()
    res.json(students)
  }

  @httpGet("/:id", ValidateRequest.withParams(GetStudentIDDTO))
  private async getStudentWithId(req: Request, res: Response): Promise<void> {
    const student = await this.studentsService.findById(req.body.id)
    res.status(200).json(BaseHttpResponse.success({ student }, 200))
  }

  @httpPatch("/:id", ValidateRequest.withParams(UpdateStudentDTO))
  private async updateStudent(req: Request, res: Response): Promise<void> {
    const student = await this.studentsService.updateOneById(req.body)
    res.status(200).json(BaseHttpResponse.success({ student }, 200))
  }

  @httpPost("/signup", ValidateRequest.with(SignUpDTO))
  private async signup(req: Request, res: Response): Promise<void> {
    const students = await this.studentsService.create(req.body)
    res.json(students)
  }
  @httpPost("/login", ValidateRequest.with(LoginDTO))
  private async login(req: Request, res: Response): Promise<void> {
    const token = await this.studentsService.login(req.body)
    if (!token) {
      res.status(400).json(BaseHttpResponse.failed("Invalid credentials", 403))
    }

    res.json(BaseHttpResponse.success({ token }, 200))
  }
}
