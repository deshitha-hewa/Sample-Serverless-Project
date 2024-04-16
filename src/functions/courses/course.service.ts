import CourseDataSource from "@libs/db-connection";
import { Course } from "./entities/course.entity";

export const getAllCoursesService = async () => {

  try {
    const connection = await CourseDataSource.getInitializedInstance();
    const courseRepository = connection.getRepository(Course);
    const courses = await courseRepository.find()
    return courses;
  } catch (error) {
    console.error('Failed to fetch courses - Internal error', error);
    throw error;
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
    throw error;
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
    throw error;
  } finally {
    await CourseDataSource.closeConnection();
  }
};

export const deleteCourseByIdService = async (courseIdToDelete) => {
  try {
    const connection = await CourseDataSource.getInitializedInstance();
    const courseRepository = connection.getRepository(Course);
    const deletedCourse = await courseRepository.delete(courseIdToDelete);
    return deletedCourse.affected === 1 ? deletedCourse : null;
  } catch (error) {
    console.error('Failed to delete course - Internal error', error);
    throw error;
  } finally {
    await CourseDataSource.closeConnection();
  }
};

export const updateCourseByIdService = async (courseToUpdate) => {
  try {
    const connection = await CourseDataSource.getInitializedInstance();
    const courseRepository = connection.getRepository(Course);
    let course = await courseRepository.findOneBy({ courseId: courseToUpdate.courseId });
    if(!course){
      throw Error('Course not found')
    }
    const isCourseUpdated = await courseRepository.update(courseToUpdate.courseId,courseToUpdate);
    if(isCourseUpdated.affected === 1){
      course = await courseRepository.findOneBy({ courseId: courseToUpdate.courseId });

    }
    return course ? course : null;
  } catch (error) {
    console.error('Failed to update course - Internal error', error);
    throw error;
  } finally {
    await CourseDataSource.closeConnection();
  }
};

