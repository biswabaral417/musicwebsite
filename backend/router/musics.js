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
        res.status(200).json(req.rootUser.playlists);
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






router.get('/api/playlists', authenticate, async (req, res) => {
    if (req.rootUser) {
        res.status(200).json(req.rootUser.playlists);
    } else {
        res.status(401).send(false);
    }
});

router.post('/api/createplaylist', authenticate, async (req, res) => {
    const { playlistName } = req.body;

    try {
        const user = req.rootUser;
        const playlist = { playlistName, songs: [] };
        user.playlists.push(playlist);
        await user.save();
        res.status(200).json({ message: 'Playlist created successfully' });
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
            playlist.songs.push({ song: songId });
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
        const user = req.rootUser;
        const playlist = user.playlists.id(playlistId);
        if (playlist) {
            playlist.songs = playlist.songs.filter(song => song.song.toString() !== songId);
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
    const { playlistId } = req.body;

    try {
        const user = req.rootUser;
        user.playlists.id(playlistId).remove();
        await user.save();
        res.status(200).json({ message: 'Playlist removed' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});




module.exports = router;
