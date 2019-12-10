import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/styles';

const styles = theme => ({
  container: {
    margin: 'auto',
    padding: 50
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: 20
  }
});

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: false
    };
  }

  static getDerivedStateFromError() {
    return {
      error: true
    };
  }

  componentDidCatch(error, info) {
    console.log(error, info);
  }

  onClickRetry = () => {
    this.setState({ error: false });
    this.props.onRetry();
  };

  render() {
    const { classes } = this.props;
    if (this.state.error) {
      return (
        <div className={classes.container}>
          <Typography variant="h4">{this.props.message}</Typography>
          <div className={classes.buttonContainer}>
            <Button variant="contained" color="primary" onClick={this.onClickRetry}>
              Reintentar
            </Button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

ErrorBoundary.propTypes = {
  message: PropTypes.string.isRequired,
  onRetry: PropTypes.func.isRequired
};

export default withStyles(styles)(ErrorBoundary);
