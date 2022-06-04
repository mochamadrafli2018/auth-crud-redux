import { userService } from './user.service';
import { alertActions } from './';
import { createBrowserHistory } from 'history';

const history = createBrowserHistory();

export const userActions = {
    login,
    logout,
    register,
    getAll,
    delete: _delete
};

function login(username, password) {
    // state updates are triggered by dispatching actions
    return dispatch => {
        // trigger request functon
        dispatch(request({ username }));

        userService.login(username, password)
            .then(
                user => { 
                    dispatch(success(user));
                    history.push('/');
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    // trigger reducer in './_store/reducers/authentication.reducer.js'
    function request(user) { return { type: 'USER_LOGIN_REQUEST', user } }
    function success(user) { return { type: 'USER_LOGIN_SUCCESS', user } }
    function failure(error) { return { type: 'USER_LOGIN_FAILURE', error } }
}

function logout() {
    userService.logout();
    
    // trigger reducer in './_store/reducers/authentication.reducer.js'
    return { type: 'USER_LOGOUT' };
}

function register(user) {
    // state updates are triggered by dispatching actions
    return dispatch => {
        dispatch(request(user));

        userService.register(user)
            .then(
                user => { 
                    dispatch(success());
                    history.push('/login');
                    dispatch(alertActions.success('Registration successful'));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    // trigger reducer in './_store/reducers/authentication.reducer.js'
    function request(user) { return { type: 'USER_REGISTER_REQUEST', user } }
    function success(user) { return { type: 'USER_REGISTER_SUCCESS', user } }
    function failure(error) { return { type: 'USER_REGISTER_FAILURE', error } }
}

function getAll() {
    // state updates are triggered by dispatching actions
    return dispatch => {
        dispatch(request());

        userService.getAll()
            .then(
                users => dispatch(success(users)),
                error => dispatch(failure(error.toString()))
            );
    };

    // trigger reducer in './_store/reducers/authentication.reducer.js'
    function request() { return { type: 'USER_GETALL_REQUEST' } }
    function success(users) { return { type: 'USER_GETALL_SUCCESS', users } }
    function failure(error) { return { type: 'USER_GETALL_FAILURE', error } }
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    // state updates are triggered by dispatching actions
    return dispatch => {
        dispatch(request(id));

        userService.delete(id)
            .then(
                user => dispatch(success(id)),
                error => dispatch(failure(id, error.toString()))
            );
    };

    // trigger reducer in './_store/reducers/authentication.reducer.js'
    function request(id) { return { type: 'USER_DELETE_REQUEST', id } }
    function success(id) { return { type: 'USER_DELETE_SUCCESS', id } }
    function failure(id, error) { return { type: 'USER_DELETE_FAILURE', id, error } }
}