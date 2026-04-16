import express from 'express';
import Contact from '../models/Contact.js';
import { validateContact, handleValidationErrors } from '../middleware/validation.js';

const router = express.Router();

// GET all contacts
router.get('/', async (req, res, next) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json({
      success: true,
      data: contacts,
      count: contacts.length
    });
  } catch (error) {
    next(error);
  }
});

// GET single contact by ID
router.get('/:id', async (req, res, next) => {
  try {
    const contact = await Contact.findById(req.params.id);
    
    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact not found'
      });
    }

    res.json({
      success: true,
      data: contact
    });
  } catch (error) {
    if (error.kind === 'ObjectId') {
      return res.status(400).json({
        success: false,
        message: 'Invalid contact ID'
      });
    }
    next(error);
  }
});

// CREATE new contact
router.post('/', validateContact, handleValidationErrors, async (req, res, next) => {
  try {
    const { name, email, phone } = req.body;

    // Check if email already exists
    const existingContact = await Contact.findOne({ email });
    if (existingContact) {
      return res.status(400).json({
        success: false,
        message: 'A contact with this email already exists',
        errors: [{ field: 'email', message: 'Email must be unique' }]
      });
    }

    const contact = new Contact({ name, email, phone });
    await contact.save();

    res.status(201).json({
      success: true,
      message: 'Contact created successfully',
      data: contact
    });
  } catch (error) {
    next(error);
  }
});

// UPDATE contact
router.put('/:id', validateContact, handleValidationErrors, async (req, res, next) => {
  try {
    const { name, email, phone } = req.body;

    // Check if email is already used by another contact
    const existingContact = await Contact.findOne({ 
      email, 
      _id: { $ne: req.params.id } 
    });
    if (existingContact) {
      return res.status(400).json({
        success: false,
        message: 'A contact with this email already exists',
        errors: [{ field: 'email', message: 'Email must be unique' }]
      });
    }

    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { name, email, phone },
      { new: true, runValidators: true }
    );

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact not found'
      });
    }

    res.json({
      success: true,
      message: 'Contact updated successfully',
      data: contact
    });
  } catch (error) {
    if (error.kind === 'ObjectId') {
      return res.status(400).json({
        success: false,
        message: 'Invalid contact ID'
      });
    }
    next(error);
  }
});

// DELETE contact
router.delete('/:id', async (req, res, next) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact not found'
      });
    }

    res.json({
      success: true,
      message: 'Contact deleted successfully',
      data: contact
    });
  } catch (error) {
    if (error.kind === 'ObjectId') {
      return res.status(400).json({
        success: false,
        message: 'Invalid contact ID'
      });
    }
    next(error);
  }
});

// SEARCH contacts (optional advanced endpoint)
router.get('/search/query', async (req, res, next) => {
  try {
    const { q } = req.query;

    if (!q) {
      return res.status(400).json({
        success: false,
        message: 'Search query is required'
      });
    }

    const contacts = await Contact.find({
      $or: [
        { name: { $regex: q, $options: 'i' } },
        { email: { $regex: q, $options: 'i' } },
        { phone: { $regex: q, $options: 'i' } }
      ]
    }).sort({ createdAt: -1 });

    res.json({
      success: true,
      data: contacts,
      count: contacts.length
    });
  } catch (error) {
    next(error);
  }
});

export default router;
