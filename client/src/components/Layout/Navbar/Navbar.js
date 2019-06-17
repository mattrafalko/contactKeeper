import React, { useContext } from 'react';
import AuthContext from '../../../context/auth/AuthContext';
import ContactContext from '../../../context/contact/ContactContext';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Navbar = ({ title, icon }) => {
  const authContext = useContext(AuthContext);
  const contactContext = useContext(ContactContext);
  const { isAuthenticated, logoutUser, user } = authContext;

  const onLogout = () => {
    logoutUser();
    contactContext.clearContacts();
  };

  const authLinks = (
    <React.Fragment>
      <li>Hello {user && user.name}</li>
      <li>
        <a onClick={onLogout} href="#!">
          <i className="fas fa-sign-out-alt">
            <span className="hide-sm"> Logout</span>
          </i>
        </a>
      </li>
    </React.Fragment>
  );
  const guestLinks = (
    <React.Fragment>
      <li>
        <Link to="/login">Login</Link>
      </li>
      <li>
        <Link to="/register">Register</Link>
      </li>
    </React.Fragment>
  );

  return (
    <div className="navbar bg-primary">
      <h1>
        <Link to="/">
          {' '}
          <i className={icon} /> {title}
        </Link>
      </h1>
      <ul>{isAuthenticated ? authLinks : guestLinks}</ul>
    </div>
  );
};

Navbar.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string
};

Navbar.defaultProps = {
  title: 'Contact Keeper',
  icon: 'far fa-address-book'
};
export default Navbar;
