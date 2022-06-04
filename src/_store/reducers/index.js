import { combineReducers } from 'redux';

import { authentication } from './authentication.reducer';
import { registration } from './registration.reducer';
import { users } from './users.reducer';
import { alert } from './alert.reducer';

// Reducers is used to trigger states change in Redux
// Reducers will be called via Action in './_action'
const rootReducer = combineReducers({
  authentication,
  registration,
  users,
  alert
});

export default rootReducer;