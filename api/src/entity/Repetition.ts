import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('repetitions')
export class Repetition extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  public id!: string;

  @Column({ nullable: false, type: 'varchar' })
  public userId!: string;

  @Column({ nullable: false, type: 'varchar' })
  public sourceLanguage!: string;

  @Column({ nullable: false, type: 'varchar' })
  public targetLanguage!: string;

  @Column({ nullable: false, type: 'varchar' })
  public sourceLanguageText!: string;

  @Column({ nullable: false, type: 'varchar' })
  public targetLanguageText!: string;

  @Column({ nullable: false, type: 'numeric' })
  public successfulRepetitionsInRow!: number;

  @Column({ nullable: false, type: 'datetime' })
  public nextRepetitionDate!: Date;

  @CreateDateColumn()
  public createdAt!: Date;

  @UpdateDateColumn()
  public updatedAt!: Date;

  // public static create(
  //   id: string,
  //   userId: string,
  //   sourceLanguage: string,
  //   targetLanguage: string,
  //   sourceLanguageText: string,
  //   targetLanguageText: string,
  //   successfulRepetitionsInRow: number,
  //   nextRepetitionDate: Date
  // ): Repetition {
  //   const repetition = new Repetition();
  //   return repetition;
  // }
}
