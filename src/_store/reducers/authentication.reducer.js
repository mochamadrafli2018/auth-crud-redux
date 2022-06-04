// initial state
let user = JSON.parse(localStorage.getItem('user'));
const initialState = user ? { loggedIn: true, user } : {};

export function authentication(state = initialState, action) {
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
      return {}; // change state
    case 'USERS_LOGOUT':
      return {}; // change state
    default:
      return state
  }
}