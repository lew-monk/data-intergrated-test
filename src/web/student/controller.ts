import { Request, Response } from "express"
import {
  controller,
  httpDelete,
  httpGet,
  httpPatch,
  httpPost,
} from "inversify-express-utils"
import { SignUpDTO } from "../../logic/dtos/student"
import { GetStudentIDDTO } from "../../logic/dtos/student/get-user.dto"
import { LoginDTO } from "../../logic/dtos/student/login.dto"
import { StudentDataResponse } from "../../logic/dtos/student/student-data-response"
import { UpdateStudentDTO } from "../../logic/dtos/student/update-student.tdo"
import { StudentService } from "../../logic/student/student.service"
import { CheckRole } from "../../logic/utils/check_role.handler"
import { JwtHandler } from "../../logic/utils/token_handler"
import { BaseHttpResponse } from "../lib/base-http-response"
import { ValidateRequest } from "../middleware/base-middleware"

@controller("/students")
export class StudentsController {
  private constructor(private readonly studentsService: StudentService) {}

  @httpGet("/", new JwtHandler().verfifyToken)
  private async index(req: Request, res: Response): Promise<void> {
    const students = await this.studentsService.all()
    const response = StudentDataResponse.fromMany(students)
    res.status(200).json(BaseHttpResponse.success({ student: response }, 200))
  }

  @httpGet(
    "/:id",
    new JwtHandler().verfifyToken,
    ValidateRequest.withParams(GetStudentIDDTO)
  )
  private async getStudentWithId(req: Request, res: Response): Promise<void> {
    const student = await this.studentsService.findById(req.body.id)
    res.status(200).json(BaseHttpResponse.success({ student }, 200))
  }

  @httpPatch(
    "/:id",
    new JwtHandler().verfifyToken,
    ValidateRequest.withParams(UpdateStudentDTO)
  )
  private async updateStudent(req: Request, res: Response): Promise<void> {
    await this.studentsService.updateOneById(req.body)
    res.status(204).json(BaseHttpResponse.success([], 204))
  }
  @httpDelete(
    "/:id",
    new JwtHandler().verfifyToken,
    new CheckRole(["admin"]).check,
    ValidateRequest.withParams(GetStudentIDDTO)
  )
  private async deleteStudent(req: Request, res: Response): Promise<void> {
    await this.studentsService.deleteById(req.body).catch((e) => {
      res.status(400).json(BaseHttpResponse.failed(e.message, 400))
    })
    res.status(204).json(BaseHttpResponse.success([], 204))
  }

  @httpPost("/signup", ValidateRequest.with(SignUpDTO))
  private async signup(req: Request, res: Response): Promise<void> {
    const student = await this.studentsService.create(req.body)
    res.status(200).json(BaseHttpResponse.success({ student }, 200))
  }
  @httpPost("/login", ValidateRequest.with(LoginDTO))
  private async login(req: Request, res: Response): Promise<void> {
    const token = await this.studentsService.login(req.body)
    if (!token) {
      res.status(400).json(BaseHttpResponse.failed("Invalid credentials", 403))
    }

    res.status(200).json(BaseHttpResponse.success({ token }, 200))
  }
}
