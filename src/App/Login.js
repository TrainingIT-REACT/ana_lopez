import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import HeadsetIcon from '@material-ui/icons/Headset';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const styles = () => ({
  container: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center'
  },
  paper: {
    width: 400,
    padding: 20
  },
  icon: {
    marginRight: 10
  },
  appNameContainer: {
    display: 'flex',
    alignItems: 'center',
    margin: 'auto',
    padding: 10
  },
  inputsContainer: {
    marginTop: 10,
    padding: 10
  },
  inputs: {
    width: 350,
    marginBottom: 15
  },
  buttonContainer: {
    padding: 10
  }
});

class Login extends Component {
  constructor(props) {
    super(props);
    this.userNameRef = React.createRef();
    this.state = {
      user: '',
      password: ''
    };
  }

  componentDidMount() {
    this.userNameRef.current.focus();
  }

  onChangeField = event => {
    const fieldName = event.target.name;
    const newValue = event.target.value;
    this.setState({ [fieldName]: newValue });
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.container}>
        <Paper className={classes.paper}>
          <div className={classes.appNameContainer}>
            <HeadsetIcon className={classes.icon} />
            <Typography variant="h6">Reactify</Typography>
          </div>
          <div className={classes.inputsContainer}>
            <TextField
              label="Usuario"
              variant="outlined"
              name="user"
              className={classes.inputs}
              inputRef={this.userNameRef}
              value={this.state.user}
              onChange={this.onChangeField}
            />
            <TextField
              type="password"
              label="Contraseña"
              variant="outlined"
              name="password"
              className={classes.inputs}
              value={this.state.password}
              onChange={this.onChangeField}
            />
          </div>
          <div className={classes.buttonContainer}>
            <Button variant="contained" color="primary">
              Iniciar sesión
            </Button>
          </div>
        </Paper>
      </div>
    );
  }
}

export default withStyles(styles)(Login);
