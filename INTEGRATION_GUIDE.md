# Contact Manager - MongoDB Backend Integration Guide

## Project Overview

This project integrates your Contact Manager frontend form with a MongoDB database via a Node.js/Express backend server. The integration includes:

- **Backend Server**: Express.js API for CRUD operations
- **Database**: MongoDB for persistent data storage
- **Frontend**: Updated JavaScript to use API endpoints instead of localStorage
- **Validation**: Server-side and client-side data validation
- **Error Handling**: Comprehensive error handling and user notifications

## Project Structure

```
postlab 6/
├── server/                          # Backend server
│   ├── server.js                   # Main server file
│   ├── package.json                # Dependencies
│   ├── .env.example                # Environment variables template
│   ├── routes/
│   │   └── contacts.js             # API endpoints (CRUD)
│   ├── models/
│   │   └── Contact.js              # MongoDB schema
│   └── middleware/
│       └── validation.js           # Validation and error handling
│
├── index.html                       # Original frontend (localStorage)
├── index-api.html                   # Updated frontend (API version)
├── script.js                        # Original script (localStorage)
├── script-api.js                    # Updated script (API version)
├── style.css                        # Shared styling
└── README.md                        # This file
```

## Prerequisites

Before setting up, ensure you have:

1. **Node.js** (v14 or higher) - [Download](https://nodejs.org/)
2. **MongoDB Database** (choose one):
   - **⭐ RECOMMENDED: MongoDB Atlas (Cloud)** - [Sign up FREE](https://www.mongodb.com/cloud/atlas)
     - No installation needed
     - Free tier includes 512 MB storage
     - Perfect for development and testing
   - **Local MongoDB** - [Install](https://docs.mongodb.com/manual/installation/)
     - Requires local installation
     - Best for development only
3. **npm** (comes with Node.js)

## Setup Instructions

### Step 1: Install Backend Dependencies

```bash
cd server
npm install
```

This installs:
- `express`: Web framework
- `mongoose`: MongoDB ODM
- `dotenv`: Environment variables
- `cors`: Cross-origin requests
- `express-validator`: Input validation

### Step 2: Configure MongoDB Connection

#### ⭐ RECOMMENDED: Option A - MongoDB Atlas (Cloud)

**No local installation needed! No MongoDB service to run!**

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create FREE account (takes 2 minutes)
3. Create a free cluster (wait ~3 minutes)
4. Add a database user with username & password
5. Whitelist your IP address
6. Get your connection string from "Connect your application"
7. Create `.env` file in the `server` folder:
   ```
   PORT=5000
   MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/contact-manager?retryWrites=true&w=majority
   ```
8. Replace `username`, `password`, and `cluster0.xxxxx` with your actual values

**👉 [Detailed MongoDB Atlas Setup Guide →](MONGODB_ATLAS_SETUP.md)**

#### Option B: Local MongoDB (Advanced)

Only if you have MongoDB installed locally:

1. Start MongoDB service:
   - **Windows (PowerShell)**: 
     ```powershell
     mongod
     ```
   - **macOS**: 
     ```bash
     brew services start mongodb-community
     ```
   - **Linux**: 
     ```bash
     sudo systemctl start mongod
     ```

2. Create `.env` file in the `server` folder:
   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/contact-manager
   ```

### Step 3: Start the Backend Server

```bash
# From the server folder
npm start

# Or use nodemon for development (auto-reload)
npm run dev
```

**Expected output:**
```
╔════════════════════════════════════════╗
║  Contact Manager API Server           ║
║  Running on: http://localhost:5000    ║
║  MongoDB: mongodb+srv://...           ║
╚════════════════════════════════════════╝

✓ Connected to MongoDB successfully
```

### Step 4: Run the Frontend

1. Open `index-api.html` in your web browser (the API version, not the original)
2. You should see a green notification: "✅ Connected to MongoDB backend server"

## API Endpoints Reference

### Base URL: `http://localhost:5000/api/contacts`

#### 1. Get All Contacts
```
GET /api/contacts
```
**Response:**
```json
{
  "success": true,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "name": "John Doe",
      "email": "john@example.com",
      "phone": "+1 (555) 123-4567",
      "createdAt": "2024-01-15T10:30:00.000Z",
      "updatedAt": "2024-01-15T10:30:00.000Z"
    }
  ],
  "count": 1
}
```

#### 2. Get Contact by ID
```
GET /api/contacts/:id
```
**Example:** `GET /api/contacts/507f1f77bcf86cd799439011`

#### 3. Create Contact
```
POST /api/contacts
Content-Type: application/json

{
  "name": "Jane Smith",
  "email": "jane@example.com",
  "phone": "+1 (555) 987-6543"
}
```
**Response (201 Created):**
```json
{
  "success": true,
  "message": "Contact created successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439012",
    "name": "Jane Smith",
    "email": "jane@example.com",
    "phone": "+1 (555) 987-6543"
  }
}
```

#### 4. Update Contact
```
PUT /api/contacts/:id
Content-Type: application/json

{
  "name": "Updated Name",
  "email": "updated@example.com",
  "phone": "+1 (555) 111-2222"
}
```

#### 5. Delete Contact
```
DELETE /api/contacts/:id
```
**Response:**
```json
{
  "success": true,
  "message": "Contact deleted successfully",
  "data": { ... }
}
```

#### 6. Search Contacts
```
GET /api/contacts/search/query?q=john
```

## Data Validation Rules

The system enforces strict validation on all form inputs:

### Name Field
- **Required**: Must not be empty
- **Length**: 2-100 characters
- **Format**: Letters, spaces, hyphens, and apostrophes only
- **Example**: "Mary O'Brien", "Jean-Claude Dupont"

### Email Field
- **Required**: Must not be empty
- **Format**: Must be a valid email address
- **Uniqueness**: No duplicate emails in the database
- **Example**: "john.doe@example.com"

### Phone Number
- **Required**: Must not be empty
- **Length**: At least 7 digits
- **Format**: Digits, spaces, hyphens, parentheses, and + prefix allowed
- **Examples**: 
  - "555-123-4567"
  - "(555) 123-4567"
  - "+1 555 123 4567"
  - "5551234567"

## Error Handling

All errors are handled gracefully with descriptive messages:

### Validation Error (400)
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "email",
      "message": "Please provide a valid email address"
    },
    {
      "field": "phone",
      "message": "Please provide a valid phone number (at least 7 digits)"
    }
  ]
}
```

### Duplicate Email Error (400)
```json
{
  "success": false,
  "message": "A contact with this email already exists",
  "errors": [
    {
      "field": "email",
      "message": "Email must be unique"
    }
  ]
}
```

### Not Found Error (404)
```json
{
  "success": false,
  "message": "Contact not found"
}
```

### Server Error (500)
```json
{
  "success": false,
  "message": "Server error occurred"
}
```

## Testing the Integration

### Using Browser Console

```javascript
// Test API connection
fetch('http://localhost:5000/health')
  .then(res => res.json())
  .then(data => console.log(data));

