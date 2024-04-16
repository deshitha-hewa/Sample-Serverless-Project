import CourseDataSource from "@libs/db-connection";
import { Course } from "./entities/course.entity";
import { wrapServiceError } from "@libs/response";
import AppValidation from "@libs/api-validation";
import { StatusCodes } from "@libs/enum";
import { ReturnDataAndCount } from "@libs/interfaces";
import { addSearchToBuilder, addSkipAndTake, addSortToBuilder, checkCourseIdIsExist } from "./validation.utils";

export const getAllCoursesService = async (body: {
  skip: number;
  take: number;
  searchKeyword?: string;
  sortColumn?: string;
}) => {
  try {
    const { searchKeyword, sortColumn, skip, take } = body;
    const connection = await CourseDataSource.getInitializedInstance();
    const courseRepository = connection.getRepository(Course);
    let builder = courseRepository.createQueryBuilder('course');

    builder = addSearchToBuilder(builder, searchKeyword);
    builder = addSortToBuilder(builder, sortColumn);
    builder = addSkipAndTake(builder, skip, take);

    const [courses, totalCount] = await builder.getManyAndCount();

    let paginatedValidationInfo: ReturnDataAndCount<Course> = { data: [], totalCount: 0 };
    if (courses) {
      paginatedValidationInfo = { data: courses, totalCount };
    }

    return paginatedValidationInfo;
  } catch (error) {
    console.error('Failed to fetch courses - Internal error', error);
    if (error instanceof Error) {
      wrapServiceError(error, 'Failed to fetch courses - Internal error');
    }
  } finally {
    await CourseDataSource.closeConnection();
  }
};

export const findCourseByIdService = async (body) => {
  try {
    const connection = await CourseDataSource.getInitializedInstance();
    const courseRepository = connection.getRepository(Course);
    const course = await courseRepository.findOneBy({ courseId: body.courseId });

    checkCourseIdIsExist(course);

    return course;
  } catch (error) {
    console.error('Failed to fetch course - Internal error', error);
    if (error instanceof Error) {
      wrapServiceError(error, 'Failed to fetch course - Internal error');
    }
  } finally {
    await CourseDataSource.closeConnection();
  }
};

export const createCourseService = async (course) => {
  try {
    const connection = await CourseDataSource.getInitializedInstance();
    const courseRepository = connection.getRepository(Course);

    const newCourse = await courseRepository.save(course);

    return newCourse;
  } catch (error) {
    console.error('Failed to create course - Internal error', error);
    if (error instanceof Error) {
      wrapServiceError(error, 'Failed to create course - Internal error');
    }
  } finally {
    await CourseDataSource.closeConnection();
  }
};

export const deleteCourseByIdService = async (body) => {
  try {
    const connection = await CourseDataSource.getInitializedInstance();
    const courseRepository = connection.getRepository(Course);
    let course = await courseRepository.findOneBy({ courseId: body.courseId });

    checkCourseIdIsExist(course);

    const deletedCourse = await courseRepository.delete(body);
    return deletedCourse.affected === 1 ? "Successfully deleted" : "Not deleted";
  } catch (error) {
    console.error('Failed to delete course - Internal error', error);
    if (error instanceof Error) {
      wrapServiceError(error, 'Failed to delete course - Internal error');
    }
  } finally {
    await CourseDataSource.closeConnection();
  }
};

export const updateCourseByIdService = async (courseToUpdate) => {
  try {
    const connection = await CourseDataSource.getInitializedInstance();
    const courseRepository = connection.getRepository(Course);
    let course = await courseRepository.findOneBy({ courseId: courseToUpdate.courseId });

    checkCourseIdIsExist(course);

    const updatedCourse = await courseRepository.update(courseToUpdate.courseId, courseToUpdate);

    return updatedCourse.affected === 1 ? 'Successfully updated' : 'Not Edited';
  } catch (error) {
    console.error('Failed to update course - Internal error', error);
    if (error instanceof Error) {
      wrapServiceError(error, 'Failed to update course - Internal error');
    }
  } finally {
    await CourseDataSource.closeConnection();
  }
};

