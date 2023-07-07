export enum ErrorType {
  SERVER = 'InternalServerError',
  UNAUTHORIZED = 'Unauthorized',
  CREDENTIALS = 'InvalidEmailOrPassword',
  USER = 'InvalidUser',
}

class ErrorHandler extends Error {
  __proto__ = Error;

  private _statusCode: number;
  public get statusCode(): number {
    return this._statusCode;
  }

  private _statusMessage: string;
  public get statusMessage(): string {
    return this._statusMessage;
  }

  constructor(message = 'Internal Server Error', statusMessage = ErrorType.SERVER, statusCode = 500) {
    super(message);
    this._statusMessage = statusMessage;
    this._statusCode = statusCode;
    Object.setPrototypeOf(this, ErrorHandler.prototype);
  }
}

export default ErrorHandler;
