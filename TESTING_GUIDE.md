# Contact Manager MongoDB Integration - Testing Guide

## Step-by-Step Testing Instructions

This guide walks you through testing all features of the integrated Contact Manager with MongoDB backend.

---

## Part 1: Setup & Connection (5 min)

### 1.1 Verify Backend Installation
```bash
cd server
npm install  # If not already done
```

### 1.2 Start MongoDB
**Option A - Local MongoDB:**
```bash
# Windows/macOS terminal
mongod
# Keep this running in a separate terminal
```

**Option B - MongoDB Atlas:**
- No setup needed, uses cloud connection

### 1.3 Create .env File
In the `server` folder, create `.env`:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/contact-manager
```

### 1.4 Start Backend Server
```bash
# From server folder
npm start
```

Expected output:
```
╔════════════════════════════════════════╗
║  Contact Manager API Server           ║
║  Running on: http://localhost:5000    ║
║  MongoDB: mongodb://localhost:27017...║
╚════════════════════════════════════════╝

✓ Connected to MongoDB successfully
```

**✅ Test PASSED**: If you see the connection message

---

## Part 2: Frontend Connection (2 min)

### 2.1 Open Frontend
1. Open `index-api.html` in your browser (NOT index.html)
2. You should see a **green status indicator**: "✅ Connected to MongoDB backend server"

**✅ Test PASSED**: If status shows connected

### 2.2 Check Browser Console
1. Press `F12` to open Developer Tools
2. Check Console tab for any errors
3. Should see networking logs showing API calls

**✅ Test PASSED**: If no error messages appear

---

## Part 3: Create Contact (Data Creation)

### Test Case 3.1: Add Valid Contact

**Steps:**
1. Enter in Form:
   - Name: `John Doe`
   - Email: `john.doe@example.com`
   - Phone: `+1 (555) 123-4567`
2. Click "Add Contact"

**Expected Results:**
- ✅ Green notification: "Contact added successfully!"
- ✅ Success sound plays
- ✅ Form clears
- ✅ Contact appears in list immediately

**Verify in MongoDB:**
```bash
# In another terminal
mongosh  # or mongo
use contact-manager
db.contacts.findOne()
```

### Test Case 3.2: Validation - Empty Fields

**Steps:**
1. Leave all fields empty
2. Click "Add Contact"

**Expected Results:**
- ✅ Red notification: "Please fill in all fields"
- ❌ Contact NOT added

### Test Case 3.3: Validation - Invalid Email

**Steps:**
1. Name: `Jane Smith`
2. Email: `invalid-email` (without @domain)
3. Phone: `555-123-4567`
4. Click "Add Contact"

**Expected Results:**
- ✅ Red notification with specific error
- ✅ Error message: "Please provide a valid email address"
- ❌ Contact NOT added

### Test Case 3.4: Validation - Invalid Phone

**Steps:**
1. Name: `Bob Wilson`
2. Email: `bob@example.com`
3. Phone: `123` (too short, less than 7 digits)
4. Click "Add Contact"

**Expected Results:**
- ✅ Red notification with error
- ✅ Error message: "Please provide a valid phone number"
- ❌ Contact NOT added

### Test Case 3.5: Duplicate Email Prevention

**Steps:**
1. Add: `Alice Brown | alice@example.com | 555-987-6543`
2. Try adding again with same email but different name/phone
3. Click "Add Contact"

**Expected Results:**
- ✅ Red notification: "A contact with this email already exists"
- ❌ Duplicate NOT added
- ✅ Original contact remains unchanged in DB

---

## Part 4: Read & Display (Data Retrieval)

### Test Case 4.1: Display All Contacts

**Steps:**
1. Refresh page
2. Wait for contacts to load

**Expected Results:**
- ✅ All contacts from database appear
- ✅ Each shows: Name, Email, Phone
- ✅ Edit and Delete buttons visible for each

### Test Case 4.2: Search Functionality

**Steps:**
1. Add multiple contacts:
   - John | john@ex.com | 5551234567
   - Jane | jane@ex.com | 5559876543
   - Bob | bob@ex.com | 5555555555

2. In search box, type: `john`

**Expected Results:**
- ✅ Only "John" contact shows
- ❌ Jane and Bob disappear

3. In search box, type: `@ex.com`

**Expected Results:**
- ✅ All 3 contacts show (all have @ex.com)
- ✅ Search is case-insensitive

4. Clear search box

**Expected Results:**
- ✅ All contacts reappear

---

## Part 5: Update Contact (Data Modification)

### Test Case 5.1: Edit Existing Contact

**Setup:**
- Have at least one contact in the list

**Steps:**
1. Click "Edit" button on a contact
2. Form populates with contact details
3. Change Name: `John Doe Updated`
4. Change Phone: `555-555-5555`
5. Click "Update Contact" (button text changed)

**Expected Results:**
- ✅ Green notification: "Contact updated successfully!"
- ✅ Success sound plays
- ✅ Contact list updates immediately
- ✅ Form clears and button returns to "Add Contact"

**Verify in MongoDB:**
```bash
db.contacts.findOne({ email: "john.doe@example.com" })
# Should show updated name and phone
```

### Test Case 5.2: Cancel Edit

**Steps:**
1. Click "Edit" on a contact
2. Form populates
3. Press "Refresh" or manually clear Form
4. Click "Add Contact" (to reset)

**Expected Results:**
- ✅ Form clears
- ✅ Button returns to "Add Contact"
- ❌ Nothing updated

### Test Case 5.3: Edit with Validation Error

**Steps:**
1. Click "Edit" on a contact
2. Change Email to: `invalid-email`
3. Click "Update Contact"

**Expected Results:**
- ✅ Red notification with validation error
- ❌ Contact NOT updated in database
- ✅ Form still has invalid email

---

## Part 6: Delete Contact (Data Deletion)

### Test Case 6.1: Delete Contact

**Setup:**
- Have at least one contact

**Steps:**
1. Click "Delete" button on a contact
2. Confirm deletion in popup: Click OK

**Expected Results:**
- ✅ Green notification: "Contact deleted successfully!"
- ✅ Success sound plays
- ✅ Contact disappears from list immediately
- ✅ Contact removed from MongoDB

**Verify in MongoDB:**
```bash
db.contacts.find()
# Contact should not appear
```

### Test Case 6.2: Cancel Delete

**Steps:**
1. Click "Delete" button
2. Confirm popup: Click CANCEL

**Expected Results:**
- ✅ No notification
- ❌ Contact NOT deleted
- ✅ Contact still in list

---

## Part 7: Advanced Features

### Test Case 7.1: Drag and Drop Reordering

**Setup:**
- Have at least 3 contacts

**Steps:**
1. Click and hold on a contact item
2. Drag it above another contact
3. Release

**Expected Results:**
- ✅ Contact reorders visually
- ✅ Contact item shows as semi-transparent while dragging
- Note: Order is visual only, not persisted to DB

### Test Case 7.2: Audio Effects

**Steps:**
1. Type in any form field
2. Click a button

**Expected Results:**
- ✅ Typing sound plays
- ✅ Click sound plays
- ✅ Success sound plays on successful action
- 🔇 Mute browser to prevent sound

### Test Case 7.3: Persistence Check

**Steps:**
1. Add several contacts
2. Close browser tab/window
3. Reopen `index-api.html`

**Expected Results:**
- ✅ All contacts still appear
- ✅ Data persists in MongoDB

---

## Part 8: Error Handling & Edge Cases

### Test Case 8.1: Server Offline

**Steps:**
1. Stop backend server (Ctrl+C in terminal)
2. Try to add a contact

**Expected Results:**
- ✅ Red notification: "Failed to load contacts..."
- ✅ Clear message to check if server is running

### Test Case 8.2: Name with Apostrophe

**Steps:**
1. Name: `Mary O'Brien`
2. Email: `mary@example.com`
3. Phone: `555-1234567`
4. Submit

