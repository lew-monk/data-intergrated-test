export class ValidationException extends Error {
  public constructor(msg: string) {
    super(msg)
  }
}
