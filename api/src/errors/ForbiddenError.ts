import { RequestError } from "./RequestError";

export class ForbiddenError extends RequestError {
  constructor(message = 'Not authorized to access the resource', statusCode = 403) {
    super(message, statusCode);
  }
}
