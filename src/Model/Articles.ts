import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { user } from './User';

export enum options {
    professional = 'profissional',
    personal = 'pessoal',
    financial = 'financeiro',
    none = 'none'
}

@Entity('article')
export class article {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: 'varchar', length: 100, nullable: false })
    titleArticle: string;

    @Column({ type: 'varchar', length: 255, nullable: false })
    descArticle: string;

    @Column({ type: 'text', nullable: false })
    contentArticle: string;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;

    @ManyToOne(() => user, (user) => user.article)
    @JoinColumn({ name: 'autor_id' })
    autor: user;

    @Column({ type: 'enum', enum: options, length: 30, nullable: false })
    category?: options;

    constructor(
        titleArticle: string,
        descArticle: string,
        contentArticle: string,
        createdAt: Date,
        autor: user,
        category: options = options.none
    ) {
        this.titleArticle = titleArticle;
        this.descArticle = descArticle;
        this.contentArticle = contentArticle;
        this.createdAt = createdAt;
        this.autor = autor;
        this.category = category;
    }
}
