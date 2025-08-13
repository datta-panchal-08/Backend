import React, { useState } from 'react'
import './songs.css'
const SongRecomndations = () => {
    const [play,setPlay] = useState(false);
    const [songs, SetSongs] = useState([
        {
            title: "test_title",
            url: "test_url",
            artist: "test_artist"
        },
        {
            title: "test_title",
            url: "test_url",
            artist: "test_artist"
        },
        {
            title: "test_title",
            url: "test_url",
            artist: "test_artist"
        }
    ])
    return (
        <div className='songs-holder'>
            <h1>Songs Based On Your Mood</h1>
            <div className="songs">
                {
                    songs?.map((s, i) => {
                        return <div className="song" key={i}>
                            <div className="left">
                                <h4>{s.title}</h4>
                                <h5>{s.artist}</h5>
                            </div>
                            <div className="play-pause">
                                <i class="ri-play-large-line"></i>
                                <i class="ri-pause-large-line"></i>
                            </div>
                        </div>
                    })
                }
            </div>
        </div>
    )
}

export default SongRecomndations