const bcrypt = require("bcrypt")
const db = require("../db")
const { BCRYPT_WORK_FACTOR} = require("../config")
const {BadRequestError, UnauthorizedError} = require("../utils/errors")

class User {
    static async makePublicUser(user) {
        return {
            id: user.id,
            email: user.email,
            location: user.location,
            date: user.date,
            firstName: user.firstName,
            lastName: user.lastName
        }
    }
    static async login (credentials) {

        //user should submit email and pass
        //if anything missing throw error
        const requiredFields = ["email", "password"]
        requiredFields.forEach(field => {
            if (!credentials.hasOwnProperty(field)) {
                throw new BadRequestError(`missing ${field} in request body.`)
            }
        })

        const user = await User.fetchUserByEmail(credentials.email)

        //look up user in database
        //if user found, compare pass with db
        //if they === return user

        if (user) {
            const isValid = await bcrypt.compare(credentials.password, user.password)
            if (isValid) {
                return User.makePublicUser(user)
            }
        }

        //if anything wrong throw err
        throw new UnauthorizedError("Invalid Email/Password Combination")

    }
    static async register(credentials) {
        //user should submit their email, pass, locaiton, and date
        // if any fields are missing throw err
        const requiredFields = ["email", "password", "location", "date", "firstName", "lastName"]
        requiredFields.forEach(field => {
            if (!credentials.hasOwnProperty(field)) {
                throw new BadRequestError(`missing ${field} in request body.`)
            }
        })

        if (credentials.email.indexOf("@" )<= 0 ) {
            throw new BadRequestError("invalid email.")
        }

        //make sure no user already exists in the system with that email
        //if does, throw err
        const existingUser = await User.fetchUserByEmail(credentials.email)
        if (existingUser) {
            throw new BadRequestError(`Duplicate email: ${credentials.email}`)
        }
        //take the users pass and hash it
        const hashedPassword = await bcrypt.hash(credentials.password, BCRYPT_WORK_FACTOR)

        //take the users email, and lowercase it
        const lowercasedEmail = credentials.email.toLowerCase()
        //create a new user in the db with all info

        const result = await db.query(`
            INSERT INTO users (
                email,
                password,
                location,
                date,
                firstName,
                lastName
            )
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING id, email, location, date, firstName, lastName;
        `, [lowercasedEmail, hashedPassword, credentials.location, credentials.date,credentials.firstName, credentials.lastName])

        //return the user
        const user = result.rows[0]
        return  User.makePublicUser(user)


    }
    static async fetchUserByEmail(email) {
        if (!email) {
            throw new BadRequestError("No email provided")
        }
        const query = `SELECT * FROM users WHERE email = $1`

        const result = await db.query(query, [email.toLowerCase()])

        const user = result.rows[0]

        return user
    }
}

module.exports = User