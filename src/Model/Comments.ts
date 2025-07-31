import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne } from 'typeorm';
import { User } from './User';
import { Article } from './Articles';

@Entity('Comment')
export class Comment {
    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne(() => Article, (article) => article.comments, { eager: true })
    article: Article;

    @ManyToOne(() => User, (user) => user.comments, { eager: true })
    autor: User;

    @Column({ type: 'varchar', length: 500, nullable: false })
    commentContent: string;

    @CreateDateColumn()
    createdAt!: Date;

    constructor(autor: User, commentContent: string, createdAt: Date, article: Article) {
        this.autor = autor;
        this.commentContent = commentContent;
        this.createdAt = createdAt;
        this.article = article;
    }
}