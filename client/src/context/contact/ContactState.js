import React, { useReducer } from 'react';
import uuid from 'uuid';
import ContactContext from './ContactContext';
import contactReducer from './ContactReducer';
import {
  ADD_CONTACT,
  DELETE_CONTACT,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_CONTACT,
  FILTER_CONTACTS,
  CLEAR_FILTER
} from '../types';

const ContactState = props => {
  const initialState = {
    contacts: [
      {
        type: 'professional',
        date: '2019-06-12T02:28:02.553Z',
        id: '5d0064aa03036c139e1f0e44',
        name: 'friend 2',
        email: 'friend2@r.com',
        phone: '1234567890',
        user: '5cfdbbb235ac255b35481b32'
      },
      {
        type: 'personal',
        date: '2019-06-12T02:28:02.553Z',
        id: '5d0064cc03036c139e1f0e46',
        name: 'Update test friend',
        email: 'friend3@r.com',
        phone: '0987654321',
        user: '5cfdbbb235ac255b35481b32'
      },
      {
        type: 'personal',
        date: '2019-06-12T02:28:02.553Z',
        id: '5d0064cc03036c139e1f0e45',
        name: 'Update test friend',
        email: 'friend3@r.com',
        phone: '0987654321',
        user: '5cfdbbb235ac255b35481b32'
      }
    ],
    current: null,
    filtered: null
  };

  const [state, dispatch] = useReducer(contactReducer, initialState);

  // Add contact
  const addContact = contact => {
    contact.id = uuid.v4();
    dispatch({ type: ADD_CONTACT, payload: contact });
  };

  //delete contact
  const deleteContact = id => {
    dispatch({ type: DELETE_CONTACT, payload: id });
  };

  //set current contact
  const setCurrent = contact => {
    dispatch({ type: SET_CURRENT, payload: contact });
  };

  //clear current contact
  const clearCurrent = () => {
    dispatch({ type: CLEAR_CURRENT, payload: null });
  };

  //update contact
  const updateContact = contact => {
    dispatch({ type: UPDATE_CONTACT, payload: contact });
  };

  //filter contacts
  const filterContacts = text => {
    dispatch({ type: FILTER_CONTACTS, payload: text });
  };

  //clear filter
  const clearFilter = () => {
    dispatch({ type: CLEAR_FILTER, payload: null });
  };
  return (
    <ContactContext.Provider
      value={{
        contacts: state.contacts,
        current: state.current,
        filtered: state.filtered,
        addContact,
        deleteContact,
        updateContact,
        setCurrent,
        clearCurrent,
        filterContacts,
        clearFilter
      }}
    >
      {props.children}
    </ContactContext.Provider>
  );
};

export default ContactState;
