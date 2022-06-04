"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.registration = registration;

// initial state was {}
function registration() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case 'USERS_REGISTER_REQUEST':
      return {
        registering: true
      };
    // change state

    case 'USERS_REGISTER_SUCCESS':
      return {};
    // change state

    case 'USERS_REGISTER_FAILURE':
      return {};
    // change state

    default:
      return state;
  }
}