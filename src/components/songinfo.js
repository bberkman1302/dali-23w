import './songinfo.css'


function Songinfo(props) {
  const {song} = props;

  return (
    <div className="song-list">
      {song !== "" &&
        <div id = "songinfo">{song.trackName} by {song.artistName}</div>
      }
      
    </div>
  );
}

export default Songinfo; 