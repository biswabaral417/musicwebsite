import { useState } from 'react'

export default function useAdminFunctions() {
    const [openaddSongsModal,setAddSongsModal]=useState(false)
    const [openRemoveSongsModal,setRemoveSongsModal]=useState(false)
  return {
    openaddSongsModal,
    setAddSongsModal,
    openRemoveSongsModal,
    setRemoveSongsModal


  }
  
}
