"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.authentication = authentication;
// initial state
var user = JSON.parse(localStorage.getItem('user'));
var initialState = user ? {
  loggedIn: true,
  user: user
} : {};

function authentication() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case 'USERS_LOGIN_REQUEST':
      // change state
      return {
        loggingIn: true,
        user: action.user
      };

    case 'USERS_LOGIN_SUCCESS':
      // change state
      return {
        loggedIn: true,
        user: action.user
      };

    case 'USERS_LOGIN_FAILURE':
      return {};
    // change state

    case 'USERS_LOGOUT':
      return {};
    // change state

    default:
      return state;
  }
}