import React from 'react';
import { Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions } from '../_actions';

class LoginPage extends React.Component {
    constructor(props) {
        super(props);

        // reset login status
        this.props.logout();

        this.state = {
            username: '',
            password: '',
            submitted: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleSubmit(e) {
        e.preventDefault();

        this.setState({ submitted: true });
        const { username, password } = this.state;
        if (username && password) {
            this.props.login(username, password);
        }
    }

  render() {
    const { loggingIn } = this.props;
    const { username, password, submitted } = this.state;
    // 
    return (
      <div className="login-page col-md-6 flex flex-row mx-auto mt-5 p-3 rounded shadow">
        <h2>Login</h2>
        <form name="form" onSubmit={this.handleSubmit}>
          <div className={'form-group my-2' + (submitted && !username ? ' has-error' : '')}>
            <label htmlFor="username">Username</label>
            <input type="text" className="form-control" name="username" 
              value={username}
              onChange={this.handleChange}
            />
            {submitted && !username &&
              <div className="help-block">Username is required</div>
            }
          </div>
          <div className={'form-group my-2' + (submitted && !password ? ' has-error' : '')}>
            <label htmlFor="password">Password</label>
            <input type="password" className="form-control" name="password" value={password} onChange={this.handleChange} />
            {submitted && !password &&
              <div className="help-block">Password is required</div>
            }
          </div>
          <div className="form-group my-2">
            <button className="btn btn-primary">Login</button>
            {loggingIn &&
              <div className="border-2 border-primary bg-primary my-2 p-3 rounded my-2">
                <Spinner as="span" animation="grow" size="sm" role="status" aria-hidden="true" variant="primary"
                /> Tunggu sebentar...
              </div>
            }
            <Link to="/register" className="btn btn-link">Register</Link>
          </div>
        </form>
      </div>
    );
  }
}

function mapState(state) {
    const { loggingIn } = state.authentication;
    return { loggingIn };
}

const actionCreators = {
    login: userActions.login,
    logout: userActions.logout
};

const connectedLoginPage = connect(mapState, actionCreators)(LoginPage);
export { connectedLoginPage as LoginPage };