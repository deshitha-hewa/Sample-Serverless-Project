import { handlerPath } from '@libs/handler-resolver';
import { createCourseSchema, updateCourseSchema } from './schema';

export const getAllCourses = {
  handler: `${handlerPath(__dirname)}/handler.getAllCourses`,
  events: [
    {
      http: {
        method: 'GET',
        path: 'courses'
      }
    }
  ]
};

export const createCourse = {
  handler: `${handlerPath(__dirname)}/handler.createCourse`,
  events: [
    {
      http: {
        method: 'POST',
        path: 'courses',
        request: {
          schemas: {
            'application/json': createCourseSchema
          }
        }
      }
    }
  ]
};

export const findCourseById = {
  handler: `${handlerPath(__dirname)}/handler.findCourseById`,
  events: [
    {
      http: {
        method: 'GET',
        path: 'courses/{id}'
      }
    }
  ]
};

export const deleteCourseById = {
  handler: `${handlerPath(__dirname)}/handler.deleteCourseById`,
  events: [
    {
      http: {
        method: 'DELETE',
        path: 'courses/{id}'
      }
    }
  ]
};

export const updateCourseById = {
  handler: `${handlerPath(__dirname)}/handler.updateCourseById`,
  events: [
    {
      http: {
        method: 'PUT',
        path: 'courses',
        request: {
          schemas: {
            'application/json': updateCourseSchema
          }
        }
      }
    }
  ]
};
