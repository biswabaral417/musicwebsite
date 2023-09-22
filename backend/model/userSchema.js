const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')


const songSchema = new mongoose.Schema({
    song: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'musics', // Reference the 'musics' model
        required: true
    }
});


const playlistSchema = new mongoose.Schema({
    playlistName: {
        type: String,
        required: true
    },
    songs: [songSchema] // Array of songs using the songSchema
});

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true
    },
    userPhone: {
        type: Number,
        required: true
    },
    userEmail: {
        type: String,
        required: true
    },
    userPassword: {
        type: String,
        required: true
    },
    tokens: [
        {
            token: {
                type: String,
                required: false
            }
        }
    ],
    playlists: [playlistSchema],
    favoriteSongs: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'musics'
        }
    ],
});



userSchema.pre('save', async function (next) {
    try {
        if (this.isModified('userPassword')) {
            console.log("bcrypt");
            this.userPassword = await bcrypt.hash(this.userPassword, 12);
        }
        next();
    } catch (error) {
        console.log(error);
        next(error);
    }
});


//generating auth token
userSchema.methods.generateAuthtoken = async function () {
    try {
        let token = jwt.sign({ _id: this._id }, process.env.SECRET_KEY);
        this.tokens = this.tokens.concat({ token: token });
        await this.save()
        return token;
    } catch (error) {
        console.log(error)

    }
}


const UserData = mongoose.model('UserData', userSchema);

module.exports = UserData;
