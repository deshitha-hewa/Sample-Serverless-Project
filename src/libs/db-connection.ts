import { DataSource } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import * as dotenv from 'dotenv';
import * as path from 'path';
import { Course } from '@functions/courses/entities/course.entity';

dotenv.config({ path: `${__dirname}/.env` });
dotenv.config({ path: path.resolve(process.cwd(), '.env') });
export default class CourseDataSource {
  private static instance: DataSource;

  private static referenceCount = 0;

  public static async getInitializedInstance(): Promise<DataSource> {
    if (CourseDataSource.referenceCount === 0) {
      const datasource = new DataSource({
        type: 'mysql',
        host: process.env.DB_HOST,
        port: 3306,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        namingStrategy: new SnakeNamingStrategy(),
        entities: [Course],
        migrations: [],
        subscribers: []
      });
      CourseDataSource.instance = await datasource.initialize();
    }
    CourseDataSource.referenceCount += 1;
    return CourseDataSource.instance;
  }

  public static async closeConnection(): Promise<void> {
    CourseDataSource.referenceCount -= 1;
    if (CourseDataSource.referenceCount <= 0 && CourseDataSource.instance) {
      await CourseDataSource.instance.destroy();
      CourseDataSource.referenceCount = 0;
    }
  }
}