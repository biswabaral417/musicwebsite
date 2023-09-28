import { useContext, useState } from 'react';
import React from 'react'
import MusicContext from '../../contexts/MusicContext';

export default function AddsongsModal() {

    const { setAddSongsModal } = useContext(MusicContext)
    const [inputSongs, setInputsSongs] = useState({ songName: "", songImgLoc: "",songAlbum: "", songAudioLoc: "",songGenre:"",songArtist:"",songAlbumImg:"" })
    let feildId;
    let feildVal;
    const stateupdateinputs = (e) => {
        feildId = e.target.id
        feildVal = e.target.value
        setInputsSongs({ ...inputSongs, [feildId]: feildVal })
        console.log(inputSongs)
    }

    const AddmodifySongs = async (inputSongs) => {
        try {
            const res = await fetch('/api/admins/modifySongsdata', {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ inputSongs })
            },
            )

            const data = await res.json()
            if (res.status !== 200) {
                window.alert(data.error)
            } else {
                window.alert(data.success)

            }

        } catch (error) {
            console.log(error)
        }
    }
    return (
        <>
            <div className='Modal-wrapper' onClick={() => setAddSongsModal(false)}></div>
            <div className='rounded Modal-container p-3'>
                <div className='m-2'>
                    <label className='label-width' htmlFor="songName">songName</label>
                    <input type="text" id='songName' placeholder='enter song name here' onChange={stateupdateinputs} value={inputSongs.songName} />

                </div>
                <div className='m-2'>
                    <label className='label-width' htmlFor="songArtist">songArtist</label>
                    <input type="text" id='songArtist' placeholder='artist name here' onChange={stateupdateinputs} value={inputSongs.songArtist} />

                </div>
                <div className='m-2'>
                    <label className='label-width' htmlFor="songAlbum">Album name</label>
                    <input type="text" id='songAlbum' placeholder='album name here' onChange={stateupdateinputs} value={inputSongs.songAlbum} />

                </div>
                <div className='m-2'>
                    <label className='label-width' htmlFor="songAlbumImg">song album location</label>
                    <input type="string" id='songAlbumImg' placeholder='enter image location in images folder' onChange={stateupdateinputs} value={inputSongs.songAlbumImg} />

                </div>
                <div className='m-2'>
                    <label className='label-width' htmlFor="songGenre">song genre</label>
                    <input type="string" id='songGenre' placeholder='enter song genre' onChange={stateupdateinputs} value={inputSongs.songGenre} />

                </div>
                <div className='m-2'>
                    <label className='label-width' htmlFor="songAudioLoc">image location</label>
                    <input type="string" id='songAudioLoc' placeholder='enter song Audio location' onChange={stateupdateinputs} value={inputSongs.songAudioLoc} />

                </div>
                <div className='d-flex'>
                    <button className='btn btn-danger m-2' onClick={() => { setAddSongsModal(false); AddmodifySongs(inputSongs) }} id='addfooditm'>add</button>
                </div>
            </div>
        </>
    )
}


