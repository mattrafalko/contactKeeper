import React, { useState, useContext } from 'react';
import AlertContext from '../../context/alert/AlertContext';

const Register = () => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  });

  const alertContext = useContext(AlertContext);

  const { setAlert } = alertContext;

  const { name, email, password, password2 } = user;

  const onChange = event => {
    setUser({
      ...user,
      [event.target.name]: event.target.value
    });
  };

  const onSubmit = event => {
    event.preventDefault();
    if (name === '' || email === '' || password === '') {
      setAlert('Fields cannot blank', 'danger');
    } else if (password !== password2) {
      setAlert('Passwords do not match', 'danger');
    } else {
      console.log('Register Submit');
    }
  };

  return (
    <div className="form-container">
      <h1>
        Account <span className="text-primary">Register</span>
      </h1>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label for="name">Name</label>
          <input
            type="text"
            name="name"
            value={name}
            onChange={onChange}
            required
          />
        </div>
        <div className="form-group">
          <label for="email">Email</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={onChange}
            required
          />
        </div>
        <div className="form-group">
          <label for="password">Password</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={onChange}
            minLength="8"
          />
        </div>
        <div className="form-group">
          <label for="password2">Confirm Password</label>
          <input
            type="password"
            name="password2"
            value={password2}
            onChange={onChange}
            required
            minLength="8"
          />
        </div>
        <input
          type="submit"
          value="register"
          className="btn btn-primary btn-block"
          required
        />
      </form>
    </div>
  );
};

export default Register;
