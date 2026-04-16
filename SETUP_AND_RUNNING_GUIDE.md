# Contact Manager - Full Stack Setup & Running Guide

Complete guide for running the Contact Manager application with Express backend, MongoDB Atlas, and React frontend.

## 📋 Architecture Overview

```
┌─────────────────────────────────────────────────────────┐
│                  React Frontend (Port 5173)             │
│  ✓ Contact Form  ✓ Search  ✓ Notifications             │
└──────────────────────┬──────────────────────────────────┘
                       │ HTTP (axios)
                       ↓
┌─────────────────────────────────────────────────────────┐
│              Express Backend (Port 5000)                │
│  ✓ REST API  ✓ Validation  ✓ Error Handling            │
└──────────────────────┬──────────────────────────────────┘
                       │ MongoDB Driver
                       ↓
┌─────────────────────────────────────────────────────────┐
│           MongoDB Atlas Cloud Database                  │
│  ✓ Cloud Hosted  ✓ Automatic Backups  ✓ Secure         │
└─────────────────────────────────────────────────────────┘
```

## ⚙️ Prerequisites

### Required
- **Node.js** v16 or higher (get from [nodejs.org](https://nodejs.org))
- **npm** v8 or higher (comes with Node.js)
- **Git** (for version control)

### MongoDB Atlas Account
- Free account at [mongodb.com/cloud/atlas](https://mongodb.com/cloud/atlas)
- Project created with a Contact Manager cluster
- Database user credentials
- IP whitelist configured (or 0.0.0.0 for development)

### Verify Installation
```bash
node --version        # Should be v16+
npm --version         # Should be v8+
git --version         # Should be installed
```

## 🚀 Quick Start (5 minutes)

### Step 1: Prepare MongoDB Atlas Connection String

1. Log in to [MongoDB Atlas](https://atlas.mongodb.com)
2. Click "Connect" on your cluster
3. Choose "Connect your application"
4. Copy the SRV connection string:
   ```
   mongodb+srv://USERNAME:PASSWORD@cluster.mongodb.net/contact-manager?retryWrites=true&w=majority
   ```
5. Replace `USERNAME` and `PASSWORD` with your database user credentials

### Step 2: Setup Backend

```bash
# Navigate to server directory
cd server

# Copy environment template
cp .env.example .env

# Edit .env and paste your MongoDB Atlas connection string
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/contact-manager?retryWrites=true&w=majority
# PORT=5000
```

**On Windows (using Notepad/VS Code):**
- Open `server/.env`
- Paste your MongoDB connection string
- Save the file

### Step 3: Start Backend Server

```bash
# Install dependencies (first time only)
npm install

# Run development server
npm run dev
```

✅ **Success message:** Backend server is running on http://localhost:5000

### Step 4: Setup Frontend (New Terminal)

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies (first time only)
npm install

# Verify .env is configured (optional, defaults work fine)
# Default API URL is http://localhost:5000 - should match backend port
```

### Step 5: Start Frontend

```bash
# Run development server
npm run dev
```

✅ **Success:** Browser opens http://localhost:5173 automatically

## 📖 Detailed Walkthrough

### Backend Setup

#### Directory Structure
```
server/
├── package.json           # Dependencies and scripts
├── server.js              # Express server & MongoDB connection
├── .env                   # Environment variables (CREATE THIS)
├── .env.example           # Template for .env
│
├── models/
│   └── Contact.js         # Mongoose schema
│
├── routes/
│   └── contacts.js        # API endpoints (6 CRUD operations)
│
└── middleware/
    └── validation.js      # Input validation rules
```

#### MongoDB Atlas Setup Recap
1. Create MongoDB Atlas account (free tier 512MB)
2. Create a cluster (M0 free tier)
3. Create database user with read/write permissions
4. Get SRV connection string with credentials
5. Add 0.0.0.0 to IP whitelist (development only)

#### Starting Backend
```bash
cd server
npm install
npm run dev
```

**Expected Output:**
```
✓ Server running on port 5000
✓ MongoDB connected to: mongodb+srv://...
```

**Test Backend:**
```bash
# In another terminal
curl http://localhost:5000/api/contacts
# Should return: {"success":true,"message":"No contacts yet","data":[]}
```

### Frontend Setup

#### Directory Structure
```
frontend/
├── package.json           # React dependencies
├── vite.config.js         # Vite configuration
├── index.html             # HTML template
├── .env.example           # Environment template
│
└── src/
    ├── main.jsx           # React entry point
    ├── App.jsx            # Main component with state management
    │
    ├── components/
    │   ├── ContactForm.jsx     # Create/edit form
    │   ├── ContactCard.jsx      # Contact display
    │   ├── ContactList.jsx      # Grid container
    │   ├── SearchBar.jsx        # Search input
    │   └── Toast.jsx            # Notifications
    │
    ├── styles/
    │   ├── App.css              # Main layout
    │   ├── ContactForm.css
    │   ├── ContactCard.css
    │   ├── ContactList.css
    │   ├── SearchBar.css
    │   └── Toast.css
    │
    └── utils/
        └── api.js          # Axios API client
```

#### Starting Frontend
```bash
cd frontend
npm install
npm run dev
```

**Expected Output:**
```
✓ VITE v4.x.x  ready in xxx ms
✓ ➜  Local:   http://localhost:5173/
✓ ➜  press h to show help
```

Browser automatically opens to http://localhost:5173

## 🎯 Testing the Application

### Test Sequence

1. **Open Frontend:** http://localhost:5173
2. **Verify Backend Connection:**
   - Green "API Connected" badge in header
   - No error message bar
3. **Create a Contact:**
   - Fill form on left sidebar
   - Click "Add Contact" or "Update Contact"
   - See success toast notification
4. **Verify in Database:**
   - Check MongoDB Atlas Console
   - Contact appears in `contact-manager` database
5. **Search Functionality:**
   - Type in search bar
   - Contacts filter in real-time
6. **Edit Contact:**
   - Click edit button on card
   - Form pre-fills
   - Modify and click "Update Contact"
7. **Delete Contact:**
   - Click delete button
   - Confirm in dialog
   - Contact removed from list

### Common Test Cases

| Test | Steps | Expected Result |
|------|-------|-----------------|
| **Create Contact** | Fill form, click Add | Contact appears in list, toast shows success |
| **Search** | Type name in search bar | List filters to matching contacts |
| **Edit** | Click edit button, modify, update | Form pre-fills, contact updates in DB |
| **Delete** | Click delete, confirm | Contact removed from list and DB |
| **Validation** | Enter invalid email, submit | Error message displays on form |
| **Server Down** | Stop backend, refresh | Red "Offline" badge appears |

## 🔧 Configuration

### Backend Environment (.env)

```env
# Server Port
PORT=5000

# MongoDB Atlas Connection (SRV format recommended)
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/contact-manager?retryWrites=true&w=majority

# Alternative: Local MongoDB
# MONGODB_URI=mongodb://localhost:27017/contact-manager
```

### Frontend Environment (.env)

```env
# API Endpoint (must match backend port)
VITE_API_URL=http://localhost:5000

# Request Timeout (milliseconds)
VITE_API_TIMEOUT=30000

# Optional Application Metadata
VITE_APP_NAME=Contact Manager
VITE_APP_VERSION=1.0.0
```

## 📊 API Reference

### Base URL
```
http://localhost:5000/api/contacts
```

### Endpoints

#### Get All Contacts
```bash
GET /api/contacts
# Returns: { success: true, data: [...contacts] }
```

#### Get Single Contact
```bash
GET /api/contacts/:id
# Returns: { success: true, data: {...contact} }
```

#### Create Contact
```bash
POST /api/contacts
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "1234567890"
}
# Returns: { success: true, data: {...createdContact}, message: "Contact added" }
```

#### Update Contact
```bash
PUT /api/contacts/:id
Content-Type: application/json

{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "phone": "0987654321"
}
# Returns: { success: true, data: {...updatedContact}, message: "Contact updated" }
```

#### Delete Contact
```bash
DELETE /api/contacts/:id
# Returns: { success: true, message: "Contact deleted" }
```

#### Search Contacts
```bash
GET /api/contacts/search?q=john
# Returns: { success: true, data: [...matchingContacts] }
```

### Validation Rules

| Field | Rules |
|-------|-------|
| **Name** | Required, 2-100 chars, no special chars |
| **Email** | Required, valid format, must be unique |
| **Phone** | Required, minimum 7 digits |

### Error Responses

```json
{
  "success": false,
  "message": "Error description",
  "errors": [
    {
      "field": "email",
      "message": "Invalid email format"
    }
  ]
}
```

## 🐛 Troubleshooting

### Backend Issues

**"Error: connect ECONNREFUSED" - MongoDB Connection Failed**
- ✓ Check MongoDB Atlas connection string in .env
- ✓ Verify credentials are correct
- ✓ Ensure IP address is whitelisted (0.0.0.0 for dev)
- ✓ Confirm database user exists and has correct permissions

**"Port 5000 already in use"**
```bash
# Find what's using port 5000
lsof -i :5000  # Mac/Linux
netstat -ano | findstr :5000  # Windows

# Kill the process or change PORT in .env
```

**"Cannot find module 'express'"**
```bash
cd server
npm install  # Reinstall dependencies
```

### Frontend Issues

**"Backend server is not running" Message**
- ✓ Ensure backend is running on http://localhost:5000
- ✓ Check terminal shows "Server running on port 5000"
- ✓ Verify no firewall is blocking localhost:5000
- ✓ Try accessing http://localhost:5000/api/contacts in browser

**"Port 5173 already in use"**
```bash
# Edit vite.config.js and change port
# server: { port: 3000 }
```

**"API requests failing with 404"**
- ✓ Ensure `VITE_API_URL` ends with `/api/contacts`
- ✓ Check backend has `/api/contacts` route defined
- ✓ Verify backend packages are installed (`npm install`)

**"Form not submitting"**
- ✓ Check browser console for errors (F12)
- ✓ Verify input validation passes
- ✓ Ensure backend is responding to POST requests
- ✓ Check browser network tab for API response

### General Issues

**"Port X is in use"**
```bash
# Windows: Change port in config file
# Mac/Linux: Kill process using port
lsof -ti :5000 | xargs kill -9
```

**"Dependencies not installing"**
```bash
# Clear npm cache and reinstall
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

## 🚀 Running in Production

### Build Frontend
```bash
cd frontend
npm run build
```
Creates optimized `dist/` folder with production assets

### Update API URL for Production
Before building, update `.env`:
```env
VITE_API_URL=https://your-production-api.com
```

### Deploy
1. Upload `server/` to hosting (Heroku, Railway, etc.)
2. Upload `frontend/dist/` to static hosting (Netlify, Vercel, etc.)
3. Configure MongoDB Atlas network access for production IPs
4. Update environment variables on hosting platforms

## 📚 Additional Resources

- [MongoDB Atlas Documentation](https://docs.atlas.mongodb.com)
- [Express.js Guide](https://expressjs.com)
- [React Documentation](https://react.dev)
- [Vite Guide](https://vitejs.dev)
- [Axios Documentation](https://axios-http.com)

## 💡 Tips

1. **Keep terminals organized:** Use 2-3 terminal windows (one for backend, one for frontend, one for git)
2. **Check port numbers:** Frontend (5173), Backend (5000)
3. **MongoDB Atlas IP:** Use 0.0.0.0 for development, specific IPs for production
4. **Environment variables:** Never commit `.env` files with credentials
5. **CORS issues:** Already configured in backend, no action needed
6. **Hot reload:** Frontend auto-reloads on file changes, backend needs restart

## ✅ Verification Checklist

Before diving in, ensure:

- [ ] Node.js v16+ installed
- [ ] MongoDB Atlas account created
- [ ] Connection string obtained from Atlas
- [ ] Backend repository files present (server.js, models/, routes/)
- [ ] Frontend repository files present (App.jsx, components/)
- [ ] Both terminal windows ready to run servers

## 🎉 Success!

Once everything is running:

1. Frontend loads at http://localhost:5173
2. Header shows "API Connected" (green badge)
3. Form on left sidebar ready for input
4. No errors in browser console
5. Backend terminal shows active requests

You're ready to manage contacts! 🚀

---

**Questions?** Check the troubleshooting section or review error messages carefully.

**For issues:** Check both backend and frontend consoles, verify API connection, and confirm environment configuration.
