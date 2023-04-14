import { MigrationInterface, QueryRunner } from "typeorm";

export class addRepetition1681488902252 implements MigrationInterface {
    name = 'addRepetition1681488902252'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`repetitions\` (\`id\` int NOT NULL AUTO_INCREMENT, \`userId\` varchar(255) NOT NULL, \`sourceLanguage\` varchar(255) NOT NULL, \`targetLanguage\` varchar(255) NOT NULL, \`sourceLanguageText\` varchar(255) NOT NULL, \`targetLanguageText\` varchar(255) NOT NULL, \`successfulRepetitionsInRow\` int NOT NULL, \`nextRepetitionDate\` datetime NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`repetitions\``);
    }

}
