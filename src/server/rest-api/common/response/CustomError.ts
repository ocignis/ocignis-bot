import { logger } from 'common/utils';

type ErrorResponse = {
  errorMessage: string | null;
  errors: ReadonlyArray<string> | null;
  errorRaw: unknown;
  stack?: string;
};

export class CustomError extends Error {
  private httpStatusCode: number;
  private errorMessage: string | null;
  private errors: ReadonlyArray<string> | null;
  private errorRaw: unknown;

  constructor({
    httpStatusCode = 400,
    errorMessage = null,
    errors = null,
    errorRaw = null,
  }: Partial<ErrorResponse> & {
    httpStatusCode?: number;
  }) {
    super();

    // Setting the this.name property to the constructor’s name will reference
    // 'ErrorResponse' in stack traces instead of the generic 'Error' name.
    this.name = this.constructor.name;

    this.httpStatusCode = httpStatusCode;
    this.errorMessage = errorMessage;
    this.errors = errors;
    this.errorRaw = errorRaw;

    logger.error(JSON.stringify(this.JSON));
  }

  get HttpStatusCode() {
    return this.httpStatusCode;
  }

  get JSON(): ErrorResponse {
    return {
      errorMessage: this.errorMessage,
      errors: this.errors,
      errorRaw: this.errorRaw,
      stack: process.env.NODE_ENV !== 'production' ? this.stack : undefined,
    };
  }
}
