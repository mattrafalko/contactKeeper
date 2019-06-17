import React, { useReducer } from 'react';

import ContactContext from './ContactContext';
import contactReducer from './ContactReducer';
import {
  ADD_CONTACT,
  DELETE_CONTACT,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_CONTACT,
  FILTER_CONTACTS,
  CLEAR_FILTER,
  CONTACT_ERROR,
  GET_CONTACTS,
  CLEAR_CONTACTS
} from '../types';
import axios from 'axios';

const ContactState = props => {
  const initialState = {
    contacts: null,
    current: null,
    filtered: null,
    error: null
  };

  const [state, dispatch] = useReducer(contactReducer, initialState);

  // Get users contacts
  const getUserContacts = async () => {
    try {
      const res = await axios.get('/api/contacts');
      dispatch({ type: GET_CONTACTS, payload: res.data.contacts });
    } catch (error) {
      console.error(error.message);
      dispatch({ type: CONTACT_ERROR, payload: error.message });
    }
  };

  //clear contacts
  const clearContacts = () => {
    dispatch({ type: CLEAR_CONTACTS });
  };

  // Add contact
  const addContact = async contact => {
    const config = { headers: { 'Content-Type': 'application/json' } };
    try {
      const res = await axios.post('/api/contacts', contact, config);
      dispatch({ type: ADD_CONTACT, payload: res.data });
    } catch (error) {
      console.error(error.response.message);
      dispatch({ type: CONTACT_ERROR, payload: error.response.message });
    }
  };

  //delete contact
  const deleteContact = async _id => {
    try {
      await axios.delete(`/api/contacts/${_id}`);
      dispatch({ type: DELETE_CONTACT, payload: _id });
    } catch (error) {
      console.error(error.response.message);
      dispatch({ type: CONTACT_ERROR, payload: error.response.message });
    }
  };

  //set current contact
  const setCurrent = async contact => {
    dispatch({ type: SET_CURRENT, payload: contact });
  };

  //clear current contact
  const clearCurrent = () => {
    dispatch({ type: CLEAR_CURRENT, payload: null });
  };

  //update contact
  const updateContact = async contact => {
    const config = { headers: { 'Content-Type': 'application/json' } };
    try {
      const res = await axios.put(
        `/api/contacts/${contact._id}`,
        contact,
        config
      );
      dispatch({ type: UPDATE_CONTACT, payload: res.data });
    } catch (error) {
      console.error(error.message);
      dispatch({ type: CONTACT_ERROR, payload: error.message });
    }
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
        clearFilter,
        error: state.error,
        getUserContacts,
        clearContacts
      }}
    >
      {props.children}
    </ContactContext.Provider>
  );
};

export default ContactState;
