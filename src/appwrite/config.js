//src/appwrite/config.js
import conf from "../conf/conf.js"
import { Client, Account, Databases, Storage, Query, ID } from "appwrite"

export class Service {
    client = new Client();
    databases;
    bucket;
    account;//temp
    constructor() {
        this.client.setEndpoint(conf.appwriteUrl) 
            .setProject(conf.appwriteProductId) ;
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
        this.account=new Account(this.client);//temp
    }
    async getCurrentUser() {
        try {
          return await this.account.get(); 
        } catch (error) {
          console.error('Error fetching current user:', error);
          return null;
        }
      }

      generateSlug(title) { 
        return title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
     }
     async getPosts(queries = [Query.equal("status", "active")]) {
        try {
            return await this.databases.listDocuments(conf.appwriteDatabaseId, conf.appwriteCollectionId, queries)
        } catch (error) {
            console.log("Appwrite service :: getPosts()::", error)
            return [];
        }
    }
    async getPost(slug) {
        try {
            return await this.databases.getDocument(conf.appwriteDatabaseId, conf.appwriteCollectionId, slug)
        } catch (error) {
            console.log("Appwrite service :: getPost() ::", error)
            return null;
        }
    }
    async createPost({ slug,title, content, featuredImage, status, userId }) {
        const existingPost = await this.getPost(slug);
        if (existingPost) {
            console.log("Post with this slug already exists.");
            return false;
        }

        try {
            return await this.databases.createDocument(conf.appwriteDatabaseId, conf.appwriteCollectionId, slug, {
                title,
                slug,
                content,
                featuredImage,
                status,
                userId
            });
        } catch (error) {
            console.log("Appwrite Service :: createPost() ::", error);
            return false;
        }
    }
    async updatePost(slug, { title, newSlug, content, featuredImage, status }) {
        try {
            const updatedSlug = newSlug || slug;
            return await this.databases.updateDocument(conf.appwriteDatabaseId, conf.appwriteCollectionId, slug, {
                title,
                slug: updatedSlug,
                content,
                featuredImage,
                status
            });
        } catch (error) {
            console.log("Appwrite Service :: updatePost() ::", error);
            return false;
        }
    }
    async deletePost(slug){
        try {
            await this.databases.deleteDocument(conf.appwriteDatabaseId, conf.appwriteCollectionId, slug)
        } catch (error) {
            console.log("Appwrite Service :: deletePost() ::", error)  
            return false
        }
    }
    async uploadFile(file){
        try {
            return await this.bucket.createFile(conf.appwriteBucketId, ID.unique(), file)
        } catch (error) {
            console.log("Appwrite Service :: uploadFile() ::", error)
            return false
        }
    }
    getFilePreview(fileId){
        return this.bucket.getFilePreview(conf.appwriteBucketId, fileId).href
    }
    async deleteFile(fileId){
        try {
            await this.bucket.deleteFile(conf.appwriteBucketId, fileId)
        } catch (error) {
            console.log("Appwrite Service :: deleteFile() ::", error)
            return false
        }
    }
    
}
const appwriteService = new Service()
export default appwriteService
