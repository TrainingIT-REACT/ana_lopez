import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const PrivateRoute = props => {
  const { component: Component, userName, ...others } = props;
  return (
    <Route
      {...others}
      render={props =>
        userName ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: {
                message: 'Haz login primero para poder ver tu perfil'
              }
            }}
          />
        )
      }
    />
  );
};

PrivateRoute.propTypes = {
  user: PropTypes.string
};

const mapStateToProps = state => {
  return {
    userName: state.user.name
  };
};

export default connect(mapStateToProps)(PrivateRoute);
