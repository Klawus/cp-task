import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1700440010124 implements MigrationInterface {
    name = 'Migration1700440010124'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "episodes" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "id" uuid NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_6a003fda8b0473fffc39cb831c7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "characters" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "id" uuid NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_9d731e05758f26b9315dac5e378" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "characters_episodes_episodes" ("characters_id" uuid NOT NULL, "episodes_id" uuid NOT NULL, CONSTRAINT "PK_f043a2b1a36210369fda3ac18c9" PRIMARY KEY ("characters_id", "episodes_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_77dbd6f0eef4fd5fabd4522a9a" ON "characters_episodes_episodes" ("characters_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_55d00a248d9e178d69f4f10ba4" ON "characters_episodes_episodes" ("episodes_id") `);
        await queryRunner.query(`ALTER TABLE "characters_episodes_episodes" ADD CONSTRAINT "FK_77dbd6f0eef4fd5fabd4522a9ae" FOREIGN KEY ("characters_id") REFERENCES "characters"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "characters_episodes_episodes" ADD CONSTRAINT "FK_55d00a248d9e178d69f4f10ba4f" FOREIGN KEY ("episodes_id") REFERENCES "episodes"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "characters_episodes_episodes" DROP CONSTRAINT "FK_55d00a248d9e178d69f4f10ba4f"`);
        await queryRunner.query(`ALTER TABLE "characters_episodes_episodes" DROP CONSTRAINT "FK_77dbd6f0eef4fd5fabd4522a9ae"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_55d00a248d9e178d69f4f10ba4"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_77dbd6f0eef4fd5fabd4522a9a"`);
        await queryRunner.query(`DROP TABLE "characters_episodes_episodes"`);
        await queryRunner.query(`DROP TABLE "characters"`);
        await queryRunner.query(`DROP TABLE "episodes"`);
    }

}
