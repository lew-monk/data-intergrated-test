export class UnauthorizedException extends Error {
  public constructor(msg: string) {
    super(msg)
  }
}
