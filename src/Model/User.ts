import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, BeforeUpdate, OneToMany } from 'typeorm';
import bcrypt from 'bcryptjs';
import { Article } from './Articles';
import { Comment } from './Comments';

@Entity('User')
export class User {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: "varchar", length: 255, nullable: false })
    userName: string;

    @Column({ type: 'longtext', nullable: false })
    profilePic: string;

    @Column({ type: "varchar", length: 100, nullable: false })
    userEmail: string;

    @Column({ type: "varchar", length: 255, nullable: false })
    userPassword: string;

    oldPassword?: string;

    @OneToMany(() => Article, (article) => article.autor)
    articles?: Article[];

    @OneToMany(() => Comment, (comment) => comment.autor)
    comments?: Comment[];

    constructor(
        userName: string,
        userEmail: string,
        userPassword: string,
        profilePic: string,
        articles?: Article[],
        comments?: Comment[]
    ) {
        this.userName = userName;
        this.userEmail = userEmail;
        this.userPassword = userPassword;
        this.profilePic = profilePic;
        if (articles) this.articles = articles;
        if (comments) this.comments = comments;
    }

    @BeforeInsert()
    async hashPasswordBeforeInsert() {
        const salt = await bcrypt.genSalt(10);
        this.userPassword = await bcrypt.hash(this.userPassword, salt);
    }

    @BeforeUpdate()
    async hashPasswordBeforeUpdate() {
        if (this.userPassword !== this.oldPassword) {
            const salt = await bcrypt.genSalt(10);
            this.userPassword = await bcrypt.hash(this.userPassword, salt);
        }
    }

    setPreviousPassword(password: string) {
        this.oldPassword = password;
    }
}