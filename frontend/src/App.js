import './App.css';
import { Routes, Route } from 'react-router-dom'
import Home from './components/Home';
import Navbar from './components/Navbar';
import Favorites from './components/Favorites';
import Player from './components/Player';
import Playlist from './components/Playlist';
import Allsongs from './components/Allsongs';
import Login from './components/Login';
import Signup from './components/Signup';
import AdminRegister from './components/admin/AdminRegister';
import AdminPanelhome from './components/admin/AdminPanelhome';
import { useContext } from 'react';
import MusicContext from './contexts/MusicContext';


// let userIsadmin = true

function App() {
  const { userIsadmin } = useContext(MusicContext)
  return (
    <>

      <div className='d-flex main flex-wrap bgachish'>
        {
          // userIsadmin?<p>pnav</p>:
          (!userIsadmin) &&
          <Navbar />
        }

        <div className='container'>
          <Routes>
            <Route path='/' element={<Home/>} />
            <Route path='/favorites' element={<Favorites />} />
            <Route path='/playlist' element={<Playlist />} />
            <Route path='/allsongs' element={<Allsongs />} />
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/admins/register' element={<AdminRegister />} />
            <Route path='/admins' element={<AdminPanelhome />} />
          </Routes>
        </div>

      </div>

      {
        (!userIsadmin) &&

        <Player />
      }


    </>
  );
}

export default App;
