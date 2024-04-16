export default {
  type: 'object',
  properties: {}
} as const;

export const createCourseSchema = {
  type: "object",
  properties: {
    courseName: { type: 'string' }
  },
  required: ['courseName']
};

export const updateCourseSchema = {
  type: "object",
  properties: {
    courseId: { type: 'string' }
  },
  required: ['courseId']
};