require('dotenv').config()
const mongoose = require("mongoose");
const validator = require("validator");
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const { Schema } = mongoose;

const registrationSchema = new Schema({
    email: {
        type: String,
        required: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Email validation failed")
            }
        }
    },
    password: {
        type: String,
        required: true
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]



});

// genrating a web token
registrationSchema.methods.generateAuthToken = async function () {
    try {
        const genratedToken = jwt.sign({ _id: this._id }, process.env.SECRETE_KEY);
        this.tokens = this.tokens.concat({ token: genratedToken });
        await this.save();
        return genratedToken;
    } catch (error) {
        console.log(error);
    }
}

// Hashing the password
registrationSchema.pre("save", async function (next) {
    try {
        if (this.isModified("password")) {
            this.password = await bcrypt.hash(this.password, 8);
        }
    } catch (err) {
        console.log(err);
    }
    next();
})
const Register = mongoose.model("Register", registrationSchema);

module.exports = Register;
