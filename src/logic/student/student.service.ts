import { injectable } from "inversify"
import { StudentRepository } from "../../data/student/student.repository"
import { IStudent } from "../../data/student/students.model"
import { SignUpDTO } from "../dtos/student"
import { StudentDataResponse } from "../dtos/student/student-data-response"
import { UpdateStudentDTO } from "../dtos/student/update-student.tdo"
import { PasswordHandler } from "../utils/password_handler"
import { JwtHandler } from "../utils/token_handler"

@injectable()
export class StudentService {
  public constructor(private readonly studentRepo: StudentRepository) {}

  public async all(): Promise<IStudent[]> {
    const students = await this.studentRepo.all()
    return students
  }
  public async findByEmail(email: string): Promise<IStudent | null> {
    const student = await this.studentRepo.findByEmail(email)
    return student
  }

  public async findById(id: string): Promise<StudentDataResponse | null> {
    const student = await this.studentRepo.findById(id)

    if (!student) return null

    return StudentDataResponse.from(student!)
  }

  public async create(studentData: SignUpDTO): Promise<any> {
    // check if user exists
    let student = await this.studentRepo.findByEmail(studentData.email)
    if (student) throw Error("Student already exists")

    //Hash password
    const password = await new PasswordHandler().hashPassword(
      studentData.password
    )

    studentData.setHashedPassword = password

    student = await this.studentRepo.create(studentData)
    return student
  }

  public async updateOneById(studentData: UpdateStudentDTO): Promise<any> {
    // check if user exists
    let student = await this.studentRepo.findById(studentData.id)
    if (!student) throw Error("Student Doesn't exists")

    //Hash password

    student = await this.studentRepo.updateOneById(studentData)
    return student
  }

  public async login(studentData: SignUpDTO): Promise<string> {
    // check if user exists
    const student = await this.studentRepo.findByEmail(studentData.email)
    if (!student) throw Error("Student does not exist")

    //Check password
    const passwordVerified = await new PasswordHandler().comparePassword(
      studentData.password,
      student.password
    )

    if (!passwordVerified) throw Error("Invalid password")

    //Generate Token
    const token = new JwtHandler().generateToken(
      { email: student.email, role: "student" },
      3600
    )

    return token
  }
}
