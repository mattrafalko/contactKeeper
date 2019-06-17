import React, { useContext, useEffect } from 'react';
import ContactContext from '../../context/contact/ContactContext';
import ContactItem from './ContactItem';
import Spinner from '../Layout/Spinner';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

const Contacts = () => {
  const contactContext = useContext(ContactContext);

  const { contacts, filtered, getUserContacts, loading } = contactContext;

  useEffect(() => {
    getUserContacts();
    //eslint-disable-next-line
  }, []);

  if (contacts !== null && contacts.length === 0 && !loading) {
    return <h4>No Contacts!</h4>;
  }

  return (
    <React.Fragment>
      {contacts !== null && !loading ? (
        <TransitionGroup>
          {filtered !== null
            ? filtered.map(contact => (
                <CSSTransition
                  key={contact._id}
                  timeout={500}
                  classNames="item"
                >
                  <ContactItem contact={contact} />
                </CSSTransition>
              ))
            : contacts.map(contact => (
                <CSSTransition
                  key={contact._id}
                  timeout={500}
                  classNames="item"
                >
                  <ContactItem contact={contact} />
                </CSSTransition>
              ))}
        </TransitionGroup>
      ) : (
        <Spinner />
      )}
    </React.Fragment>
  );
};

export default Contacts;
