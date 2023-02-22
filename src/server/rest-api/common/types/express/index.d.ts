/* eslint-disable @typescript-eslint/consistent-type-definitions */

type CustomResponseParams<T> = {
  httpStatusCode?: number;
  message?: string | null;
  data?: T;
};

declare namespace Express {
  export interface Response {
    customResponse<T = unknown>(params: CustomResponseParams<T>): Response;
  }
}
