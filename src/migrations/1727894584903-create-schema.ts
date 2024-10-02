import { MigrationInterface, QueryRunner } from 'typeorm';
import { readFileDist } from './read-file';

export class CreateSchema1727894584903 implements MigrationInterface {
  filename = '1727894584903-create-schema';

  public async up(queryRunner: QueryRunner): Promise<void> {
    const file = readFileDist(__dirname, 'scripts', `${this.filename}.up.sql`);
    await queryRunner.query(file.toString());
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const file = readFileDist(
      __dirname,
      'scripts',
      `${this.filename}.down.sql`,
    );
    await queryRunner.query(file.toString());
  }
}
