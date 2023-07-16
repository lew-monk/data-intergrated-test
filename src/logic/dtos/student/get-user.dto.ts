export class GetStudentIDDTO {
  public constructor(public readonly id: string) {}

  public static from(body: Partial<GetStudentIDDTO>): GetStudentIDDTO {
    if (!body.id) {
      throw new Error("Provide Students ID")
    }

    return new GetStudentIDDTO(body.id)
  }
}
