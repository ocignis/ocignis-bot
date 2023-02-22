import { response, Response } from 'express';

response.customResponse = function ({ httpStatusCode = 200, message = null, data = null }): Response {
  return this.status(httpStatusCode).json({ message, data });
};
