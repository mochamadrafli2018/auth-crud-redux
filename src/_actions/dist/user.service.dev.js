"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.userService = void 0;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var config = JSON.stringify({
  apiUrl: 'https://express-mongoose-validator.herokuapp.com/api/users'
});
var userService = {
  login: login,
  logout: logout,
  register: register,
  getAll: getAll,
  getById: getById,
  update: update,
  "delete": _delete
};
exports.userService = userService;

function authHeader() {
  // return authorization header with jwt token
  var user = JSON.parse(localStorage.getItem('user'));

  if (user && user.token) {
    return {
      'Authorization': 'Bearer ' + user.token
    };
  } else {
    return {};
  }
}

function login(username, password) {
  var requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      username: username,
      password: password
    })
  };
  return fetch("".concat(config.apiUrl, "/users/authenticate"), requestOptions).then(handleResponse).then(function (user) {
    // store user details and jwt token in local storage to keep user logged in between page refreshes
    localStorage.setItem('user', JSON.stringify(user));
    return user;
  });
}

function logout() {
  // remove user from local storage to log user out
  localStorage.removeItem('user');
}

function getAll() {
  var requestOptions = {
    method: 'GET',
    headers: authHeader()
  };
  return fetch("".concat(config.apiUrl, "/users"), requestOptions).then(handleResponse);
}

function getById(id) {
  var requestOptions = {
    method: 'GET',
    headers: authHeader()
  };
  return fetch("".concat(config.apiUrl, "/users/").concat(id), requestOptions).then(handleResponse);
}

function register(user) {
  var requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user)
  };
  return fetch("".concat(config.apiUrl, "/users/register"), requestOptions).then(handleResponse);
}

function update(user) {
  var requestOptions = {
    method: 'PUT',
    headers: _objectSpread({}, authHeader(), {
      'Content-Type': 'application/json'
    }),
    body: JSON.stringify(user)
  };
  return fetch("".concat(config.apiUrl, "/users/").concat(user.id), requestOptions).then(handleResponse);
} // prefixed function name with underscore because delete is a reserved word in javascript


function _delete(id) {
  var requestOptions = {
    method: 'DELETE',
    headers: authHeader()
  };
  return fetch("".concat(config.apiUrl, "/users/").concat(id), requestOptions).then(handleResponse);
}

function handleResponse(response) {
  return response.text().then(function (text) {
    var data = text && JSON.parse(text);

    if (!response.ok) {
      if (response.status === 401) {
        // auto logout if 401 response returned from api
        logout();
        window.location.reload(true);
      }

      var error = data && data.message || response.statusText;
      return Promise.reject(error);
    }

    return data;
  });
}