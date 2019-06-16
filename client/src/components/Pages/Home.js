import React, { useContext, useEffect } from 'react';
import Conatcts from '../Contacts/Contacts';
import ContactForm from '../Contacts/ContactForm';
import ContactFilter from '../Contacts/ContactFilter';
import AuthContext from '../../context/auth/AuthContext';

const Home = () => {
  const authContext = useContext(AuthContext);

  const { loadUser } = authContext;

  useEffect(() => {
    loadUser();
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <div className="grid-2">
        <div>
          <ContactForm />
        </div>
        <div>
          <ContactFilter />
          <Conatcts />
        </div>
      </div>
    </div>
  );
};

export default Home;
