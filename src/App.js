import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css'
import { alertActions } from './_actions';
import { connect } from 'react-redux';
import { HomePage } from './pages/HomePage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';

class App extends React.Component {
  /*constructor(props) {
    super(props);
    // history.listen((location, action) => {
      // clear alert on location change
      // this.props.clearAlerts();
    // });
  }*/
  render() {
    return (
      <div className='bg-app'>
        <BrowserRouter>
            <Routes>
            <Route path="/" element={<HomePage/>} />
            <Route path="/login" element={<LoginPage/>} />
            <Route path="/register" element={<RegisterPage/>} />
            {/* <Navigate from="*" to="/" /> */}
            </Routes>
        </BrowserRouter>
      </div>
    );
  }
}

// define alert state using mapState
function mapState(state) {
  const { alert } = state;
  return { alert };
}

// define clearAlerts function using actionCreators
const actionCreators = {
  clearAlerts: alertActions.clear
};

// connect component with redux using connect() function
const connectedApp = connect(mapState, actionCreators)(App);
export { connectedApp as App };