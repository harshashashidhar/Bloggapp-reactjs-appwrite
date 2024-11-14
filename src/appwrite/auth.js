//src/appwrite/auth.js
import { Client, Account, ID } from "appwrite";
import conf from "../conf/conf.js";

export class AuthService {
  client = new Client();
  account;

  constructor() {
    this.client.setProject(conf.appwriteProductId).setEndpoint(conf.appwriteUrl);
    this.account = new Account(this.client);
  }
  async createAccount({ email, password, name }) {
    try {
      // const sessions = await this.account.listSessions();
      // console.log(sessions);
      //  if (sessions.total > 0)
      //    { 
         
      //     await this.account.deleteSession('current');
      //    }
          
     

      const userAccount = await this.account.create(
        ID.unique(), 
        email, 
        password, 
        name
      );

      
      if (userAccount) {
        return this.login({ email, password });
      } else {
        return null;  
      }
    } catch (error) {
      console.error("Appwrite service :: createAccount ::", error);
      throw error;
    }
  }
  
  async login({ email, password }) {
    try {
      return await this.account.createEmailPasswordSession(email, password);
    } catch (error) {
      console.error("Appwrite service :: login ::", error);
      throw error;
    }
  }
  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (error) {
      console.error("Appwrite service :: getCurrentUser ::", error);
      return null;  
    }
  }
  async logout() {
    try {
      return await this.account.deleteSessions();
    } catch (error) {
      console.error("Appwrite service :: logout ::", error);
      throw error;
    }
  }
}
const authService = new AuthService();
export default authService;

