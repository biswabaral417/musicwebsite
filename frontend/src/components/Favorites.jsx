import React, { useContext } from 'react'
import Songlist from './Songlist'
import MusicContext from '../contexts/MusicContext'
export default function Favorites() {
  const {favorites,addToqueuePlaylist}=useContext(MusicContext)

  return (

    <div className='queue-container allsongs-container'>
      <div className='px-4 container text-white z-3 position-absolute bg-dark wid d-flex justify-content-between'>
        <h3 className='fs-3'>  
        favorites
        </h3>
        <button className='bg-dark border-0 p-0' onClick={()=>addToqueuePlaylist(favorites)}><img src="./icons/play-fill.svg" className='icons-img pqicon' alt="" /></button>
      </div>
      <div className='py-m bg-dark bg-opacity-25'></div>
      <Songlist songs={favorites} />
      <div className='d-flex justify-content-between qi-btn bg-dark bg-opacity-50 set-height'>

      </div>
    </div >

  )
}
