export class UpdateStudentDTO {
  private constructor(
    public readonly id: string,
    public readonly name?: string,
    public readonly email?: string
  ) {}

  public static from(data: Partial<UpdateStudentDTO>): UpdateStudentDTO {
    if (!data.id) {
      throw new Error("Id is required")
    }

    return new UpdateStudentDTO(data.id, data.name, data.email)
  }
}
