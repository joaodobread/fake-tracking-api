import { MigrationInterface, QueryRunner } from 'typeorm';
import { readFileDist } from './read-file';

export class SeedSchema1727895402724 implements MigrationInterface {
  filename = '1727895402724-seed-schema';

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
