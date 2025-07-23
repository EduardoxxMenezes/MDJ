import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, BeforeUpdate, OneToMany } from 'typeorm';
import bcrypt from 'bcryptjs';
import { article } from './Articles'; // Ajuste o caminho se necessário

@Entity('usuarios')
export class user {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: "varchar", length: 65, nullable: false })
    userName: string;

    @Column({ type: 'varchar', length: 255, nullable: false })
    profilePic: string;

    @Column({ type: "varchar", length: 100, nullable: false })
    userEmail: string;

    @Column({ type: "varchar", length: 50, nullable: false })
    userPassword: string;

    oldPassword?: string;

    @OneToMany(() => article, (article) => article.autor)
    article: article[] = [];

    constructor(userName: string, userEmail: string, userPassword: string, profilePic: string) {
        this.userName = userName;
        this.userEmail = userEmail;
        this.userPassword = userPassword;
        this.profilePic = profilePic;
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
