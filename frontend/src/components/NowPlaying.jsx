import React from 'react'
import MusicContext from '../contexts/MusicContext'
import { useContext } from 'react'

export default function NowPlaying({item}) {
    const {songSrc,thefavoritesfunc}=useContext(MusicContext)
    return (
        <div className='d-flex align-items-center np-div'>
            <img className="thumbnail-img m-2" src={item.songAlbumImg} alt="" />
            <div className='mx-1'>
                <h4>{item.songName}</h4>
                <h6>{item.songArtist}</h6>
            </div>
            <button className='icon-btn mx-2' onClick={(e) => {e.stopPropagation(); thefavoritesfunc(item)}}><img className='loveicon icons-img' src={songSrc[item._id]} alt="" /></button>
        </div>
    )
}
