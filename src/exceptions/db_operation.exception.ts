import { HttpException } from "@nestjs/common";

export class DbOperationException extends HttpException {
  constructor(message: string) {
    super({
      status: 503,
      message: `An error occurred while performing a database operation: ${message}`,
    }, 503);
  }
}