// import {useState} from 'react'

function usePlaylist() {

    const removeFromPlaylist = async(selectedSong,plname) => {
        
        // console.log("a")
        const res=await fetch('/api/removesongfromplaylist', {
            method:'POST',
            headers:{
                Accept:"application/json",
                "Content-Type": "application/json",
            },
            credentials:"include",
            body:JSON.stringify({songId:selectedSong.song._id,playlistId:plname._id})
        });
        const data=await res.json()
        console.log(data)
        window.alert(data)
        
        // console.log(res.json())
        // const PostData_Login = async (e) => {
        //     e.preventDefault();
        //     const res = await fetch("/login", {
        //         method: "POST",
        //         headers: {
        //         },
        //         body: JSON.stringify({ userEmail, userPassword }),
        //     });



    }



    return {

        removeFromPlaylist
    }

    
}

export default usePlaylist
