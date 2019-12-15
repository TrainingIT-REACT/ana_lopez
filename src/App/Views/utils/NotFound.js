import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  container: {
    display: 'flex',
    justifyContent: 'center',
    padding: 50
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: 20
  },
  button: {
    margin: 10
  }
}));

const NotFound = props => {
  const goBack = () => {
    props.history.goBack();
  };

  const goHome = () => {
    props.history.push('/');
  };

  const classes = useStyles();
  return (
    <>
      <div className={classes.container}>
        <Typography variant="h4">Ups! Parece que la página que buscas no existe</Typography>
      </div>
      <div className={classes.buttonContainer}>
        <Button variant="contained" color="primary" className={classes.button} onClick={goHome}>
          Ve al inicio
        </Button>
        <Button variant="contained" color="primary" className={classes.button} onClick={goBack}>
          Vuelve atrás
        </Button>
      </div>
    </>
  );
};

NotFound.propTypes = {
  history: PropTypes.object.isRequired
};

export default NotFound;
