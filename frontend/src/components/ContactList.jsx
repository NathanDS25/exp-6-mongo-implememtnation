import React from 'react';
import { Users, Inbox } from 'lucide-react';
import ContactCard from './ContactCard';
import '../styles/ContactList.css';

const ContactList = ({ contacts, onEdit, onDelete, isLoading = false, searchQuery = '' }) => {
  if (isLoading && contacts.length === 0) {
    return (
      <div className="contacts-loading">
        <div className="loading-spinner"></div>
        <p>Loading contacts...</p>
      </div>
    );
  }

  if (contacts.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-icon">
          <Inbox size={48} />
        </div>
        <h3>No Contacts Found</h3>
        <p>
          {searchQuery
            ? `No contacts match "${searchQuery}"`
            : 'Start by adding your first contact above'}
        </p>
      </div>
    );
  }

  return (
    <div className="contacts-container">
      <div className="contacts-header">
        <div className="contacts-title">
          <Users size={24} />
          <span>Contacts ({contacts.length})</span>
        </div>
        <p className="contacts-subtitle">
          {searchQuery
            ? `Showing ${contacts.length} result${contacts.length !== 1 ? 's' : ''} for "${searchQuery}"`
            : `You have ${contacts.length} contact${contacts.length !== 1 ? 's' : ''} saved`}
        </p>
      </div>

      <div className="contacts-grid">
        {contacts.map((contact) => (
          <ContactCard
            key={contact._id}
            contact={contact}
            onEdit={onEdit}
            onDelete={onDelete}
            isDeleting={isLoading}
          />
        ))}
      </div>
    </div>
  );
};

export default ContactList;
