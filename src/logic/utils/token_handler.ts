import jwt from "jsonwebtoken"

export class JwtHandler {
  private readonly _secretKey: string
  public constructor() {
    this._secretKey = process.env.TOKEN_KEY || "secret"
  }

  public generateToken(payload: any, expiresIn: number): string {
    const issuedAt = Math.floor(Date.now() / 1000) // Current timestamp in seconds
    const expiration = issuedAt + expiresIn // Expiration timestamp

    const token = jwt.sign(
      { exp: expiration, iat: issuedAt, ...payload },
      this._secretKey
    )

    return token
  }

  public verifyToken(token: string): string | jwt.JwtPayload {
    try {
      const decoded = jwt.verify(token, this._secretKey)
      return decoded
    } catch (error) {
      // Token verification failed
      throw Error("Something wrong with your session. Please Log in again")
    }
  }
}
