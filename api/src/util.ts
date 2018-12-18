export class UserError extends Error {
  constructor(...args: any) {
    super(...args)
    this.name = 'Error'
    this.message = args[0]
    Error.captureStackTrace(this, UserError)
  }
}
