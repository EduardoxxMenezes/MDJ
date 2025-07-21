import { DataSource } from "typeorm";
import AppDataSource from "../dataBase/dataSource";

import { article } from "../Model/Articles";
import { comment } from "../Model/Comments";
import { user } from "../Model/User";

export class CommentRepository {
  private reposit = AppDataSource.getRepository(comment);

  async createComment(autor: user, commentContent: string, createdAt: Date, article: article) {
    const comments = new comment(autor, commentContent, createdAt, article);
    comments.autor = autor;
    comments.commentContent = commentContent;
    comments.createdAt = createdAt;
    
    return await this.reposit.save(comments);
  }
  
  async findCommentByArticle(article: article){
    return await this.reposit.findOneBy({article: article})
  }
  async findCommentByAutor(autor: user) {
    return await this.reposit.findOneBy({ autor: autor});
   
  }

  async findCommentById(id: number) {
    return await this.reposit.findOne({ where: { id } });
    
  }

  async updateComment(id: number, fields: Partial<comment>) {
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