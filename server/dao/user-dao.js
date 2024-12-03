<<<<<<< HEAD
import User from "../models/User.mjs";
import { ApiError } from "../utils/index.mjs";

class userDao{
   static async getByEmail(email){
        try {
            return User.findOne({email})    
        } catch (error) {
            throw {code:"failedToFindUser", message: error.message}
        }
        
    }

   static async create(user){
        try {
            user.save()
        } catch (error) {
            throw{ code:"failedToCreateUser", message: error.message}
        }
    }
}

export default userDao;
=======
const User = require("../models/User");

class userDao{
   static async getByEmail(email){
        try {
            return User.findOne({email})    
        } catch (error) {
            throw {code:"failedToFindUser", message: error.message}
        }
        
    }

   static async create(user){
        try {
            user.save()
        } catch (error) {
            throw{ code:"failedToCreateUser", message: error.message}
        }
    }
}

module.exports = userDao
>>>>>>> 2b8748c (ServerFolder + connect backend login/register)
