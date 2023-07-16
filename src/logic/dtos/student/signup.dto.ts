export class SignUpDTO {
  public constructor(
    public readonly name: string,
    public readonly email: string,
    public password: string,
    public readonly course?: string | null
  ) {}

  public static from(data: any): SignUpDTO {
    if (!data.name) {
      throw new Error("Name is required")
    }
    if (!data.email) {
      throw new Error("Email is required")
    }
    if (!data.password) {
      throw new Error("Password is required")
    }

    return new SignUpDTO(data.name, data.email, data.password)
  }

  public set setHashedPassword(password: string) {
    this.password = password
  }
}
