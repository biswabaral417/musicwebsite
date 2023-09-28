import React from 'react'
// import { useContext } from 'react'
// import MusicContext from '../../contexts/MusicContext'

export default function Removesong({item,setRemoveSongsModal}) {
    
console.log(item)
    const RemoveSongfrmDb = async () => {
        const res = await fetch('/fn/deleteSong', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({id:item})
        })
        const data = await res.json()
        if (res.status !== 200) {
            window.alert(data.error)
        }
        else {
            window.alert(data.success)
        }

    }

    return (
        <>
            <div className='Modal-wrapper'></div>
            <div>
                <h1 className='p-5 Modal-container'>are u sure u want to delete item {item.itemName} from the menu?</h1>
                <div className='d-flex'>
                    <button className='btn btn-primary m-2 ' onClick={() => {setRemoveSongsModal(false); RemoveSongfrmDb(item) }} >yes</button><button className='btn btn-primary m-2 ' onClick={()=>setRemoveSongsModal(false)} >no</button>
                </div>

            </div>
        </>
    )
}
