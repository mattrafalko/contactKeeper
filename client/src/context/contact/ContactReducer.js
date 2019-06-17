import * as types from '../types';

export default (state, action) => {
  switch (action.type) {
    case types.GET_CONTACTS:
      return {
        ...state,
        contacts: action.payload,
        loading: false
      };
    case types.CLEAR_CONTACTS:
      return {
        ...state,
        contacts: null,
        filtered: null,
        error: null,
        current: null
      };
    case types.ADD_CONTACT:
      return {
        ...state,
        contacts: [action.payload, ...state.contacts], //Putting the payload first allows for the contact to be added to the begging of the list. LIFO
        loading: false
      };
    case types.CONTACT_ERROR:
      return {
        ...state,
        error: action.payload
      };
    case types.DELETE_CONTACT:
      return {
        ...state,
        contacts: state.contacts.filter(
          contact => contact._id !== action.payload
        ),
        loading: false
      };
    case types.UPDATE_CONTACT:
      return {
        ...state,
        contacts: state.contacts.map(contact =>
          contact._id === action.payload._id ? action.payload : contact
        ),
        loading: false
      };
    case types.SET_CURRENT:
      return {
        ...state,
        current: action.payload
      };
    case types.CLEAR_CURRENT:
      return {
        ...state,
        current: null
      };
    case types.FILTER_CONTACTS:
      return {
        ...state,
        filtered: state.contacts.filter(contact => {
          const regex = new RegExp(`${action.payload}`, 'gi');
          return contact.name.match(regex) || contact.email.match(regex);
        }),
        loading: false
      };
    case types.CLEAR_FILTER:
      return {
        ...state,
        filtered: null,
        loading: false
      };
    default:
      return state;
  }
};
