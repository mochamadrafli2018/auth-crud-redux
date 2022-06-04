// initial state was {}
export function users(state = {}, action) {
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
      return {
        ...state,
        items: state.items.map(user =>
          user.id === action.id
            ? { ...user, deleting: true }
            : user
        )
      };
    case 'USER_DELETE_SUCCESS':
      // change state and remove deleted user from state
      return {
        items: state.items.filter(user => user.id !== action.id)
      };
    case 'USER_DELETE_FAILURE':
      // change state and remove 'deleting:true' property and add 'deleteError:[error]' property to user 
      return {
        ...state,
        items: state.items.map(user => {
          if (user.id === action.id) {
            // make copy of user without 'deleting:true' property
            const { deleting, ...userCopy } = user;
            // return copy of user with 'deleteError:[error]' property
            return { ...userCopy, deleteError: action.error };
          }

          return user;
        })
      };
    default:
      return state
  }
}