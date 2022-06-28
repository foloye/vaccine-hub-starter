const bcrypt = require("bcrypt")

const pw ="1234"

bcrypt.hash(pw, 6, (err, hashedPw) => {
    console.log(`Password is ${pw}`)
    console.log(`Hashed password is ${hashedPw}`)
})