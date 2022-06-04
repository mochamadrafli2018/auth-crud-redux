"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.userActions = void 0;

var _user = require("./user.service");

var _ = require("./");

var _history = require("history");

var history = (0, _history.createBrowserHistory)();
var userActions = {
  login: login,
  logout: logout,
  register: register,
  getAll: getAll,
  "delete": _delete
};
exports.userActions = userActions;

function login(username, password) {
  // state updates are triggered by dispatching actions
  return function (dispatch) {
    // trigger request functon
    dispatch(request({
      username: username
    }));

    _user.userService.login(username, password).then(function (user) {
      dispatch(success(user));
      history.push('/');
    }, function (error) {
      dispatch(failure(error.toString()));
      dispatch(_.alertActions.error(error.toString()));
    });
  }; // trigger reducer in './_store/reducers/authentication.reducer.js'

  function request(user) {
    return {
      type: 'USER_LOGIN_REQUEST',
      user: user
    };
  }

  function success(user) {
    return {
      type: 'USER_LOGIN_SUCCESS',
      user: user
    };
  }

  function failure(error) {
    return {
      type: 'USER_LOGIN_FAILURE',
      error: error
    };
  }
}

function logout() {
  _user.userService.logout(); // trigger reducer in './_store/reducers/authentication.reducer.js'


  return {
    type: 'USER_LOGOUT'
  };
}

function register(user) {
  // state updates are triggered by dispatching actions
  return function (dispatch) {
    dispatch(request(user));

    _user.userService.register(user).then(function (user) {
      dispatch(success());
      history.push('/login');
      dispatch(_.alertActions.success('Registration successful'));
    }, function (error) {
      dispatch(failure(error.toString()));
      dispatch(_.alertActions.error(error.toString()));
    });
  }; // trigger reducer in './_store/reducers/authentication.reducer.js'

  function request(user) {
    return {
      type: 'USER_REGISTER_REQUEST',
      user: user
    };
  }

  function success(user) {
    return {
      type: 'USER_REGISTER_SUCCESS',
      user: user
    };
  }

  function failure(error) {
    return {
      type: 'USER_REGISTER_FAILURE',
      error: error
    };
  }
}

function getAll() {
  // state updates are triggered by dispatching actions
  return function (dispatch) {
    dispatch(request());

    _user.userService.getAll().then(function (users) {
      return dispatch(success(users));
    }, function (error) {
      return dispatch(failure(error.toString()));
    });
  }; // trigger reducer in './_store/reducers/authentication.reducer.js'

  function request() {
    return {
      type: 'USER_GETALL_REQUEST'
    };
  }

  function success(users) {
    return {
      type: 'USER_GETALL_SUCCESS',
      users: users
    };
  }

  function failure(error) {
    return {
      type: 'USER_GETALL_FAILURE',
      error: error
    };
  }
} // prefixed function name with underscore because delete is a reserved word in javascript


function _delete(id) {
  // state updates are triggered by dispatching actions
  return function (dispatch) {
    dispatch(request(id));

    _user.userService["delete"](id).then(function (user) {
      return dispatch(success(id));
    }, function (error) {
      return dispatch(failure(id, error.toString()));
    });
  }; // trigger reducer in './_store/reducers/authentication.reducer.js'

  function request(id) {
    return {
      type: 'USER_DELETE_REQUEST',
      id: id
    };
  }

  function success(id) {
    return {
      type: 'USER_DELETE_SUCCESS',
      id: id
    };
  }

  function failure(id, error) {
    return {
      type: 'USER_DELETE_FAILURE',
      id: id,
      error: error
    };
  }
}