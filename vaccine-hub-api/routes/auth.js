const exprees = require("express")
const router = express.Router()

router.post("/login", async (req, res, next) => {
    try {
        //take the users email and password and attempting to authenticate this
    } catch (err) {
        next(err)
    }
})

router.post("/register", async (req, res, next) => {
    try {
        //take the users email, pass, date, and location
        //and create new user in database
    } catch (err) {
        next(err)
    }
})
module.exports = router