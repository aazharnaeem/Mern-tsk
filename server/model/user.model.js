const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const Schema = mongoose.Schema;


const userSchema = Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    stripeCustomerId:{
        type:String,
        required:true
    }
});


userSchema.pre('save', async function (next) {
    const user = this;
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }
    next();
});

userSchema.statics.validatePassword = async function (password, userPassword) {
    const validate = await bcrypt.compare(password, userPassword)
    return validate
};

userSchema.statics.isEmailTaken = async function (email, userId) {
    const user = await this.findOne({ email, _id: { $ne: userId } });
    return !!user
};

userSchema.statics.doesUserExists = async function (userId) {
    const user = await this.findById(userId);
    return !!user
};


const user = mongoose.model('user', userSchema);

module.exports = user