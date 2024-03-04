import conf from "../conf/conf";
import { Client,Account,ID, Databases, Storage,Query } from "appwrite";

export class Service {
    client = new Client();
    databases;
    bucket;

    constructor(){
        this.client.setEndpoint(conf.appwriteUrl);
        this.client.setProject(conf.appwriteProjectId);
        // this.client.setDatabase(conf.appwriteDatabaseId);
        // this.client.setCollection(conf.appwriteCollectionId);
        // this.client.setBucket(conf.appwriteBucketId);
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    // create post method
    async createPost({title,slug,content,featuredImage,status,userId}) {
        try {
            return await this.databases.createDocument(conf.appwriteDatabaseId,conf.appwriteCollectionId,slug,{
                title,
                content,
                featuredImage,
                status,
                userId,
            })
        } catch (error) {
            console.log("Appwrite service :: createPost :: error", error);
        }
    }

    async updatePost(slug,{title,content,featuredImage,status}){
        try {
            return await this.databases.updateDocument(conf.appwriteDatabaseId,conf.appwriteCollectionId,
            slug,
            {
                title,
                content,
                featuredImage,
                status,

            })
            
        } catch (error) {
            console.log("Appwrite service :: updatePost :: error", error);
        }
    }

    async deletePost(slug){
        try {
            const deleted = await this.databases.deleteDocument(conf.appwriteDatabaseId,conf.appwriteCollectionId,slug);
            return true;
        } catch (error) {
            console.log("Appwrite service :: deletePost :: error", error);
        }
    }

    async getPost (slug){
        try {
            return await this.databases.getDocument(conf.appwriteDatabaseId,conf.appwriteCollectionId,slug);
        } catch (error) {
            console.log("Appwrite service :: getPost :: error", error);
            return false;
        }
    }

    async getPosts(queries = [Query.equal('status','active')]){
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                queries
            )

        } catch (error) {
            console.log("Appwrite service :: getPosts :: error", error);
            return false;
        }
    }

    async uploadFile(file){
        try {
            return this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file,
            )


        } catch (error) {
            console.log("Appwrite service :: uplaodFile :: error", error);
        }
    }

    async deleteFile(fileId){
        try {
            return this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId
            )

            
        } catch (error) {
            console.log("Appwrite service :: deleteFile :: error", error);
            return false; 
        }
    }


    getFilePreview(fileId){
        return this.bucket.getFilePreview(
            conf.appwriteBucketId,
            fileId,
        )
    }
}

const service = new Service();

export default service