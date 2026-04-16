# MongoDB Backend Integration - Quick Start Guide

## ⚡ Quick Setup (5 minutes)

### Prerequisites
- Node.js installed ([Download](https://nodejs.org/))
- **MongoDB Atlas account (FREE)** - [Sign up here](https://www.mongodb.com/cloud/atlas)

### Step 1: Install Dependencies
```bash
cd server
npm install
```

### Step 2: Set Up MongoDB Atlas (Easiest!)

**Option A: MongoDB Atlas (Cloud) - RECOMMENDED ⭐**

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a FREE account
3. Create a free cluster (takes ~2 minutes)
4. Click "Connect" on your cluster
5. Select "Connect your application"
6. Copy the connection string
7. Create `server/.env` with:
```
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster0.abc123.mongodb.net/contact-manager?retryWrites=true&w=majority
```
8. Replace `username`, `password`, and `cluster0.abc123` with your actual values

**Option B: Local MongoDB (Advanced)**

Only if you have MongoDB installed locally:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/contact-manager
```
Then run `mongod` in another terminal

### Step 3: Start Backend
```bash
# From server folder
npm start
```

Expected output: `✓ Connected to MongoDB successfully`

### Step 4: Open Frontend
Open `index-api.html` in your browser (NOT the original index.html)

**Done!** Your app should now be connected to MongoDB.

---

## 📝 Testing the Integration

### Via Browser Console (Open DevTools with F12)

Add a contact:
```javascript
fetch('http://localhost:5000/api/contacts', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: 'John Doe',
    email: 'john@example.com',
    phone: '555-1234567'
  })
})
.then(r => r.json())
.then(d => console.log(d))
```

View all contacts:
```javascript
fetch('http://localhost:5000/api/contacts')
  .then(r => r.json())
  .then(d => console.log(d.data))
```

---

## ✅ Key Features Implemented

| Feature | Status | Details |
|---------|--------|---------|
| API Server | ✅ | Express.js on port 5000 |
| MongoDB Connection | ✅ | Mongoose with schema validation |
| Create Contact | ✅ | POST /api/contacts |
| Read Contacts | ✅ | GET /api/contacts |
| Update Contact | ✅ | PUT /api/contacts/:id |
| Delete Contact | ✅ | DELETE /api/contacts/:id |
| Search | ✅ | GET /api/contacts/search/query?q=term |
| Validation | ✅ | Name, email, phone format checks |
| Error Handling | ✅ | Detailed error messages |
| Duplicates | ✅ | Prevents duplicate emails |
| Notifications | ✅ | User-friendly feedback |

---

## 🎯 What Changed from Original

| Aspect | Before | After |
|--------|--------|-------|
| **Data Storage** | Browser localStorage | MongoDB database |
| **Persistence** | Lost on browser clear | Permanent cloud storage |
| **Multi-device** | No (single browser) | Yes (any device/browser) |
| **Scalability** | Limited | Enterprise-ready |
| **API** | Local JS functions | RESTful API endpoints |

---

## 📂 File Reference

**New Files Created:**
- `server/server.js` - Main backend server
- `server/routes/contacts.js` - API endpoints
- `server/models/Contact.js` - MongoDB schema
- `server/middleware/validation.js` - Validation logic
- `server/package.json` - Dependencies
- `server/.env.example` - Configuration template
- `script-api.js` - Updated frontend script
- `index-api.html` - Updated frontend HTML
- `INTEGRATION_GUIDE.md` - Full documentation

**Original Files (Unchanged):**
- `index.html` - Original version
- `script.js` - Original version
- `style.css` - Shared styling

---

## 🔧 API Endpoints Reference

```bash
# Health check
GET http://localhost:5000/health

# List all contacts
GET http://localhost:5000/api/contacts

# Get single contact
GET http://localhost:5000/api/contacts/:id

# Create contact
POST http://localhost:5000/api/contacts
# Body: { name, email, phone }

# Update contact
PUT http://localhost:5000/api/contacts/:id
# Body: { name, email, phone }

# Delete contact
DELETE http://localhost:5000/api/contacts/:id

# Search contacts
GET http://localhost:5000/api/contacts/search/query?q=searchterm
```

---

## ❌ Troubleshooting

| Problem | Solution |
|---------|----------|
| `Cannot GET /api/contacts` | Backend not running - run `npm start` |
| `MongoDB connection failed` | Start MongoDB with `mongod` or check .env |
| Yellow status indicator | Check browser console (F12) for errors |
| Form won't submit | Check fields match validation rules |

---

## 📞 Validation Rules

- **Name**: 2-100 chars, letters/spaces/hyphens/apostrophes
- **Email**: Valid email format, must be unique
- **Phone**: 7+ digits/chars from: digits, spaces, -, +, ()

---

## 🚀 Next Steps

1. Test all CRUD operations through the UI
2. Verify data persists in MongoDB
3. Review error handling with invalid inputs
4. Deploy to production (see INTEGRATION_GUIDE.md)

---

**Questions?** Check `INTEGRATION_GUIDE.md` or MongoDB/Express documentation.
