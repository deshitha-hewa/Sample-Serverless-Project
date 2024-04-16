export default {
  type: 'object',
  properties: {}
} as const;

export const getAllCoursesSchema = {
  type: "object",
  properties: {
    skip: { type: 'number', min: 0 },
    take: { type: 'number', min: 0 },
    searchKeyword: { type: 'string', minLength: 0, pattern: '\\S+' },
    sortColumn: { type: 'string', minLength: 0, pattern: '\\S+' },
  },
  required: ['skip', 'take']
};

export const getCourseByIdSchema = {
  type: "object",
  properties: {
    courseId: { type: 'string', minLength: 36, maxLength: 36, pattern: '\\S+' }
  },
  required: ['courseId']
};

export const deleteCourseByIdSchema = {
  type: "object",
  properties: {
    courseId: { type: 'string', minLength: 36, maxLength: 36, pattern: '\\S+' }
  },
  required: ['courseId']
};

export const createCourseSchema = {
  type: "object",
  properties: {
    courseName: { type: 'string' , minLength: 1, pattern: '\\S+'}
  },
  required: ['courseName']
};

export const updateCourseSchema = {
  type: "object",
  properties: {
    courseId: { type: 'string', minLength: 36, maxLength: 36, pattern: '\\S+' }
  },
  required: ['courseId']
};