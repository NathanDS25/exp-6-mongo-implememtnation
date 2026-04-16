import React from 'react';
import { Mail, Phone, Edit2, Trash2, Calendar } from 'lucide-react';
import '../styles/ContactCard.css';

const ContactCard = ({ contact, onEdit, onDelete, isDeleting = false }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const getInitials = (name) => {
    return name
      .split(' ')
      .map((word) => word[0])
      .join('')
      .toUpperCase();
  };

  return (
    <div className="contact-card">
      <div className="card-header">
        <div className="card-avatar">
          <span>{getInitials(contact.name)}</span>
        </div>
        <div className="card-info">
          <h3 className="card-name">{contact.name}</h3>
          <p className="card-date">
            <Calendar size={14} />
            Added {formatDate(contact.createdAt)}
          </p>
        </div>
      </div>

      <div className="card-details">
        <div className="detail-item">
          <Mail size={18} />
          <a href={`mailto:${contact.email}`} className="detail-link">
            {contact.email}
          </a>
        </div>
        <div className="detail-item">
          <Phone size={18} />
          <a href={`tel:${contact.phone}`} className="detail-link">
            {contact.phone}
          </a>
        </div>
      </div>

      <div className="card-actions">
        <button
          className="btn-edit"
          onClick={() => onEdit(contact)}
          title="Edit contact"
          disabled={isDeleting}
        >
          <Edit2 size={18} />
          <span>Edit</span>
        </button>
        <button
          className={`btn-delete ${isDeleting ? 'btn-deleting' : ''}`}
          onClick={() => onDelete(contact._id)}
          title="Delete contact"
          disabled={isDeleting}
        >
          {isDeleting ? (
            <>
              <span className="spinner-small"></span>
              <span>Deleting</span>
            </>
          ) : (
            <>
              <Trash2 size={18} />
              <span>Delete</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default ContactCard;
