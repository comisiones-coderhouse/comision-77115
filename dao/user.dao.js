import userModel from "../models/user.model.js"

class UserDAO {

    static async createUser(email, password) {
        return await userModel.create({ email, password })
    }

}

export default UserDAO