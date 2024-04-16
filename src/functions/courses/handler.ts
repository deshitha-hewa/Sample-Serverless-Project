import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';

import schema, { createCourseSchema } from './schema';
import { createCourseService, deleteCourseByIdService, findCourseByIdService, getAllCoursesService, updateCourseByIdService } from './course.service';

const getAllCoursesHandler: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async () => {
  const courses = await getAllCoursesService()
  return formatJSONResponse({
    message: `Get all course`,
    data: courses
  });
};

const findCourseByIdHandler: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  console.log(event.pathParameters.id)
  const course = await findCourseByIdService(event.pathParameters.id)
  if (course) {
    return formatJSONResponse({
      message: `Successfully created a course`,
      data: course
    });
  }
};

const createCourseHandler: ValidatedEventAPIGatewayProxyEvent<typeof createCourseSchema> = async (event) => {
  const course = await createCourseService(event.body)
  if (course) {
    return formatJSONResponse({
      message: `Successfully created a course`,
      data: course
    });
  }
};

const deleteCourseByIdHandler: ValidatedEventAPIGatewayProxyEvent<typeof createCourseSchema> = async (event) => {
  const course = await deleteCourseByIdService(event.pathParameters.id)
  if (course) {
    return formatJSONResponse({
      message: `${event.pathParameters.id} Successfully deleted a course`
    });
  }
};

const updateCourseByIdHandler: ValidatedEventAPIGatewayProxyEvent<typeof createCourseSchema> = async (event) => {
  const course = await updateCourseByIdService(event.body)
  if (course) {
    return formatJSONResponse({
      message: `Successfully updated a course`,
      data: course
    });
  }
};

export const getAllCourses = middyfy(getAllCoursesHandler);
export const findCourseById = middyfy(findCourseByIdHandler);
export const createCourse = middyfy(createCourseHandler);
export const deleteCourseById = middyfy(deleteCourseByIdHandler);
export const updateCourseById = middyfy(updateCourseByIdHandler);