**Expected Results:**
- ✅ Contact added successfully
- ✅ Name displays correctly with apostrophe

### Test Case 8.3: Name with Hyphen

**Steps:**
1. Name: `Jean-Claude`
2. Email: `jean@example.com`
3. Phone: `555-1234567`
4. Submit

**Expected Results:**
- ✅ Contact added successfully
- ✅ Hyphenated name accepted

### Test Case 8.4: International Phone Format

**Steps:**
1. Name: `International`
2. Email: `intl@example.com`
3. Phone: `+33 (0) 123 456 789` (French format)
4. Submit

**Expected Results:**
- ✅ Contact added successfully
- ✅ Phone stored with all formatting intact

### Test Case 8.5: Long Name (Near Limit)

**Steps:**
1. Name: `This is a very long name with many words to test the character limit`
   (exactly 100 chars)
2. Email: `long@example.com`
3. Phone: `555-1234567`
4. Submit

**Expected Results:**
- ✅ Contact added successfully
- ✅ Full name displays correctly

### Test Case 8.6: Name Too Long (Over Limit)

**Steps:**
1. Name: `This is a very long name with many words to test the character limit and beyond` 
   (over 100 chars)
2. Email: `toolong@example.com`
3. Phone: `555-1234567`
4. Submit

**Expected Results:**
- ✅ Red notification: "Name cannot exceed 100 characters"
- ❌ Contact NOT added

