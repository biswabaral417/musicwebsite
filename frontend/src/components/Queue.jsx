import React, { useContext} from 'react'
// import q from './q.json'
import MusicContext from '../contexts/MusicContext'
import Songlist from './Songlist'

export default function Queue() {
  const { queue } = useContext(MusicContext)
  

  return (
    <div className='queue-container _top'>
      <div className='px-4 container text-white fs-3 position-absolute bg-dark bg-opacity-75 wid'>
        in the queue
      </div>
      <div className='py-m bg-dark bg-opacity-75'></div>
      <Songlist songs={queue} />
      <div className='d-flex justify-content-between qi-btn bg-dark bg-opacity-10 set-height'>

      </div>
    </div >
  )
}
