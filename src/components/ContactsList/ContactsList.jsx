// Hooks
import { useContacts } from 'hooks/useContacts';
import { useDeleteContactMutation } from 'redux/contactsSlice';

// Components
import Loader from 'components/Loader/Loader';
import {
  ContactsListStyled,
  ContactsItem,
  ContactsButton,
} from './ContactsList.styled';

const ContactsList = () => {
  const {
    data: contacts,
    isLoading,
    isError,
    isUninitialized,
    error,
  } = useContacts();
  const [deleteContact, { isLoading: isDeleteContactLoading }] =
    useDeleteContactMutation();

  const onDeleteBtnClick = id => {
    deleteContact(id);
  };

  const mapCallback = ({ name, phone, id }) => (
    <ContactsItem key={id}>
      {name}
      <br />
      {phone}
      <ContactsButton
        disabled={isDeleteContactLoading}
        onClick={() => onDeleteBtnClick(id)}
      >
        {isDeleteContactLoading ? 'Deleting' : 'Delete'}
      </ContactsButton>
    </ContactsItem>
  );

  const onError = isError;
  const onLoading = isLoading;
  const onFullfilled = !isLoading && !isError && !isUninitialized;

  return (
    <ContactsListStyled>
      {onError && <p>{error.error}</p>}
      {onLoading && <Loader />}
      {onFullfilled && contacts.map(mapCallback)}
    </ContactsListStyled>
  );
};

export default ContactsList;
