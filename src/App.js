import React from 'react';
import './App.css';
import Login from './login/Login';
import Register from './register/Register';
import Student from './student/StudentCard';
import { Route, NavLink } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      {/* navlinks */}
      <NavLink to='/register' className='nav'>Register</NavLink> 
      <NavLink to='/login' className='nav'>Login</NavLink>
      <NavLink to='/student' className='nav'>Student</NavLink>

      {/* Routes */}
      <Route exact path='/register' component={Register}    />
      <Route path='/login' component={Login} />
      <Route path='/student' component={Student} />
    </div>
  );
}

export default App;
