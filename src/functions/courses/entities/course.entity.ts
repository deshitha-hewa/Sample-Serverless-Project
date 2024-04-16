import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Course {
  @PrimaryGeneratedColumn('uuid')
  courseId!: string;

  @Column('varchar')
  courseName!: string;

  @Column('varchar')
  programId!: string;
}
