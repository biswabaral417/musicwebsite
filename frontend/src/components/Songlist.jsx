import React, { useContext, useState, useEffect } from 'react';
import MusicContext from '../contexts/MusicContext';
import ChooseplaylistsModal from './ChooseplaylistsModal';
import CreatePlaylistModalFOrm from './CreatePlaylistModalFOrm';

const Songlist = ({ songs, plname }) => {
  // console.log(plname)
  const { thefavoritesfunc, songSrc, toggleSongsFrmq, queue, userPlaylists, playclickedsong, removeFromPlaylist, setQueue } = useContext(MusicContext);

  const [selectedSong, setSelectedSong] = useState(null);
  const [popupPosition, setPopupPosition] = useState({ top: 0, left: 0 });
  const [showPopup, setShowPopup] = useState(false);
  const [showPlaylists, setshowPlaylists] = useState(false);
  const [showCreatePlaylists, setshowCreatePlaylists] = useState(false);

  useEffect(() => {
    const containerRef = document.querySelector('.songlist-container').parentElement;

    const containerBottomRef = document.querySelector('.player-div')
    if (containerRef) {
      const handleContainerScroll = () => {
        const containerTop = containerRef.offsetTop;
        const containerBottom = containerBottomRef.offsetTop - 90

        if (selectedSong && showPopup) {
          const buttonRect = selectedSong.buttonRef.getBoundingClientRect();
          const newTop = (buttonRect.bottom);
          const finaltop = (Math.min(Math.max(containerTop, newTop), containerBottom))


          setPopupPosition({
            top: finaltop,
            left: buttonRect.right - 178,
          });
        }
      };
      containerRef.addEventListener('scroll', handleContainerScroll);
      handleContainerScroll();

      return () => {
        containerRef.removeEventListener('scroll', handleContainerScroll);
      };
    }
  }, [selectedSong, showPopup]);

  const handlePopupToggle = (event, song) => {
    event.stopPropagation();
    setSelectedSong({
      song,
      buttonRef: event.currentTarget,
    });
    setShowPopup(!showPopup);
  };

  const handleAddToPlaylistbtn = (e) => {
    if (plname) {
      removeFromPlaylist(selectedSong,plname)
    }
    else {
      setshowPlaylists(true);
    }
    if (!userPlaylists[0]) {
      setshowCreatePlaylists(true)
      setshowPlaylists(false)
    }
  };

  const handleAddToQueue = (item) => {
    console.log(item);
    toggleSongsFrmq(item);
    setShowPopup(false);
  };

  const handlePlayNext = () => {
    const newQueue = [queue[0], selectedSong.song, ...queue.slice(1)];
    setQueue(newQueue)//add at index 1
    setShowPopup(false);
  };

  return (
    <div className='songlist-container'>
      {showPlaylists && (
        <ChooseplaylistsModal setshowPlaylists={setshowPlaylists} userPlaylists={userPlaylists} songId={selectedSong.song._id} />
      )}
      {showCreatePlaylists && (
        <CreatePlaylistModalFOrm setshowCreatePlaylists={setshowCreatePlaylists} />
      )}

      {songs.map((item, i) => (
        <span onClick={() => { playclickedsong(item) }}
          key={item._id}
          className='d-flex justify-content-between align-items-center bg-dark bg-opacity-50 qi-btn'
        >
          <div className='d-flex'>
            <img className="thumbnail-img m-2" src={item.songAlbumImg} alt="" />
            <div className='m-1 p-1'>
              <h4>{item.songName}</h4>
              <h6>{item.songArtist}</h6>
            </div>
          </div>
          <div className='d-flex'>
            <button
              className='icon-btn mx-2'
              onClick={(e) => { e.stopPropagation(); thefavoritesfunc(item) }}
            >
              <img
                className="loveicon icons-img"
                src={songSrc[item._id]}
                alt=""
              />
            </button>
            <button
              className='icon-btn mx-2'
              onClick={(e) => handlePopupToggle(e, item)}
            >
              <img className='loveicon icons-img' id='options' src="../icons/three-dots-vertical.svg" alt="" />
            </button>
          </div>

        </span>
      ))}

      {showPopup && selectedSong && (
        <div
          className="popup position-absolute bg-dark bg-opacity-50 border"
          style={{ top: popupPosition.top, left: popupPosition.left }}
        >
          <button className='btn fs-6 bg-opacity-25 text-white container p-0 ' onClick={handleAddToPlaylistbtn}>{plname ? `remove from playlist` : `Add To Playlist`}</button>
          <button className='' onClick={() => setshowCreatePlaylists(true)}>create playlist &nbsp;&nbsp;&nbsp;&nbsp;+</button>

          <button className='btn fs-6 bg-opacity-25 text-white container border rounded-0 p-0' onClick={() => handleAddToQueue(selectedSong.song)}>{(queue.some(song => song._id === selectedSong.song._id)) ? "Remove from queue" : "Add to queue"}</button>
          <button className='btn bg-opacity-25 text-white container p-0' onClick={handlePlayNext}>Play Next</button>
        </div>
      )}

    </div>
  );
};

export default Songlist;
