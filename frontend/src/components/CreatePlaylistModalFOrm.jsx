import React, { useState } from 'react'

export default function CreatePlaylistModalFOrm({setshowCreatePlaylists}) {
    const [playlistName,setPlaylistname]=useState("");
    const CreatePlaylist=async()=>{
        const res= await fetch('/api/createplaylist',{
            method:"POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials:"include",
            body:JSON.stringify({"playlistName":playlistName})
        })
        const data=res.json()
        if (res.status!==200) {
            window.alert(data.error)
        } else {
            window.alert(data.success)  
        }
    }

    return (
        <>
            <div className='modal-Wrapper' onClick={()=>setshowCreatePlaylists(false)}>CreatePlaylistModalForm</div>
            <div className='modal-Container bg-dark-subtle rounded text-center'>
                    <label htmlFor="playlistName" className='text-black'>playlist Name</label>
                    <input className="rounded p-1 mx-auto my-2" style={{width:"200px"}} type="text" id='PlaylistName'onChange={(e)=>(setPlaylistname(e.target.value))} value={playlistName}/>
                    <button className="btn btn-warning my-5" onClick={CreatePlaylist}>create playlist</button>
            </div>
        </>
    )
}
