// initial state was {}
export function registration(state = {}, action) {
  switch (action.type) {
    case 'USERS_REGISTER_REQUEST':
      return { registering: true }; // change state
    case 'USERS_REGISTER_SUCCESS':
      return {}; // change state
    case 'USERS_REGISTER_FAILURE':
      return {}; // change state
    default:
      return state
  }
}