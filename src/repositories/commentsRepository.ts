import { DataSource } from "typeorm";
import AppDataSource from "../dataBase/dataSource";

import { Article } from "../Model/Articles";
import { Comment } from "../Model/Comments";
import { User } from "../Model/User";

export class CommentRepository {
  private reposit = AppDataSource.getRepository(Comment);

  async createComment(autor: User, commentContent: string, createdAt: Date, article: Article) {
    const comments = new Comment(autor, commentContent, createdAt, article);
    comments.autor = autor;
    comments.commentContent = commentContent;
    comments.createdAt = createdAt;
    
    return await this.reposit.save(comments);
  }
  
  async findCommentByArticle(article: Article){
    return await this.reposit.findOneBy({article: article})
  }
  async findCommentByAutor(autor: User) {
    return await this.reposit.findOneBy({ autor: autor});
   
  }

  async findCommentById(id: number) {
    return await this.reposit.findOne({ where: { id } });
    
  }

  async updateComment(id: number, fields: Partial<Comment>) {
    const comments = await this.findCommentById(id);
    if (!comments) return null;

  

    Object.assign(comments, fields);
    return await this.reposit.save(comments);
  }

  async deleteComment(id: number) {
    const comments = await this.findCommentById(id);
    if (!comments) return null;
    return await this.reposit.remove(comments);
  }

  async findAllComments() {
    return await this.reposit.find();
  }
}