// Get all contacts
fetch('http://localhost:5000/api/contacts')
  .then(res => res.json())
  .then(data => console.log(data));

// Create a contact
fetch('http://localhost:5000/api/contacts', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: 'Test User',
    email: 'test@example.com',
    phone: '555-123-4567'
  })
})
.then(res => res.json())
.then(data => console.log(data));
```

### Using cURL (Command Line)

```bash
# Get all contacts
curl http://localhost:5000/api/contacts

# Create contact
curl -X POST http://localhost:5000/api/contacts \
  -H "Content-Type: application/json" \
  -d '{"name":"John","email":"john@example.com","phone":"555-123-4567"}'

# Update contact (replace ID)
curl -X PUT http://localhost:5000/api/contacts/[CONTACT_ID] \
  -H "Content-Type: application/json" \
  -d '{"name":"Updated","email":"new@example.com","phone":"555-987-6543"}'

# Delete contact
curl -X DELETE http://localhost:5000/api/contacts/[CONTACT_ID]
```

## Features Implemented

✅ **Backend Server Setup**
- Express.js server running on port 5000
- CORS enabled for frontend communication
- Health check endpoint

✅ **MongoDB Integration**
- Mongoose schema with validation
- Automatic timestamps (createdAt, updatedAt)
- Unique email constraint

✅ **API Endpoints**
- GET all contacts
- GET contact by ID
- POST create contact
- PUT update contact
- DELETE contact
- Advanced search functionality

✅ **Data Validation**
- Server-side validation using express-validator
- Mongoose schema validation
- Email format validation
- Phone number format validation
- Duplicate email prevention

✅ **Error Handling**
- Comprehensive error responses
- User-friendly notification system
- Detailed validation error messages
- Server error handling

✅ **Frontend Integration**
- API calls replacing localStorage
- Real-time notifications
- Loading states
- Server status indicator

## Troubleshooting

### Server Won't Start
**Error**: `Error: connect ECONNREFUSED 127.0.0.1:27017`
- **Solution**: Make sure MongoDB is running. Start it with `mongod` (Windows/macOS) or check [MongoDB docs](https://docs.mongodb.com/manual/administration/install-community/) for your OS.

### CORS Errors
**Error**: `Cross-Origin Request Blocked`
- **Solution**: CORS is already enabled in the server. If using a different frontend URL, update the CORS origin in `server.js`.

### Page Shows "Connecting to server..."
**Error**: Server status stays yellow/connecting
- **Solution**: 
  1. Check if backend server is running (`npm start`)
  2. Verify MongoDB connection
  3. Open browser console (F12) for error details

### Validation Errors
**Error**: Form doesn't submit with red notifications
- **Check**: 
  - Email format is valid (john@example.com)
  - Phone has at least 7 digits
  - Name is 2-100 characters with only allowed characters

## Next Steps

1. **Deploy MongoDB Atlas**: Use cloud database for production
2. **Authentication**: Add user login/registration
3. **Advanced Features**: 
   - Contact categories/groups
   - Profile pictures
   - Call/message integration
4. **Frontend Framework**: Migrate to React/Vue for scalability
5. **Testing**: Add automated tests with Jest/Mocha

## Deployment

For production deployment:
1. Deploy backend to Heroku, Azure, or AWS
2. Use MongoDB Atlas for database
3. Update frontend API URL to production server
4. Add authentication and rate limiting

## Support

For more information:
- [Express Documentation](https://expressjs.com/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [Mongoose Documentation](https://mongoosejs.com/)
