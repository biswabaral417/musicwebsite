import React, { useContext } from 'react'
import MusicContext from '../contexts/MusicContext'

export default function ChooseplaylistsModal({setshowPlaylists,songId,userPlaylists}) {
  const {addToPlaylist}=useContext(MusicContext)
 
  return (
    <>
    <div className='modal-Wrapper' onClick={()=>setshowPlaylists(false)}></div>
    <div className='modal-Container'>
        {
            userPlaylists.map(item=>(
              <div key={`c${item._id}`}>
                <button onClick={()=>(addToPlaylist(item,songId))} key={item._id}>{item.playlistName}</button>
              </div>
            ))
        }
    </div>
    </>
  )
}
