import React from 'react';

import {
  useGetContactsQuery,
  useDeleteContactMutation,
} from 'redux/contactsSlice';

import { useSelector } from 'react-redux';
import { selectFilter } from 'redux/selectors';

import Loader from 'components/Loader/Loader';
import {
  ContactsListStyled,
  ContactsItem,
  ContactsButton,
} from './ContactsList.styled';

const getFilteredContacts = (contacts, filter) => {
  if (filter === '') {
    return contacts;
  }
  return contacts.filter(contact => {
    const contactName = contact.name.toLowerCase();
    return contactName.includes(filter.toLowerCase());
  });
};

const ContactsList = () => {
  let { data: contacts, isFetching, isError } = useGetContactsQuery();
  const [deleteContact] = useDeleteContactMutation();
  const filter = useSelector(selectFilter);

  contacts = getFilteredContacts(contacts, filter);

  const onDeleteBtnClick = id => {
    deleteContact(id);
  };

  const mapCallback = ({ name, phone, id }) => (
    <ContactsItem key={id}>
      {name}
      <br />
      {phone}
      <ContactsButton onClick={() => onDeleteBtnClick(id)}>
        Delete
      </ContactsButton>
    </ContactsItem>
  );

  return (
    <ContactsListStyled>
      {isError && <p>{isError}</p>}
      {isFetching && <Loader />}
      {!isFetching && !isError && contacts.map(mapCallback)}
    </ContactsListStyled>
  );
};

export default ContactsList;
