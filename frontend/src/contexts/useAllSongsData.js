import { useState, useEffect } from "react";

function useAllSongsData() {
  const [songsData, setSongsData] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [songSrc, setSongSrc] = useState({});
  const [userFavoriteSongIds, setUserFavoriteSongIds] = useState([]);
  const [userPlaylists, setUserPlaylists] = useState([]);

  const fetchUserPlaylists = async () => {
    try {
      const response = await fetch("/api/playlists", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      // console.log("res"+response.status)
      if (response.status !== 200) {
        console.error("Error fetching user playlists");
        return [];
      } else {
        const playlists = await response.json();
        // console.log(playlists)
        return playlists;
      }
    } catch (error) {
      console.error(error);
      return [];
    }
  };


  const fetchAllSongs = async () => {
    try {
      const response = await fetch("/api/allsongs", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        const songs = await response.json();
        return songs;
      } else {
        console.error("Error fetching all songs");
        return [];
      }
    } catch (error) {
      console.error(error);
      return [];
    }
  };

  const fetchUserFavorites = async () => {
    try {
      const response = await fetch("/api/getuserfavorites", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (response.status === 200) {
        const userData = await response.json();
        return userData.favoriteSongs;
      } else {
        console.log("Error fetching user favorites");
        return [];
      }
    } catch (error) {
      console.error(error);
      return [];
    }
  };



  useEffect(() => {
    async function fetchData() {
      try {
        const [songsData, userFavoriteSongIds, userPlaylists] = await Promise.all([
          fetchAllSongs(),
          fetchUserFavorites(),
          fetchUserPlaylists()
        ]);

        const favoriteSongsMap = {};
        userFavoriteSongIds.forEach((songId) => {
          favoriteSongsMap[songId] = true;
        });

        const songsWithFavorites = songsData.map((song) => ({
          ...song,
          isfavorite: favoriteSongsMap[song._id] || false,
        }));

        setSongsData(songsWithFavorites);

        const initialSongSrc = {};
        songsWithFavorites.forEach((song) => {
          initialSongSrc[song._id] = song.isfavorite
            ? "./icons/heart-fill.svg"
            : "./icons/heart.svg";
        });

        setSongSrc(initialSongSrc);
        setUserFavoriteSongIds(userFavoriteSongIds);
        const favoriteSongs = songsWithFavorites.filter((song) =>
          userFavoriteSongIds.includes(song._id)
        );
        setFavorites(favoriteSongs);
        setUserPlaylists(userPlaylists);
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, []);


  return { songsData, favorites, songSrc, setSongSrc, userFavoriteSongIds, setFavorites, userPlaylists };
}

export default useAllSongsData;
