import React, { useState, useEffect } from 'react';
import { Mail, Phone, User, ArrowRight } from 'lucide-react';
import '../styles/ContactForm.css';

const ContactForm = ({ onSubmit, initialData = null, isLoading = false }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^[\d\s\-\+\(\)]{7,}$/.test(formData.phone)) {
      newErrors.phone = 'Phone must be at least 7 digits';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (touched[name]) {
      validateField(name, value);
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }));
    validateField(name, formData[name]);
  };

  const validateField = (name, value) => {
    const newErrors = { ...errors };

    switch (name) {
      case 'name':
        if (!value.trim()) {
          newErrors.name = 'Name is required';
        } else if (value.length < 2) {
          newErrors.name = 'Name must be at least 2 characters';
        } else {
          delete newErrors.name;
        }
        break;
      case 'email':
        if (!value.trim()) {
          newErrors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          newErrors.email = 'Please enter a valid email';
        } else {
          delete newErrors.email;
        }
        break;
      case 'phone':
        if (!value.trim()) {
          newErrors.phone = 'Phone number is required';
        } else if (!/^[\d\s\-\+\(\)]{7,}$/.test(value)) {
          newErrors.phone = 'Phone must be at least 7 digits';
        } else {
          delete newErrors.phone;
        }
        break;
      default:
        break;
    }

    setErrors(newErrors);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    onSubmit(formData);
    setFormData({ name: '', email: '', phone: '' });
    setTouched({});
  };

  return (
    <form onSubmit={handleSubmit} className="contact-form">
      <div className="form-header">
        <h2>{initialData ? 'Edit Contact' : 'Add New Contact'}</h2>
        <p className="form-subtitle">
          {initialData ? 'Update contact details' : 'Create a new contact entry'}
        </p>
      </div>

      <div className="form-fields">
        {/* Name Field */}
        <div className="form-group">
          <label htmlFor="name" className="form-label">
            <User size={18} />
            Full Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="John Doe"
            className={`form-input ${errors.name && touched.name ? 'input-error' : ''}`}
            disabled={isLoading}
          />
          {errors.name && touched.name && (
            <span className="error-message">{errors.name}</span>
          )}
        </div>

        {/* Email Field */}
        <div className="form-group">
          <label htmlFor="email" className="form-label">
            <Mail size={18} />
            Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="john@example.com"
            className={`form-input ${errors.email && touched.email ? 'input-error' : ''}`}
            disabled={isLoading}
          />
          {errors.email && touched.email && (
            <span className="error-message">{errors.email}</span>
          )}
        </div>

        {/* Phone Field */}
        <div className="form-group">
          <label htmlFor="phone" className="form-label">
            <Phone size={18} />
            Phone Number
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="+1 (555) 123-4567"
            className={`form-input ${errors.phone && touched.phone ? 'input-error' : ''}`}
            disabled={isLoading}
          />
          {errors.phone && touched.phone && (
            <span className="error-message">{errors.phone}</span>
          )}
        </div>
      </div>

      <button
        type="submit"
        className={`submit-button ${isLoading ? 'btn-loading' : ''}`}
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <span className="spinner"></span>
            {initialData ? 'Updating...' : 'Adding...'}
          </>
        ) : (
          <>
            {initialData ? 'Update Contact' : 'Add Contact'}
            <ArrowRight size={18} />
          </>
        )}
      </button>
    </form>
  );
};

export default ContactForm;
