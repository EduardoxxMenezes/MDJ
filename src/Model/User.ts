import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, BeforeUpdate } from 'typeorm';
import bcrypt from 'bcryptjs';


@Entity('usuarios')
export class user{
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({type: "varchar", length: 65, nullable: false})
    userName: string;

    @Column({type: 'blob', nullable: false})
    profilePic: Blob;

    @Column({type: "varchar", length: 100, nullable: false})
    userEmail: string;

    @Column({type: "varchar", length: 50, nullable: false})
    userPassword: string;

    oldPassword?: string;

    constructor(userName: string, userEmail:string, userPassword: string, profilePic: Blob){
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