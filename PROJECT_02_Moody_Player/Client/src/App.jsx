import React from 'react'
import FaceDetector from './componets/FaceDetector'
import SongRecomndations from './componets/SongRecomndations'
import { useState } from 'react'

const App = () => {
  const [songs, setSongs] = useState([])

  return (
    <div>
      <FaceDetector setSongs={setSongs} />
      {
        songs?.length > 0 && <SongRecomndations songs={songs}/>
      }
    </div>
  )
}

export default App