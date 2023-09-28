import React, { useContext, useState } from 'react'
import MusicContext from '../../contexts/MusicContext'
import AddsongsModal from './AddsongsModal'
import Removesong from './Removesong'
import { useNavigate } from 'react-router-dom'

export default function AdminPanelhome() {
  const [currentSong, setCurrentSong] = useState("")
  const { openaddSongsModal, setAddSongsModal, songsData, openRemoveSongsModal, setRemoveSongsModal, logout  } = useContext(MusicContext)
  console.log(songsData)
const navigate=useNavigate()
const handleLogout=()=>{
  logout();
  navigate('')
}


  return (
    <div>
      <button className='btn btn-primary my-5' onClick={handleLogout}>logout</button>
      {openaddSongsModal &&
        <AddsongsModal />
      }
      {openRemoveSongsModal &&
        <Removesong item={currentSong} setRemoveSongsModal={setRemoveSongsModal} />
      }

      <div className='d-flex flex-wrap'>
      <button onClick={() => setAddSongsModal(true)}>add songs</button>

        {
          songsData.map(song => (
            <div key={song._id}>
              <button className="btn btn-danger m-3" onClick={() => { setCurrentSong(song._id); setRemoveSongsModal(true) }} style={{width:"250px"}}>
                <p>{song.songName}</p>
                <p>{song.songArtist}</p>
                <p>byClicking on song remove song</p>
              </button>

            </div>
          ))

        }

      </div>
    </div >
  )
}
