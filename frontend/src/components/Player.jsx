import React, { useContext, useEffect } from 'react'
import NowPlaying from './NowPlaying'
import MusicContext from '../contexts/MusicContext'


export default function Player() {
  const { queue, setQueue } = useContext(MusicContext)

  useEffect(() => {
    const music = document.querySelector('audio')
    music.ontimeupdate = (e) => {
      document.querySelector('.progress').style.width = `${100 * (music.currentTime) / music.duration}%`


    }
    let progressBar = document.querySelector('.progressBar')
    progressBar.onclick = (e) => { music.currentTime = (e.offsetX / progressBar.offsetWidth) * music.duration; }
    let playPausebtn = document.querySelector('.play-pause');



    playPausebtn.onclick = () => {
      if (document.querySelector('.ppicon').getAttribute("src") === "./icons/play-fill.svg") {
        document.querySelector('.ppicon').setAttribute("src", "./icons/pause-fill.svg")
        music.play();
      }
      else {
        document.querySelector('.ppicon').setAttribute("src", "./icons/play-fill.svg")
        music.pause();
      }
    }

    let nextBtn = document.getElementById('next');
    let prevBtn = document.getElementById('prev');
    nextBtn.onclick = () => {
      const currentIndex = queue.findIndex(song => song.songAudioLoc === music.getAttribute("src"));
      if (currentIndex !== -1 && currentIndex < queue.length) {
        const newQueue = queue.slice(currentIndex + 1);
        music.src = newQueue[0].songAudioLoc;
        setQueue(newQueue);
        music.load();
        console.table(queue);
        setTimeout(() => {
          music.play()
          document.querySelector('.ppicon').setAttribute("src", "./icons/pause-fill.svg")
        }, 1000);

      }
    }


    prevBtn.onclick = () => {
      const currentIndex = queue.findIndex(song => song.songAudioLoc === music.src);
      if (currentIndex > 0) {
        setQueue(queue => queue.slice(0, currentIndex)); // Set the queue up to the previous song
      }
    }

  });




  return (
    <div className=' player-div bg-dark py-2 text-white d-flex flex-wrap'>
      <NowPlaying item={queue[0] ? queue[0] : ""} />
      <div className='d-flex justify-content-center container flex-wrap'>


        {/*controls*/}
        <div className=''>
          <div className='controls border'>
            {/* <button className='control-btn mini mx-2'><img src="./icons/arrow-clockwise.svg" className='icons-img' alt="" /></button> */}
            <button id='prev' className='control-btn next-prev mx-2'><img src="./icons/arrow-left-circle-fill.svg" className='icons-img' alt="" /></button>
            <button className='control-btn play-pause mx-4'><img src="./icons/play-fill.svg" className='icons-img ppicon' alt="" /></button>
            <button id='next' className='control-btn next-prev mx-2 '><img src="./icons/arrow-right-circle-fill.svg" className='icons-img' alt="" /></button>
            {/* <button className='control-btn mini mx-2'><img src="./icons/shuffle.svg" className='icons-img' alt="" /></button> */}
          </div>
        </div>



        <div className='progressBar rounded'>
          <div className='progress '></div>
        </div>
      </div>
      <audio src={queue[0]?.songAudioLoc}></audio>

    </div>
  )
}
