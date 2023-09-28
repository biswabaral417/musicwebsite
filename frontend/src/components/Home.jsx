import React, { useContext } from 'react';
import Queue from './Queue';
import MusicContext from '../contexts/MusicContext';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export default function Home() {
  const { songsData,userIsadmin } = useContext(MusicContext);

  const navigate = useNavigate();
// console.log(userIsadmin)
  useEffect(() => {
    if (userIsadmin) {
      navigate('/admins');
    }
  }, [userIsadmin, navigate]);

  if (!Array.isArray(songsData)) {
    return <p>Loading...</p>;
  }



  return (
    <div className='contain'>
      <div className="songs-container">
        <div className="songs-list">
          <h1>Songs</h1>
          <div className="song-scroll-container">
            <div className="song-list-inner">
              {songsData.map((songData, index) => (
                <button key={index} className='rounded bg-dark bg-opacity-50 text-light'>
                  <div className="song-container wid">
                    <img className='alb-img' src={songData.songAlbumImg} alt={`Album ${songData.songAlbum}`} />
                    <div>
                      <p>{songData.songName}</p>
                      <p>{songData.songGenre}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Queue />
    </div>
  );
}
