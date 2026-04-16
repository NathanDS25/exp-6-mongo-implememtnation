import React, { useState, useEffect } from 'react';
import { Zap, AlertCircle } from 'lucide-react';
import ContactForm from './components/ContactForm';
import ContactList from './components/ContactList';
import SearchBar from './components/SearchBar';
import Toast from './components/Toast';
import { contactAPI } from './utils/api';
import './styles/App.css';

function App() {
  const [contacts, setContacts] = useState([]);
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [editingContact, setEditingContact] = useState(null);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);
  const [serverConnected, setServerConnected] = useState(false);

  // Fetch all contacts on mount
  useEffect(() => {
    checkServerConnection();
    fetchContacts();
  }, []);

  // Filter contacts based on search query
  useEffect(() => {
    if (searchQuery.trim()) {
      const filtered = contacts.filter(
        (contact) =>
          contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          contact.email.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredContacts(filtered);
    } else {
      setFilteredContacts(contacts);
    }
  }, [contacts, searchQuery]);

  const checkServerConnection = async () => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001';
      const response = await fetch(`${apiUrl}/health`);
      if (response.ok) {
        setServerConnected(true);
      }
    } catch (error) {
      setServerConnected(false);
    }
  };

  const fetchContacts = async () => {
    setLoading(true);
    try {
      const data = await contactAPI.getAllContacts();
      setContacts(data.data || []);
    } catch (error) {
      console.error('Error fetching contacts:', error);
      showToast('Failed to load contacts. Please try again.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleAddContact = async (contactData) => {
    setLoading(true);
    try {
      await contactAPI.createContact(contactData);
      showToast('Contact added successfully!', 'success');
      fetchContacts();
    } catch (error) {
      const errorMessage =
        error.errors?.map((e) => e.message).join(', ') ||
        error.message ||
        'Failed to add contact';
      showToast(errorMessage, 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateContact = async (contactData) => {
    setLoading(true);
    try {
      await contactAPI.updateContact(editingContact._id, contactData);
      showToast('Contact updated successfully!', 'success');
      setEditingContact(null);
      fetchContacts();
    } catch (error) {
      const errorMessage =
        error.errors?.map((e) => e.message).join(', ') ||
        error.message ||
        'Failed to update contact';
      showToast(errorMessage, 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteContact = async (contactId) => {
    if (!window.confirm('Are you sure you want to delete this contact?')) {
      return;
    }

    setLoading(true);
    try {
      await contactAPI.deleteContact(contactId);
      showToast('Contact deleted successfully!', 'success');
      fetchContacts();
    } catch (error) {
      showToast('Failed to delete contact', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleEditContact = (contact) => {
    setEditingContact(contact);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancelEdit = () => {
    setEditingContact(null);
  };

  const handleClearSearch = () => {
    setSearchQuery('');
  };

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
  };

  return (
    <div className="app">
      {/* Server Status Bar */}
      {!serverConnected && (
        <div className="server-alert">
          <AlertCircle size={18} />
          <span>Backend server is not running. Please start it with `npm start`</span>
        </div>
      )}

      {/* Header */}
      <header className="app-header">
        <div className="header-content">
          <div className="logo">
            <Zap size={32} />
            <div className="logo-text">
              <h1>Contact Manager</h1>
              <p>Professional Contact Management</p>
            </div>
          </div>
          <div className="header-status">
            <span className={`status-indicator ${serverConnected ? 'connected' : 'disconnected'}`}></span>
            {serverConnected ? 'API Connected' : 'Offline'}
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="app-main">
        <div className="container">
          {/* Left Column - Form */}
          <aside className="sidebar">
            <ContactForm
              onSubmit={editingContact ? handleUpdateContact : handleAddContact}
              initialData={editingContact}
              isLoading={loading}
            />
            {editingContact && (
              <button className="btn-cancel-edit" onClick={handleCancelEdit}>
                ✕ Cancel Editing
              </button>
            )}
          </aside>

          {/* Right Column - Contacts List */}
          <section className="main-content">
            <SearchBar
              value={searchQuery}
              onChange={setSearchQuery}
              onClear={handleClearSearch}
              isLoading={loading}
            />
            <ContactList
              contacts={filteredContacts}
              onEdit={handleEditContact}
              onDelete={handleDeleteContact}
              isLoading={loading}
              searchQuery={searchQuery}
            />
          </section>
        </div>
      </main>

      {/* Toast Notification */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      {/* Footer */}
      <footer className="app-footer">
        <p>© 2024 Contact Manager. Connected to MongoDB Atlas Backend.</p>
      </footer>
    </div>
  );
}

export default App;
