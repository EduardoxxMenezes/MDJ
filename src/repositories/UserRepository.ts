import AppDataSource from "../dataBase/dataSource";
import { user } from "../Model/User";

export class UserRepository {
  private reposit = AppDataSource.getRepository(user);

  async createUser(name: string, email: string, password: string, profilePicture: Blob) {
    const newUser = new user(name, email, password, profilePicture);
    // Não precisa reatribuir os campos que já foram passados no construtor
    return await this.reposit.save(newUser);
  }

  async findUserByEmail(email: string) {
    return await this.reposit.findOneBy({ userEmail: email });
  }

  async findUserById(id: number) {
    return await this.reposit.findOne({ where: { id } });
  }

  async updateUser(id: number, fields: Partial<user>) {
    const existingUser = await this.findUserById(id);
    if (!existingUser) return null;

    existingUser.setPreviousPassword(existingUser.userPassword);

    Object.assign(existingUser, fields);
    return await this.reposit.save(existingUser);
  }

  async deleteUser(id: number) {
    const existingUser = await this.findUserById(id);
    if (!existingUser) return null;
    return await this.reposit.remove(existingUser);
  }

  async findAllUsers() {
    return await this.reposit.find();
  }
}
