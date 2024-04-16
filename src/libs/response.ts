/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { APIGatewayProxyResult } from 'aws-lambda';

import AppError from './api-error';
import AppValidation from './api-validation';

export const clientErrorResponse = (response: Record<string, unknown> | object) => {
  return {
    statusCode: 400,
    isBase64Encoded: false,
    body: JSON.stringify(response),
    headers: {
      'Access-Control-Allow-Headers': '*',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'OPTIONS, GET, POST, PUT',
      'Content-Type': 'application/json'
    }
  };
};

/**
 * responseBuilder function
 *
 * This is used for providing a proper response with a status code, message, and other relevant information.
 * @returns {object} status code, success, message, errorMessage, body
 */

export const responseBuilder = (data: {
  statusCode: number;
  success: boolean;
  message: string;
  errorMessage?: string | null;
  body?: any;
}): APIGatewayProxyResult => {
  return {
    statusCode: data.statusCode,
    body: JSON.stringify({
      code: data.statusCode,
      success: data.success,
      message: data.message,
      error: data.errorMessage,
      data: data.body
    }),
    headers: {
      'Access-Control-Allow-Headers': '*',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'OPTIONS, GET, POST, PUT',
      'Content-Type': 'application/json'
    }
  };
};

/**
 * successResponse function
 *
 * This is used for providing a proper response with a status code, message, and other relevant information.
 * @returns {object} status code, success, message, data
 */

export const successResponse = (statusCode: number, data?: any): APIGatewayProxyResult => {
  return {
    statusCode,
    body: JSON.stringify(data),
    headers: {
      'Access-Control-Allow-Headers': '*',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'OPTIONS, GET, POST, PUT',
      'Content-Type': 'application/json'
    }
  };
};

/**
 * failureResponse function
 *
 * This is used for providing a proper response with a status code, message, and other relevant information.
 * @returns {object} status code ,success, message, errorMessage
 */

export const failureResponse = (statusCode: number, message: string): APIGatewayProxyResult => {
  return {
    statusCode,
    body: JSON.stringify({
      success: false,
      error: message
    }),
    headers: {
      'Access-Control-Allow-Headers': '*',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'OPTIONS, GET, POST, PUT',
      'Content-Type': 'application/json'
    }
  };
};

/**
 * errorHandler function
 *
 * Handles the error and returns an appropriate failure response.
 * If the error is an instance of AppError, it logs the error and returns a failure response with the error details.
 * Otherwise, it returns failure response indicating an internal server error.
 * @param {Error} error - The error to be handled.
 * @returns {object} - The failure response object.
 */
export const errorHandler = (error: Error) => {
  if (error instanceof AppError || error instanceof AppValidation) {
    return failureResponse(error.statusCode, error.message);
  }
  console.error('Error >>> ', error);
  return failureResponse(500, 'Internal server error');
};

export const wrapServiceError = (error: Error, feature: string) => {
  if (error instanceof AppError || error instanceof AppValidation) {
    throw error;
  } else if (error.message.includes('a foreign key constraint fails')) {
    throw new AppValidation('Bad ID data, please refresh data and try again', 400);
  } else {
    console.error('Error >>> ', error);
    throw new AppError(feature, 500);
  }
};

/**
 * responseHandler function
 *
 * This is used in every handler files.
 * Handles the response based on the provided status code and data.
 * If there are any validation error this will check the provided data is an instance of AppValidation and,
 * it logs a validation error and returns a failureResponse.
 * Otherwise, it returns a successResponse.
 *
 * @param {number} statusCode - The status code passing from handler.
 * @param {any} data - The data to be handled.
 * @returns {object} - The response object.
 */

export const responseHandler = (statusCode: number, data: any) => {
  if (data instanceof AppValidation) {
    console.error('Validation error >>> ', data);
    return failureResponse(data.statusCode, data.message);
  }
  return successResponse(statusCode, data);
};

export const wrapAsArray = (field: any, data: any) => {
  if (data instanceof AppValidation) {
    return data;
  }
  return { [field]: data };
};
