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