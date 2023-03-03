import './controls.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause } from '@fortawesome/free-solid-svg-icons';


function Controls(props) {
  const {isPlaying, setPlaying, onPlay, onPause} = props;

  const handlePlay = () => {
    setPlaying(true);
    onPlay();
  };

  const handlePause = () => {
    setPlaying(false);
    onPause();
  };

  return (
    <div className="controls">
      {isPlaying ? (
        <div className="icon" onClick={handlePause}>
          <FontAwesomeIcon icon={faPause} />
        </div>
      ) : (
        <div className="icon" onClick={handlePlay}>
          <FontAwesomeIcon icon={faPlay} />
        </div>
      )}
    </div>
  );
  
}

export default Controls;
