import React, { useContext } from 'react';
import Songlist from './Songlist';
import MusicContext from '../contexts/MusicContext';
// import playlists from './playlistsLIst.json';

export default function Playlist() {
  const { userPlaylists, addToqueuePlaylist } = useContext(MusicContext)
  // console.log(userPlaylists)
  const numberToWord = [
    "one", "two", "three", "four", "five",
    "six", "seven", "eight", "nine", "ten", "eleven",
    "twelve", "thirteen", "fourteen", "fifteen", "sixteen",
    "seventeen", "eighteen", "nineteen", "twenty", // Up to 20
    "twentyone", "twentytwo", "twentythree", "twentyfour", "twentyfive",
    "twentysix", "twentyseven", "twentyeight", "twentynine", "thirty",
    "thirtyone", "thirtytwo", "thirtythree", "thirtyfour", "thirtyfive",
    "thirtysix", "thirtyseven", "thirtyeight", "thirtynine", "forty",
    "fortyone", "fortytwo", "fortythree", "fortyfour", "fortyfive",
    "fortysix", "fortyseven", "fortyeight", "fortynine", "fifty"
  ];

  const a = {};

  // Create the object with keys from 1 to 50 and corresponding word values
  for (let i = 0; i <= 50; i++) {
    a[i] = numberToWord[i] || `${i}`;
  }
  const removePlaylist = async (item) => {
    const res = await fetch('/api/removeplaylist', {
      method: 'POST',
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(item)
    })
    const data = res.json();
    if (res.status === 200) {
      window.alert(data.message)
    } else {
      window.alert(data.error)
    }

  }

  return (
    <div>
      <div className='allsongs-container queue-container bg-dark bg-opacity-25'>
        <div className='px-5 container  position-absolute z-3 bg-dark bg-opacity-75 wid d-flex justify-content-between'>
          <p className='text-white fs-3'>playlists </p></div>

        <div className="accordion py-m border-0 bg-dark bg-opacity-25" id="accordionExample">

          {userPlaylists.map((item, i) => (
            <div key={`up${item._id}`} className="accordion-item text-white border-0 bg-dark bg-opacity-25">
              <h2 className="accordion-header d-flex border border-start-0 border-end-0">
                <button className="accordion-button bg-dark bg-opacity-25 text-white border-bottom-0" type="button" data-bs-toggle="collapse" data-bs-target={`#collapse${a[i]}`} aria-expanded="true" aria-controls={`collapse${a[i]}`} >
                  {item.playlistName}
                </button>
                <button className='btn'> <img src="./icons/play-fill.svg" className='icons-img pqicon' onClick={() => addToqueuePlaylist(item.songs)} alt="" /></button>
                <button className='icon-btn mx-2' ><img className='loveicon icons-img' src="../icons/three-dots-vertical.svg" alt="" onClick={() => removePlaylist(item)} /></button>

              </h2>
              <div id={`collapse${a[i]}`} className="accordion-collapse collapse show" data-bs-parent="#accordionExample" >
                <Songlist songs={item.songs} plname={item} />
                {/* {console.log(item.songs[0])}  */}
              </div>
            </div>
          ))}

          <div className="accordion-item border-0 set-height bg-dark bg-opacity-50">
            {/* Content for this item */}
          </div>
        </div>
      </div>
    </div>
  );
}
