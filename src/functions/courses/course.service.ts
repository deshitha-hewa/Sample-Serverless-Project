import CourseDataSource from "@libs/db-connection";
import { Course } from "./entities/course.entity";
import { wrapServiceError } from "@libs/response";
import AppValidation from "@libs/api-validation";
import { StatusCodes } from "@libs/enum";

export const getAllCoursesService = async () => {
  try {
    const connection = await CourseDataSource.getInitializedInstance();
    const courseRepository = connection.getRepository(Course);
    const courses = await courseRepository.find()
    return courses;
  } catch (error) {
    console.error('Failed to fetch courses - Internal error', error);
    if (error instanceof Error) {
      wrapServiceError(error, 'Failed to fetch courses - Internal error');
    }
  } finally {
    await CourseDataSource.closeConnection();
  }
};

export const findCourseByIdService = async (id) => {
  try {
    const connection = await CourseDataSource.getInitializedInstance();
    const courseRepository = connection.getRepository(Course);
    const course = await courseRepository.findOneBy({ courseId: id });
    return course ? course : null;
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

export const deleteCourseByIdService = async (courseIdToDelete) => {
  try {
    const connection = await CourseDataSource.getInitializedInstance();
    const courseRepository = connection.getRepository(Course);
    let course = await courseRepository.findOneBy({ courseId: courseIdToDelete });
    if (!course) {
      throw new AppValidation('Invalid course id', StatusCodes.NotFound);
    }
    const deletedCourse = await courseRepository.delete(courseIdToDelete);
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
    if (!course) {
      throw new AppValidation('Invalid course id', StatusCodes.NotFound);
    }
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

