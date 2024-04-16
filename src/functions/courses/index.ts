import { handlerPath } from '@libs/handler-resolver';
import { createCourseSchema, deleteCourseByIdSchema, getAllCoursesSchema, getCourseByIdSchema, updateCourseSchema } from './schema';

export const getAllCourses = {
  handler: `${handlerPath(__dirname)}/handler.getAllCourses`,
  events: [
    {
      http: {
        method: 'POST',
        path: 'courses',
        request: {
          schemas: {
            'application/json': getAllCoursesSchema
          }
        }
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
        path: 'course/create',
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
        method: 'POST',
        path: 'course',
        request: {
          schemas: {
            'application/json': getCourseByIdSchema
          }
        }
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
        path: 'course/delete',
        request: {
          schemas: {
            'application/json': deleteCourseByIdSchema
          }
        }
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
