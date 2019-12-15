import React from 'react';
import PropTypes from 'prop-types';

const Player = props => {
  const onPlaySong = () => {
    props.startPlaying();
  };

  const onStopSong = () => {
    props.stopPlaying();
  };

  return (
    <audio controls onPlay={onPlaySong} onEnded={onStopSong} autoPlay={props.autoPlay}>
      <source src={props.audio} type="audio/mpeg" />
      Tu navegador no soporta audio
    </audio>
  );
};

Player.propTypes = {
  startPlaying: PropTypes.func.isRequired,
  stopPlaying: PropTypes.func.isRequired,
  autoPlay: PropTypes.bool,
  audio: PropTypes.string
};

export default Player;
