import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { user } from './User';
import { article } from './Articles';

@Entity('comment')
export class comment{
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({})
    article: article;

    @Column({})
    autor: user;

    @Column({type: 'varchar', length: 500, nullable: false})
    commentContent: string;

    @CreateDateColumn()
    createdAt!: Date;

    constructor(autor: user, commentContent: string, createdAt: Date, article: article){
        this.autor = autor;
        this.commentContent = commentContent;
        this.createdAt = createdAt;
        this.article = article;

    }
}