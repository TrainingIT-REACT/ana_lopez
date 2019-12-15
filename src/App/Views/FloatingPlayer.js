import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { startPlaying, stopPlaying, closeFloatingPlayer } from '../actions/song';
import Player from './components/Player';

const playerNode = document.getElementById('floating-player');

const styles = theme => ({
  container: {
    padding: 10,
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white
  },
  hidden: {
    display: 'none'
  },
  portalContainer: {
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-end',
    marginBottom: 5
  },
  flex: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between'
  },
  closeIcon: {
    color: theme.palette.common.white,
    padding: 10
  }
});

class FloatingPlayer extends React.Component {
  constructor(props) {
    super(props);
    this.divEl = document.createElement('div');
    this.divEl.classList.add(props.classes.hidden);
    this.divEl.classList.add(props.classes.portalContainer);
  }

  componentDidMount() {
    playerNode.appendChild(this.divEl);
  }

  componentWillUnmount() {
    playerNode.removeChild(this.divEl);
  }

  render() {
    const { classes, floatingPlayerOpen } = this.props;
    if (!floatingPlayerOpen) {
      this.divEl.classList.add(classes.hidden);
      return null;
    }

    this.divEl.classList.remove(classes.hidden);

    return ReactDOM.createPortal(
      <Paper className={classes.container}>
        <div>
          <div className={classes.flex}>
            <div>
              <Typography variant="caption">De {this.props.artist}</Typography>
              <Typography variant="body2">Sonando: {this.props.songName}</Typography>
            </div>
            <IconButton
              aria-label="close"
              className={classes.closeIcon}
              onClick={this.props.closeFloatingPlayer}
            >
              <CloseIcon fontSize="small" className={classes.icon} />
            </IconButton>
          </div>
        </div>
        <div>
          <Player
            startPlaying={this.props.startPlaying}
            stopPlaying={this.props.stopPlaying}
            autoPlay
            audio={this.props.audio}
          />
        </div>
      </Paper>,
      this.divEl
    );
  }
}

FloatingPlayer.propTypes = {
  classes: PropTypes.object.isRequired,
  songName: PropTypes.string,
  audio: PropTypes.string,
  artist: PropTypes.string,
  floatingPlayerOpen: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  ...state.song
});

const mapDispatchToProps = dispatch => ({
  startPlaying: () => dispatch(startPlaying()),
  stopPlaying: () => dispatch(stopPlaying()),
  closeFloatingPlayer: () => dispatch(closeFloatingPlayer())
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(FloatingPlayer));
