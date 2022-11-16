import { useDeleteContactMutation } from 'redux/contactsSlice';

import { ContactsItem, ContactsButton } from './Contact.styled';

const Contact = ({ name, phone, id }) => {
  const [deleteContact, { isLoading: isDeleteContactLoading }] =
    useDeleteContactMutation();

  return (
    <ContactsItem>
      {name}
      <br />
      {phone}
      <ContactsButton
        disabled={isDeleteContactLoading}
        onClick={() => deleteContact(id)}
      >
        {isDeleteContactLoading ? 'Deleting' : 'Delete'}
      </ContactsButton>
    </ContactsItem>
  );
};

export default Contact;