---

## Part 9: API Direct Testing

### Test Case 9.1: API Health Check

**Steps:**
Open browser console and run:
```javascript
fetch('http://localhost:5000/health')
  .then(r => r.json())
  .then(d => console.log(d))
```

**Expected Results:**
```javascript
{
  status: 'OK',
  message: 'Server is running',
  timestamp: '2024-01-15T...'
}
```

### Test Case 9.2: Get All Contacts via API

**Steps:**
```javascript
fetch('http://localhost:5000/api/contacts')
  .then(r => r.json())
  .then(d => console.table(d.data))
```

**Expected Results:**
- ✅ Table with all contacts
- ✅ Includes _id, name, email, phone, timestamps

### Test Case 9.3: Create via API

**Steps:**
```javascript
fetch('http://localhost:5000/api/contacts', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: 'API Test',
    email: 'api@example.com',
    phone: '555-5555555'
  })
})
.then(r => r.json())
.then(d => console.log(d))
```

**Expected Results:**
```javascript
{
  success: true,
  message: 'Contact created successfully',
  data: { _id: '...', name: 'API Test', ... }
}
```

### Test Case 9.4: API Validation Error

**Steps:**
```javascript
fetch('http://localhost:5000/api/contacts', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: 'Test',
    email: 'invalid-email',
    phone: '123'
  })
})
.then(r => r.json())
.then(d => console.log(d))
```

**Expected Results:**
```javascript
{
  success: false,
  message: 'Validation failed',
  errors: [
    { field: 'email', message: 'Please provide a valid email address' },
    { field: 'phone', message: 'Please provide a valid phone number...' }
  ]
}
```

---

## Test Summary Report

Use this checklist to verify all tests pass:

### Functionality Tests ✅/❌
- [ ] Add new contact
- [ ] Display all contacts
- [ ] Search contacts
- [ ] Edit contact
- [ ] Delete contact
- [ ] Drag and drop reorder

### Validation Tests ✅/❌
- [ ] Empty fields validation
- [ ] Email format validation
- [ ] Phone format validation
- [ ] Name length validation
- [ ] Duplicate email prevention

### Data Persistence ✅/❌
- [ ] Data saved to MongoDB
- [ ] Data survives page refresh
- [ ] Timestamps recorded
- [ ] Updates reflected in DB

### Error Handling ✅/❌
- [ ] Server offline message
- [ ] Validation error messages
- [ ] 404 error handling
- [ ] Duplicate email error

### User Experience ✅/❌
- [ ] Success notifications appear
- [ ] Error notifications appear
- [ ] Form clears after submit
- [ ] Audio effects play
- [ ] Server status indicator works

### API Tests ✅/❌
- [ ] GET /api/contacts works
- [ ] POST /api/contacts works
- [ ] PUT /api/contacts/:id works
- [ ] DELETE /api/contacts/:id works
- [ ] Validation errors returned properly

---

## Performance Testing

### Test Case 10.1: Load Multiple Contacts

**Steps:**
1. Add 50+ contacts via API:
```javascript
for(let i = 0; i < 50; i++) {
  fetch('http://localhost:5000/api/contacts', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: `Contact ${i}`,
      email: `contact${i}@example.com`,
      phone: '555-' + String(i).padStart(7, '0')
    })
  })
}
```

**Expected Results:**
- ✅ All 50 contacts load
- ✅ Search remains fast
- ✅ No browser lag

---

## Troubleshooting Test Failures

| Test Fails | Solution |
|-----------|----------|
| Cannot connect to API | Backend not running - run `npm start` |
| MongoDB connection error | MongoDB not running - start `mongod` |
| Validation always passes | Check if validation middleware is loaded |
| Data doesn't persist | Check MongoDB connection in .env |
| CORS errors | Ensure CORS middleware is in server.js |

---

## Sign Off

When all tests pass, you have successfully:

✅ Integrated MongoDB database  
✅ Created working backend API  
✅ Connected frontend to backend  
✅ Implemented validation  
✅ Implemented error handling  
✅ Verified data persistence  

**Date Tested:** _______________  
**Tester Name:** _______________  
**All Tests Passed:** Yes ☐ / No ☐
