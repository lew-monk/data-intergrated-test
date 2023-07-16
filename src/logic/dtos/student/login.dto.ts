import { ValidationException } from "../../exceptions/validation-exception"

export class LoginDTO {
  public constructor(
    public readonly email: string,
    public readonly password: string
  ) {}

  public static from(data: any): LoginDTO {
    if (!data.email) {
      throw new ValidationException("Email is required")
    }
    if (!data.password) {
      throw new ValidationException("Password is required")
    }

    return new LoginDTO(data.email, data.password)
  }
}
