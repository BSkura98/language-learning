import { MigrationInterface, QueryRunner } from "typeorm";

export class addRepetition1681489970788 implements MigrationInterface {
    name = 'addRepetition1681489970788'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`repetitions\` (\`id\` varchar(36) NOT NULL, \`userId\` varchar(255) NOT NULL, \`sourceLanguage\` varchar(255) NOT NULL, \`targetLanguage\` varchar(255) NOT NULL, \`sourceLanguageText\` varchar(255) NOT NULL, \`targetLanguageText\` varchar(255) NOT NULL, \`successfulRepetitionsInRow\` varchar(255) NOT NULL, \`nextRepetitionDate\` varchar(255) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`repetitions\``);
    }

}
