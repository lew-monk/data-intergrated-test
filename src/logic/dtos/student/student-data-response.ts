import { IStudent } from "../../../data/student/students.model"

export class StudentDataResponse {
  public constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly email: string
  ) {}

  public static from(body: IStudent): StudentDataResponse {
    return new StudentDataResponse(body._id!, body.name, body.email)
  }
  public static fromMany(body: IStudent[]): StudentDataResponse[] {
    return body.map((student) => {
      return new StudentDataResponse(student._id!, student.name, student.email)
    })
  }
}
