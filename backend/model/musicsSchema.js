const mongoose=require('mongoose')


const musicsSchema=new mongoose.Schema({
    songName: {
        type:String,
        require:true
    },
    songAudioLoc:{
        type:String,
        require:true 
    },
    songAlbum:{
        type:String,
        require:true 
    },
    songAlbumImg:{
        type:String,
        require:true 
    }

});
const musics=mongoose.model('musics',musicsSchema);


module.exports= musics;