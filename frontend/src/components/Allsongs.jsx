import React, { useContext } from 'react';
import Songlist from './Songlist';
import MusicContext from '../contexts/MusicContext';

export default function Allsongs() {
    const { searchQuery, songsData } = useContext(MusicContext);

    // Check if songsData is an array before filtering
    if (!Array.isArray(songsData)) {
        // You might want to render a loading message or handle the situation accordingly
        return <p>Loading...</p>;
    }

    const filteredSongs = songsData.filter((song) =>
        song.songName && song.songName.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className='queue-container allsongs-container'>
            <div className='px-5 container text-white fs-3 position-absolute bg-dark bg-opacity-75 wid'>
                All songs
            </div>
            <div className='my-3 py-3 bg-dark bg-opacity-10'></div>
            <Songlist songs={filteredSongs} />
            <div className='d-flex justify-content-between qi-btn bg-dark bg-opacity-50 set-height'>
            </div>
        </div>
    );
}
