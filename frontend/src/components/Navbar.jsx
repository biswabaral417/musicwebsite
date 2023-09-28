import React from 'react'
import { NavLink } from 'react-router-dom'
import { useContext } from 'react';
import MusicContext from '../contexts/MusicContext'
import { useNavigate } from 'react-router-dom';

export default function Navbar(props) {
  const { searchQuery, setSearchQuery, logBtntxt, userlogInfo, logout } = useContext(MusicContext);
  const navigate = useNavigate();
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };
  const handleButtonClick = () => {
    if (userlogInfo) {
      logout()
    } else {
      navigate('/login');
    }
  };
  return (
    <>
      <nav className="navbar navbar-expand-sm text-white bg-dark bg-opacity-50 border">
        <div className="container-fluid">
          <NavLink className="navbar-brand text-whtite fs-2" to="#">Navbar</NavLink>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink className="nav-link active text-white fs-4" aria-current="page" to="/">Home</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link text-white fs-4" to="/playlist">My Playlists</NavLink>
              </li>

              <li className="nav-item ">
                <NavLink className="nav-link text-white fs-4" to="/favorites">My Favorites</NavLink>
              </li>
              <li className="nav-item ">
                <NavLink className="nav-link text-white fs-4" to="/allsongs">All songs</NavLink>
              </li>

            </ul>
            <NavLink to="/allsongs">
              <form className="d-flex" role="search">
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  value={searchQuery}
                  onChange={handleSearch}
                />              </form>
            </NavLink>
            <button className="btn btn-warning my-3" onClick={() => handleButtonClick()} type="btn">{logBtntxt}</button>
          </div>
        </div>
      </nav>
    </>
  )
}
