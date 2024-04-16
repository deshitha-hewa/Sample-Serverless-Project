import { Brackets, SelectQueryBuilder } from "typeorm";
import { Course } from "./entities/course.entity";
import { validateSkipAndTake } from "@libs/validation.utils";
import { BodyDefaults, StatusCodes } from "@libs/enum";
import AppValidation from "@libs/api-validation";

export const checkCourseIdIsExist = (
  course: Course
)=> {
  if (!course) {
    throw new AppValidation('Invalid course id', StatusCodes.NotFound);
  }
}
export const addSearchToBuilder = (
  builder: SelectQueryBuilder<Course>,
  search: string,
): SelectQueryBuilder<Course> => {
  if (!search) return builder;

  builder.where(
    new Brackets((queryBuilder) => {
      queryBuilder
        .where('LOWER(course.course_name) LIKE LOWER(:courseName)', {
          courseName: `%${search}%`
        })
        .orWhere('LOWER(course.program_id) LIKE LOWER(:programId)', {
          courseType: `%${search}%`
        })
    })
  );
  return builder;
};

export const addSortToBuilder = (
  builder: SelectQueryBuilder<Course>,
  sorts: string
): SelectQueryBuilder<Course> => {
  if (!sorts) {
    builder.orderBy('course.courseName', 'DESC');
    return builder;
  } else {
    builder.orderBy('course.courseName', 'ASC');
  }

  return builder;
};

export const addSkipAndTake = (
  builder: SelectQueryBuilder<Course>,
  skip: number,
  take: number
): SelectQueryBuilder<Course> => {

  skip = skip ?? BodyDefaults.Skip;
  take = take ?? BodyDefaults.Take;

  validateSkipAndTake(skip, take);
  builder.skip(skip);
  builder.take(take);
  return builder;
};