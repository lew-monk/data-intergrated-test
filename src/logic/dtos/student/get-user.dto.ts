import { ValidationException } from "../../exceptions/validation-exception"

export class GetStudentIDDTO {
  public constructor(public readonly id: string) {}

  public static from(body: Partial<GetStudentIDDTO>): GetStudentIDDTO {
    if (!body.id) {
      throw new ValidationException("Provide Students ID")
    }

    return new GetStudentIDDTO(body.id)
  }
}
