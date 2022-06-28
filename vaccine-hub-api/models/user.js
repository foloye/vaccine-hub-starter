const {UnauthorizedError} = require("../utils/errors")

class User {
    static async login (credentials) {

        //user should submit email and pass
        //if anything missing throw error
        //look up user in database
        //if user found, compare pass with db
        //if they === return user
        //if anything wrong throw err
        throw new UnauthorizedError("Invalid Email/Password Combination")

    }
    static async register(credentials) {
        //user should submit their email, pass, locaiton, and date
        // if any fields are missing throw err

        //make sure no user already exists in the system with that email
        //if does, throw err

        //take the users pass and hash it
        //take the users email, and lowercase it

        //create a new user in the db with all info
        //return the user

    }
}

module.exports = User