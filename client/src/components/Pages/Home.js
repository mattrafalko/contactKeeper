import React from 'react';
import Conatcts from '../Contacts/Contacts';
import ContactForm from '../Contacts/ContactForm';
import ContactFilter from '../Contacts/ContactFilter';

const Home = () => {
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
