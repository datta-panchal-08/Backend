import React, { useState } from "react";
import "./songs.css";

const SongRecomndations = ({ songs }) => {
  const [playingIndex, setPlayingIndex] = useState(null);

  return (
    <div className="songs-holder">
      <h1>Songs Based On Your Mood</h1>
      <div className="songs">
        {songs?.map((s, i) => {
          const isPlaying = playingIndex === i;

          return (
            <div className="song" key={i}>
              <div className="left">
                <h4>{s.title}</h4>
                <h5>{s.artist}</h5>
              </div>

              <div className="play-pause">
                {isPlaying ? (
                  <i
                    className="ri-pause-large-line"
                    onClick={() => setPlayingIndex(null)}
                  ></i>
                ) : (
                  <i
                    className="ri-play-large-line"
                    onClick={() => setPlayingIndex(i)}
                  ></i>
                )}
              </div>

              {isPlaying && (
                <audio
                  src={s?.audio}
                  autoPlay
                  onEnded={() => setPlayingIndex(null)}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SongRecomndations;
