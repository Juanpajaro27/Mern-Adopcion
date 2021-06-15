const mongoose = require('mongoose')
const { v1: uuidv1} = require('uuid')
const crypto = require('crypto')

/* 
Nombre, Email, Contraseña, Inventario, Rol, Date
*/
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true, 
        maxlength: 12,
        unique: true
    },
    email: {
        type: String,
        trim: true,
        require: true,
        unique: true
    },
    hashed_password: {
        type: String,
        require: true
    },    
    salt: String,
    role: { 
        type: Number,
        default: 0
    },
    inventory: {
        type: Array,
        default: []
    }
}, {timestamps: true})


userSchema.virtual('password')
.set(function(password) {
    this._password = password
    this.salt = uuidv1()
    this.hashed_password = this.encryptPassword(password)
})
.get(function() {
    return this._password
})

userSchema.methods = {
    authenticate: function(plainText) {
        return this.encryptPassword(plainText) === this.hashed_password
    },
    encryptPassword: function(password) {
        if(!password) return ''

        try{
            return crypto.createHmac('sha1', this.salt)
            .update(password)
            .digest('hex')
        } catch(err) {
            return ""
        }
    }
}

module.exports = mongoose.model('User', userSchema)