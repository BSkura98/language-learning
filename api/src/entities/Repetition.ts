import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('repetitions')
export class Repetition extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id!: string;

  @Column({ nullable: false })
  public userId!: string;

  @Column({ nullable: false })
  public sourceLanguage!: string;

  @Column({ nullable: false })
  public targetLanguage!: string;

  @Column({ nullable: false })
  public sourceLanguageText!: string;

  @Column({ nullable: false })
  public targetLanguageText!: string;

  @Column({ nullable: false })
  public successfulRepetitionsInRow!: number;

  @Column({ nullable: false })
  public nextRepetitionDate!: Date;

  @CreateDateColumn()
  public createdAt!: Date;

  @UpdateDateColumn()
  public updatedAt!: Date;
}
