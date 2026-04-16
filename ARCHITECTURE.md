# Contact Manager - System Architecture

## System Diagram

```
┌─────────────────────────────────────────────────────────────────────┐
│                         BROWSER (Client)                            │
│  ┌───────────────────────────────────────────────────────────────┐  │
│  │                    index-api.html (UI)                         │  │
│  │  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐        │  │
│  │  │  Add Form    │  │  Contact     │  │  Search Box  │        │  │
│  │  │  · Name      │  │  List        │  │  · Filter    │        │  │
│  │  │  · Email     │  │  · Edit      │  │  · Display   │        │  │
│  │  │  · Phone     │  │  · Delete    │  │              │        │  │
│  │  └──────────────┘  └──────────────┘  └──────────────┘        │  │
│  └───────────────────────────────────────────────────────────────┘  │
│                             ▲                                        │
│                             │                                        │
│                    script-api.js (JS Logic)                         │
│                   - Fetch API calls                                  │
│                   - Form handling                                    │
│                   - Notifications                                    │
│                   - Error handling                                   │
│                             │                                        │
│                             ▼                                        │
│                    HTTP/CORS Request-Response                       │
│                             │                                        │
│                             │                                        │
└─────────────────────────────┼──────────────────────────────────────┘
                              │
                              │ (GET, POST, PUT, DELETE)
                              │ (JSON)
                              │
┌─────────────────────────────┼──────────────────────────────────────┐
│                             ▼                                        │
│              ┌──────────────────────────────┐                      │
│              │   EXPRESS.JS SERVER          │                      │
│              │   (Node.js Runtime)          │                      │
│              │   - Port 5000                │                      │
│              └──────────────────────────────┘                      │
│                             ▲                                        │
│                             │                                        │
│              ┌────────────────────────────────┐                    │
│              │  MIDDLEWARE STACK              │                    │
│              ├────────────────────────────────┤                    │
│              │  1. CORS Middleware            │                    │
│              │  2. JSON Parser                │                    │
│              │  3. Validation Middleware      │                    │
│              │  4. Error Handler              │                    │
│              └────────────────────────────────┘                    │
│                             │                                        │
│              ┌────────────────────────────────┐                    │
│              │  ROUTE HANDLERS                │                    │
│              │  (/api/contacts)               │                    │
│              ├────────────────────────────────┤                    │
│              │  GET    / - Get all            │                    │
│              │  GET    /:id - Get one         │                    │
│              │  POST   / - Create             │                    │
│              │  PUT    /:id - Update          │                    │
│              │  DELETE /:id - Delete          │                    │
│              │  GET    /search - Search       │                    │
│              └────────────────────────────────┘                    │
│                             │                                        │
│              ┌────────────────────────────────┐                    │
│              │  VALIDATION LAYER              │                    │
│              │ (express-validator)            │                    │
│              ├────────────────────────────────┤                    │
│              │  • Email format check          │                    │
│              │  • Phone format check          │                    │
│              │  • Name length check           │                    │
│              │  • Duplicate prevention        │                    │
│              └────────────────────────────────┘                    │
│                             │                                        │
│              ┌────────────────────────────────┐                    │
│              │  MODEL LAYER (Mongoose)        │                    │
│              │  (Contact Schema)              │                    │
│              ├────────────────────────────────┤                    │
│              │  name: String (required)       │                    │
│              │  email: String (unique)        │                    │
│              │  phone: String (required)      │                    │
│              │  timestamps: Auto              │                    │
│              └────────────────────────────────┘                    │
│                             │                                        │
│                             ▼                                        │
│              ┌────────────────────────────────┐                    │
│              │  MONGODB DATABASE              │                    │
│              │  (Mongoose Connection)         │                    │
│              ├────────────────────────────────┤                    │
│              │  Database: contact-manager     │                    │
│              │  Collection: contacts          │                    │
│              │                                │                    │
│              │  Documents stored:             │                    │
│              │  {                             │                    │
│              │    _id: ObjectId               │                    │
│              │    name: "John Doe"            │                    │
│              │    email: "john@ex.com"        │                    │
│              │    phone: "555-1234567"        │                    │
│              │    createdAt: Timestamp        │                    │
│              │    updatedAt: Timestamp        │                    │
│              │  }                             │                    │
│              └────────────────────────────────┘                    │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

This comprehensive architecture diagram shows how all the components of your Contact Manager system work together seamlessly!
