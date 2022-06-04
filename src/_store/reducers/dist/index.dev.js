"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _redux = require("redux");

var _authentication = require("./authentication.reducer");

var _registration = require("./registration.reducer");

var _users = require("./users.reducer");

var _alert = require("./alert.reducer");

// Reducers is used to trigger states change in Redux
// Reducers will be called via Action in './_action'
var rootReducer = (0, _redux.combineReducers)({
  authentication: _authentication.authentication,
  registration: _registration.registration,
  users: _users.users,
  alert: _alert.alert
});
var _default = rootReducer;
exports["default"] = _default;