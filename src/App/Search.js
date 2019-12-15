import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import Link from '@material-ui/core/Link';
import SearchIcon from '@material-ui/icons/Search';
import { withStyles } from '@material-ui/core/styles';
import { search, clearSearch } from './actions/search';

const styles = () => ({
  paper: {
    width: 700,
    padding: 10,
    marginBottom: 10
  },
  searchInputContainer: {
    display: 'flex'
  },
  input: {
    width: 400
  },
  buttonContainer: {
    display: 'flex',
    verticalAlign: 'middle',
    marginLeft: 4
  },
  formControl: {
    marginTop: 4
  },
  radioContainers: {
    display: 'flex'
  },
  link: {
    textDecoration: 'none'
  }
});

const LinkToItem = React.forwardRef((props, ref) => <RouterLink innerRef={ref} {...props} />);

const ALBUMS = 'albums';
const SONGS = 'songs';

class Search extends Component {
  constructor(props) {
    super(props);
    this.searchTextRef = React.createRef();
    this.state = {
      searchText: '',
      searchType: ALBUMS
    };
  }

  componentDidMount() {
    this.searchTextRef.current.focus();
  }

  componentWillUnmount() {
    this.props.clearSearch();
  }

  onChangeSearchText = event => {
    const newValue = event.target.value;
    this.setState({ searchText: newValue });
  };

  onChangeSearchType = event => {
    const newValue = event.target.value;
    this.setState({ searchType: newValue });
  };

  onClickOnSearch = () => {
    this.props.search(this.state.searchType, this.state.searchText);
  };

  getLinkRoute = id => {
    let linkRoute;
    if (this.state.searchType === ALBUMS) {
      linkRoute = `/album-list/${id}`;
    } else {
      linkRoute = `/player/song/${id}`;
    }
    return linkRoute;
  };

  render() {
    const { classes, loading, error, results } = this.props;
    return (
      <>
        <Paper className={classes.paper}>
          <div className={classes.searchInputContainer}>
            <TextField
              variant="outlined"
              className={classes.input}
              inputRef={this.searchTextRef}
              value={this.state.searchText}
              onChange={this.onChangeSearchText}
            />
            <div className={classes.buttonContainer}>
              <Button
                variant="contained"
                color="primary"
                onClick={this.onClickOnSearch}
                startIcon={<SearchIcon />}
              >
                Buscar
              </Button>
            </div>
          </div>
          <FormControl component="fieldset" className={classes.formControl}>
            <RadioGroup
              name="searchType"
              value={this.state.searchType}
              onChange={this.onChangeSearchType}
            >
              <div className={classes.radioContainers}>
                <FormControlLabel
                  value={ALBUMS}
                  control={<Radio color="primary" />}
                  label="Álbumes"
                />
                <FormControlLabel
                  value={SONGS}
                  control={<Radio color="primary" />}
                  label="Canciones"
                />
              </div>
            </RadioGroup>
          </FormControl>
        </Paper>
        <Paper className={classes.paper}>
          {loading && <p>Buscando...</p>}
          {error && <p>Ha ocurrido un error al realizar la búsqueda</p>}
          {results.length === 0 && !loading && !error && (
            <p>No hay resultados para la búsqueda realizada</p>
          )}
          {results.length > 0 && !loading && !error && (
            <List>
              {results.map((item, index) => (
                <Fragment key={index}>
                  <ListItem>
                    <Link
                      to={this.getLinkRoute(item.id)}
                      component={LinkToItem}
                      className={classes.link}
                      color="inherit"
                    >
                      <ListItemText primary={item.name} />
                    </Link>
                  </ListItem>
                  {index !== results.length - 1 && <Divider />}
                </Fragment>
              ))}
            </List>
          )}
        </Paper>
      </>
    );
  }
}

Search.propTypes = {
  classes: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.bool.isRequired,
  results: PropTypes.array
};

const mapStateToProps = state => ({
  ...state.search
});

const mapDispatchToProps = dispatch => ({
  search: (type, text) => dispatch(search(type, text)),
  clearSearch: () => dispatch(clearSearch())
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Search));
