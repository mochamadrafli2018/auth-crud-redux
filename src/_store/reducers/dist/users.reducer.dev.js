"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.users = users;

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// initial state was {}
function users() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case 'USERS_GETALL_REQUEST':
      // change state
      return {
        loading: true
      };

    case 'USER_GETALL_SUCCESS':
      // change state
      return {
        items: action.users
      };

    case 'USER_GETALL_FAILURE':
      // change state
      return {
        error: action.error
      };

    case 'USER_DELETE_REQUEST':
      // add 'deleting:true' property to user being deleted
      // change state
      return _objectSpread({}, state, {
        items: state.items.map(function (user) {
          return user.id === action.id ? _objectSpread({}, user, {
            deleting: true
          }) : user;
        })
      });

    case 'USER_DELETE_SUCCESS':
      // change state and remove deleted user from state
      return {
        items: state.items.filter(function (user) {
          return user.id !== action.id;
        })
      };

    case 'USER_DELETE_FAILURE':
      // change state and remove 'deleting:true' property and add 'deleteError:[error]' property to user 
      return _objectSpread({}, state, {
        items: state.items.map(function (user) {
          if (user.id === action.id) {
            // make copy of user without 'deleting:true' property
            var deleting = user.deleting,
                userCopy = _objectWithoutProperties(user, ["deleting"]); // return copy of user with 'deleteError:[error]' property


            return _objectSpread({}, userCopy, {
              deleteError: action.error
            });
          }

          return user;
        })
      });

    default:
      return state;
  }
}