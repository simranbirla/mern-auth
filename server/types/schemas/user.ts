import mongoose from "mongoose";


export interface IUser extends  mongoose.Document {
    _id: any;
    username: string;
    password: string;
    email: string;
    createdAt: string | Date;
    updatedAt: string | Date;
    profilePhotoUrl:string
    _doc: any;
}
