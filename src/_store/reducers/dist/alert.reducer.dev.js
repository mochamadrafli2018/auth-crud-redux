"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.alert = alert;

// inital state was {}
function alert() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case 'ALERT_SUCCESS':
      return {
        type: 'alert-success',
        message: action.message
      };

    case 'ALERT_ERROR':
      return {
        type: 'alert-danger',
        message: action.message
      };

    case 'ALERT_CLEAR':
      return {};

    default:
      return state;
  }
}