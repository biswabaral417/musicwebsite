import { useNavigate } from "react-router-dom";
import MusicContext from "./MusicContext";
import { useState, useEffect } from "react";
import useAllSongsData from "./useAllSongsData";
import usePlaylist from "./usePlaylist";
import useAdminFunctions from "./useAdminFunctions";

const MusicState = (props) => {
    const [userIsadmin, setuserIsadmin] = useState(false);
    const navigate = useNavigate();
    const { songsData, favorites, songSrc, setSongSrc, setFavorites, userPlaylists } = useAllSongsData();
    const { removeFromPlaylist } = usePlaylist()

    const [logBtntxt, setLogbtnTxt] = useState("Login");
    const [userEmail, setUserEmail] = useState("");
    const [userPassword, setUserPassword] = useState("");

    const PostData_Login = async (e) => {
        e.preventDefault();
        const res = await fetch("/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ userEmail, userPassword }),
        });
        const data = await res.json();
        if (res.status === 422 || !data) {
            window.alert(data.error);
        } else if (res.status === 201) {
            setLogbtnTxt("Log out");
            navigate("/");
            window.alert(data.sucess);
            console.log(data);
            setUserlogInfo(true);
            window.location.reload()
        } else {
            window.alert("connection error");
        }
    };

    const [userlogInfo, setUserlogInfo] = useState(false);

    const getUserInfo = async () => {
        try {
            const res = await fetch("/api/logs", {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                credentials: "include",
            });
            const data = await res.json();
            if (!(res.status === 200)) {
                const error = new Error(res.error);
                throw error;
            } else {
                console.log(data)
                if (data.isAdmin) {
                    console.log(data)
                    setuserIsadmin(true)
                    setUserlogInfo(true);
                    setLogbtnTxt("Logout");
                }
                else if (data.message) {
                    console.log(data)
                    setUserlogInfo(true);
                    setLogbtnTxt("Logout");
                }
            }

        } catch (error) { }
    };

    useEffect(() => {
        getUserInfo();
    }, []);

    const logout = async () => {
        const res = await fetch("/logout", {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            credentials: "include",
        });
        const data = await res.json();
        if (res.status === 422 || !data) {
            window.alert(data.error);
        } else if (res.status === 200) {
            window.alert(data.sucess);
            setLogbtnTxt("Login");
            setUserlogInfo(false);
            window.location.reload()
        } else {
            window.alert("connection error");
        }
    };

    const [searchQuery, setSearchQuery] = useState("");

    const [queue, setQueue] = useState([]);
    const [lastAddedIndex, setLastAddedIndex] = useState(-1);

    useEffect(() => {
        if (queue.length === 0 && songsData.length > 5) {
            const remainingSongs = songsData.slice(5);
            setQueue(remainingSongs.slice(0, 5));
        } else if (queue.length === 1 && songsData.length > 5) {
            const newSongsToAdd = songsData.slice(lastAddedIndex + 1, lastAddedIndex + 5);
            setQueue((prevQueue) => [...prevQueue, ...newSongsToAdd]);
            setLastAddedIndex(lastAddedIndex + 4);
        }
    }, [queue.length, songsData, lastAddedIndex]);


    const addToqueuePlaylist = (qSongs) => {
        setQueue(qSongs);
        const music = document.querySelector('audio')
        music.load()
        setTimeout(() => {

            music.play()
            document.querySelector('.ppicon').setAttribute("src", "./icons/pause-fill.svg")
        }, 500);
        navigate('/');
    }

    const toggleSongsFrmq = (aSong) => {
        const songIndex = queue.findIndex(song => song._id === aSong._id);

        if (songIndex !== -1) {
            const updatedQueue = [...queue];
            updatedQueue.splice(songIndex, 1);
            setQueue(updatedQueue);
        } else {
            setQueue(prevQueue => [...prevQueue, aSong]);
        }

    };


    const thefavoritesfunc = async (item) => {



        try {
            const isFavorite = favorites.some((song) => song._id === item._id);

            let res;
            if (isFavorite) {
                res = await fetch("/api/removefavorite", {
                    method: "post",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                    },
                    credentials: "include",
                    body: JSON.stringify(item),
                });
            } else {
                res = await fetch("/api/addfavorite", {
                    method: "post",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                    },
                    credentials: "include",
                    body: JSON.stringify(item),
                });
            }

            if (res.status === 200) {
                const updatedSongSrc = { ...songSrc };
                if (isFavorite) {
                    updatedSongSrc[item._id] = './icons/heart.svg';
                    setFavorites((prevFavorites) =>
                        prevFavorites.filter((song) => song._id !== item._id)
                    );
                } else {
                    updatedSongSrc[item._id] = './icons/heart-fill.svg';
                    setFavorites((prevFavorites) => [...prevFavorites, item]);
                }
                setSongSrc(updatedSongSrc);
            } else if (res.status === 401) {
                navigate("/login");
            } else {
                window.alert("Connection error");
            }
        } catch (error) {
            console.error(error);
            window.alert("Error while updating favorites");
        }
    };

    const addToPlaylist = async (playlistId, songId) => {
        // console.log(songId)
        try {
            const res = await fetch("/api/addsongtoplaylist", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ playlistId, songId }),
                credentials: "include",
            });

            if (res.status === 200) {
                // Handle success, update the playlist data or show a message
                console.log("Song added to playlist");
            } else if (res.status === 401) {
                navigate("/login");
            } else {
                window.alert("Connection error");
            }
        } catch (error) {
            console.error(error);
            window.alert("Error while adding song to playlist");
        }
    };


    //play song function 
    const playclickedsong = (item) => {
        // Event.stopPropagation()
        // console.log(e)
        console.log(item)
        setQueue([item, ...queue]) //at index 0 push item
        document.querySelector('audio').load()
        setTimeout(() => {
            document.querySelector('.ppicon').setAttribute("src", "./icons/pause-fill.svg")
            document.querySelector('audio').play()
        }, 300);

    }


    const { openaddSongsModal, setAddSongsModal,openRemoveSongsModal,setRemoveSongsModal } = useAdminFunctions();




    // //
    // const removeFromPlaylist=async (selectedSong,plname)=>{
    // console.log(plname)
    // }





    const MusicState = {
        playclickedsong,
        searchQuery,
        setSearchQuery,
        songsData,
        logBtntxt,
        userlogInfo,
        logout,
        getUserInfo,
        setLogbtnTxt,
        setUserEmail,
        setUserPassword,
        PostData_Login,
        queue,
        setQueue,
        thefavoritesfunc,
        songSrc,
        setSongSrc,
        favorites,
        addToqueuePlaylist,
        toggleSongsFrmq,
        userPlaylists,
        addToPlaylist,
        removeFromPlaylist,
        userIsadmin,
        openaddSongsModal,
        setAddSongsModal,
        openRemoveSongsModal,
        setRemoveSongsModal


    };

    return (
        <MusicContext.Provider value={MusicState}>
            {props.children}
        </MusicContext.Provider>
    );
};

export default MusicState;
