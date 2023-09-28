const express = require('express');
const router = express.Router();
const musics = require('../model/musicsSchema');
const User = require('../model/userSchema');
const authenticate = require('../middleware/authenticate');

router.get('/api/allsongs', async (req, res) => {
    try {
        const allMusics = await musics.find();
        res.status(200).send(allMusics);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.get('/api/playlists', authenticate, async (req, res) => {
    if (req.rootUser) {
        const populatedUser = await User.findById(req.rootUser._id).populate({ path: 'playlists', populate: { path: 'songs' } })
        console.log(populatedUser.playlists)
        res.status(200).json(populatedUser.playlists);
    } else {
        res.status(401).send(false);
    }
});

router.post('/api/addfavorite', authenticate, async (req, res) => {
    const { _id } = req.body;
    try {

        const user = req.rootUser;
        console.log(req.body)
        const isSongInFavorites = user.favoriteSongs.some(favoriteId => favoriteId && favoriteId.toString() === _id);
        if (!isSongInFavorites) {
            // console.log(req.body
            user.favoriteSongs.push(_id);
            await user.save();
            res.status(200).json({ message: 'Song added to favorites' });

        } else {
            res.status(400).json({ message: 'Song already in favorites' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.post('/api/removefavorite', authenticate, async (req, res) => {
    const { _id } = req.body;

    try {
        const user = req.rootUser;
        user.favoriteSongs = user.favoriteSongs.filter(id => id.toString() !== _id);
        await user.save();
        res.status(200).json({ message: 'Song removed from favorites' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.get('/api/getuserfavorites', authenticate, async (req, res) => {
    try {
        const user = req.rootUser;
        res.status(200).json({ favoriteSongs: user.favoriteSongs });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// router.get('/api/playlists', authenticate, async (req, res) => {
//     if (req.rootUser) {
//         res.status(200).json(req.rootUser.playlists);
//     } else {
//         res.status(401).send(false);
//     }
// });

router.post('/api/createplaylist', authenticate, async (req, res) => {
    const { playlistName } = req.body;
    console.log(req.body)
    try {
        const user = req.rootUser;
        const playlist = { playlistName, songs: [] };
        user.playlists.push(playlist);
        let adedplaylist = await user.save();
        if (adedplaylist) {
            res.status(200).json({ success: 'Playlist created successfully' });
        }
        else {
            res.status(500).json({ error: "internal server error" })
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.post('/api/addsongtoplaylist', authenticate, async (req, res) => {
    const { playlistId, songId } = req.body;

    try {
        const user = req.rootUser;
        const playlist = user.playlists.id(playlistId);
        if (playlist) {
            const _id = await musics.findById(songId)
            console.log(_id)
            playlist.songs.push(_id);
            await user.save();
            res.status(200).json({ message: 'Song added to playlist' });
        } else {
            res.status(400).json({ message: 'Playlist not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.post('/api/removesongfromplaylist', authenticate, async (req, res) => {
    const { playlistId, songId } = req.body;

    try {
        const user = await User.findById(req.rootUser._id);
        const playlist = user.playlists.id(playlistId);

        if (playlist) {
            // Use filter() to remove the song with a matching _id
            playlist.songs = playlist.songs.filter(song => song.toString() !== songId);
            await user.save();
            res.status(200).json({ message: 'Song removed from playlist' });
        } else {
            res.status(400).json({ message: 'Playlist not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.post('/api/removeplaylist', authenticate, async (req, res) => {
    const { _id } = req.body;
    console.log(_id)

    console.log("Hello")
    try {
        const user = req.rootUser;


        // Find the index of the playlist to remove
        const playlistIndex = user.playlists.findIndex(p => p._id.toString() === _id);
        console.log(playlistIndex)

        if (playlistIndex !== -1) {
            // Remove the playlist from the user's playlists array
            user.playlists.splice(playlistIndex, 1);

            const saved = await user.save();
            if (saved) {
                res.status(200).json({ message: 'Playlist removed' });
            } else {
                res.status(500).json({ error: 'Internal server error' });
            }
        } else {
            res.status(404).json({ error: 'Playlist not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.post('/fn/deleteSong', authenticate, async (req, res) => {
    console.log(req.body.id)
    if (req.rootUser.isAdmin) {
        try {

            const RemoveItem = await musics.findOneAndDelete({ _id: req.body.id })
            if (RemoveItem) {
                console.log(RemoveItem)
                return res.status(200).json({ success: "modified successfullly" })
            }
            else {
                return res.status(500).json({ error: "internal server error" })
            }
        } catch (error) {
            console.log(error)
            return res.status(500).json({ error: "internal server error" })

        }

    } else {
        return res.status(403).json({ error: "unauthorized" })

    }
})



const isAdmin = (req, res, next) => {
    if (req.rootUser.isAdmin) {

        next();
    } else {
        return res.status(404).json({ error: "unauthorized user" })
    }
}

router.post('/api/admins/modifySongsdata', authenticate, isAdmin, async (req, res) => {

    const { songName, songAudioLoc, songAlbum, songAlbumImg,songGenre,songArtist } = req.body.inputSongs;
    console.log(songName)

    try {
        if (songName) {

            const existingItem = await musics.findOne({ songName: songName });

            if (existingItem) {


                if (songAlbumImg !== 'undefined' && songAlbumImg !== "" && songAlbumImg === null) {
                    existingItem.songAlbumImg = songAlbumImg;
                }


                if (songAudioLoc !== 'undefined' && songAudioLoc !== "" && songAudioLoc === null) {
                    existingItem.songAudioLoc = songAudioLoc;
                }


                if (songAlbum !== 'undefined' && songAlbum !== 0 && songAlbum === null) {
                    existingItem.songAlbum = songAlbum;
                }
                if (songGenre !== 'undefined' && songGenre !== 0 && songGenre === null) {
                    existingItem.songGenre = songAlbum;
                }
                if (songArtist !== 'undefined' && songArtist !== 0 && songArtist === null) {
                    existingItem.songArtist = songAlbum;
                }

                const eitemSaved = await existingItem.save();

                if (eitemSaved) {

                    return res.status(200).json({ success: "Modified successfully" });
                } else {

                    return res.status(500).json({ failed: "Internal server error" });
                }
            }
            else {
                // console.log("")

                if (songName && songAlbumImg && songAudioLoc && songAlbum&&songArtist&&songArtist&&songGenre) {

                    const song = new musics({songName :songName, songAlbumImg :songAlbumImg, songAudioLoc :songAudioLoc, songAlbum:songAlbum,songArtist:songArtist,songGenre:songGenre });

                    const songSaved = await song.save();

                    if (songSaved) {
                        return res.status(200).json({ success: "song saved successfully" });
                    } else {
                        return res.status(500).json({ failed: "Internal server error" });
                    }
                }
                else {

                    res.status(422).json({ error: "unprocessable request provided" })
                }
            }
        }
        else {

            res.status(422).json({ error: "unprocessable request provided" })
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ failed: "Internal server error" });
    }
});





module.exports = router;
