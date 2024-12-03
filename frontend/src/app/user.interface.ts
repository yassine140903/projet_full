import { Article } from "./article.interface";

export interface User{
    _id : string;
    username : string;
    email : string;
    image : string;
    phoneNumber : string;
    location : string;
    posts : Article[];
    role : string;
    createdAt: string;
    updatedAt: string;
    isLoggedIn : boolean;
}