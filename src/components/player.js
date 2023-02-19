import './player.css'
import React, { useState, useEffect } from 'react';
import Songinfo from './songinfo.js'
import Controls from './controls.js'

function Player() {
  const [genre, setGenre] = useState('');
  const [audio, setAudio] = useState('');
  const [song, setSong] = useState('');
  const [isPlaying, setIsPlaying] = useState(true)

  //selects a new song if the sample has ended 
  useEffect(() => {
    if (audio) {
      audio.addEventListener('ended', handleSongEnded);
    }
    return () => {
      if (audio) {
        audio.removeEventListener('ended', handleSongEnded);
      }
    };
  }, [audio]);
  
  const handleSongEnded = () => {
    setTimeout(() => {
      handleSearch(genre);
    }, 500);

  };

  //fetches songs from iTunes API, selecting one at random
  const handleSearch = async (term) => {
    try {
      if(audio != ''){
        audio.pause()
      }
      setIsPlaying(true)

      //fetches songs that fall within the selected genre 
      const response = await fetch(
        `https://itunes.apple.com/search?term=${term}&entity=song&genreTerm=${term}&limit=200`
      );
      const data = await response.json();
      console.log(data)

      //chooses a song at random
      const randomSong = data.results[Math.floor(Math.random() * 200)]
      setGenre(term)
      const audio_obj = new Audio(randomSong.previewUrl);
      audio_obj.play();
      setAudio(audio_obj);
      setSong(randomSong)
    } catch (error) {
      console.log(error);
    }
  };

  const handlePlay = () => {
    audio.play();
  };

  const handlePause = () => {
    audio.pause();
  };

  const handleSetIsplaying = () => {
    setIsPlaying(!isPlaying)
  }

  return (
    <div className="search">
      <div className="options">
          <div className={genre === "rock" ? "genre-header-selected" : "genre-header"} onClick={() => handleSearch("rock")}>
            Rock
          </div>
          <div className={genre === "pop" ? "genre-header-selected" : "genre-header"} onClick={() => handleSearch("pop")}>
            Pop
          </div>
          <div className={genre === "indie" ? "genre-header-selected" : "genre-header"} onClick={() => handleSearch("indie")}>
            Indie
          </div>
      </div>
      <div id = "songwrap">
        <Songinfo song={song} />
        {audio != '' &&
          <Controls isPlaying = {isPlaying} setPlaying={handleSetIsplaying} onPlay = {handlePlay} onPause = {handlePause}></Controls>
        }
      </div>

    </div>
  );
}



export default Player;

