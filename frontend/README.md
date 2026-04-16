# Contact Manager - React Frontend

Modern, professional React-based frontend for the Contact Manager application with MongoDB backend integration.

## 🚀 Features

- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Real-time Search**: Instantly filter contacts by name or email
- **Professional UI**: Modern design with smooth animations and glass-morphism effects
- **Full CRUD Operations**: Create, read, update, and delete contacts
- **Error Handling**: Comprehensive error messages and validation feedback
- **Toast Notifications**: User-friendly success/error notifications
- **Loading States**: Visual feedback during API operations
- **Edit Mode**: Inline editing with form pre-population
- **Server Status**: Real-time backend connection indicator

## 📋 Prerequisites

- Node.js (v16 or higher)
- npm (v8 or higher)
- Backend server running on http://localhost:5000

## 🔧 Installation

1. **Navigate to frontend directory:**
   ```bash
   cd frontend
   ```

2. **Copy environment file:**
   ```bash
   cp .env.example .env
   ```
   > No changes needed if using default localhost:5000

3. **Install dependencies:**
   ```bash
   npm install
   ```

## 🏃 Running the Application

### Development Mode
```bash
npm run dev
```
Starts Vite dev server at http://localhost:5173 with:
- Hot Module Replacement (HMR)
- Instant live updates on file changes
- Browser auto-opens

### Production Build
```bash
npm run build
```
Creates optimized build in `dist/` folder with minified assets

### Preview Build
```bash
npm run preview
```
Serves the production build locally for testing

## 📁 Project Structure

```
frontend/
├── index.html              # HTML entry point
├── vite.config.js          # Vite configuration
├── package.json            # Dependencies and scripts
├── .env.example            # Environment template
├── .gitignore              # Git ignore rules
│
└── src/
    ├── main.jsx            # React entry point
    ├── App.jsx             # Main app component
    │
    ├── components/         # Reusable React components
    │   ├── ContactForm.jsx      # Create/edit form
    │   ├── ContactCard.jsx      # Single contact display
    │   ├── ContactList.jsx      # List container
    │   ├── SearchBar.jsx        # Search input
    │   └── Toast.jsx            # Notifications
    │
    ├── styles/             # CSS modules and styling
    │   ├── App.css              # Main app styles
    │   ├── ContactForm.css      # Form styling
    │   ├── ContactCard.css      # Card styling
    │   ├── ContactList.css      # List styling
    │   ├── SearchBar.css        # Search styling
    │   └── Toast.css            # Toast styling
    │
    ├── utils/              # Utility functions
    │   └── api.js               # API client (axios)
    │
    └── hooks/              # Custom React hooks
        └── (placeholder for future hooks)
```

## 🔌 API Integration

The app connects to the backend API at `http://localhost:5000/api/contacts`

### Configured Endpoints

| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | `/api/contacts` | Get all contacts |
| GET | `/api/contacts/:id` | Get single contact |
| POST | `/api/contacts` | Create new contact |
| PUT | `/api/contacts/:id` | Update contact |
| DELETE | `/api/contacts/:id` | Delete contact |
| GET | `/api/contacts/search?q=term` | Search contacts |

## 🎨 Styling

The application uses:
- **CSS Modules** for component-scoped styling
- **CSS Variables** for theme consistency
- **Flexbox & Grid** for responsive layouts
- **Lucide Icons** (lucide-react) for professional icons
- **Animations** for smooth transitions and hover effects

### Color Theme
```css
--primary: #3b82f6          /* Blue */
--primary-dark: #2563eb    /* Dark Blue */
--success: #10b981         /* Green */
--error: #ef4444           /* Red */
--text-primary: #1f2937    /* Dark Gray */
--text-secondary: #6b7280  /* Medium Gray */
--border: #e5e7eb          /* Light Gray */
--background: #f9fafb      /* Off White */
--white: #ffffff           /* White */
```

## 🧩 Components

### App.jsx
Main application component managing:
- Global state (contacts, search, editing, notifications)
- API communication and error handling
- Server connection monitoring
- Toast notification system
- Layout structure

### ContactForm
Form for creating and editing contacts:
- Name, email, phone inputs
- Real-time validation feedback
- Icon integration for each field
- Submit button text changes (Add vs Update)
- Cancel editing button

### ContactCard
Displays individual contact information:
- Contact details with icons
- Formatted creation date
- Edit and delete action buttons
- Loading state during operations
- Hover effects for better UX

### ContactList
Container for displaying contacts:
- Grid layout (responsive: 1-3 columns)
- Empty state message with icon
- Loading spinner with animation
- Smooth entrance animations for cards

### SearchBar
Real-time search functionality:
- Debounce-ready input field
- Clear button (X icon)
- Loading indicator
- Magnifying glass icon
- Responsive sizing

### Toast
Non-intrusive notification system:
- Success (green) notifications
- Error (red) notifications
- Info (blue) notifications
- Auto-dismiss after 3 seconds
- Close button for manual dismissal

## 🔒 Environment Variables

Create `.env` file from `.env.example`:

```env
# API endpoint (default: http://localhost:5000)
VITE_API_URL=http://localhost:5000

# Request timeout in milliseconds (default: 30000)
VITE_API_TIMEOUT=30000

# Application metadata
VITE_APP_NAME=Contact Manager
VITE_APP_VERSION=1.0.0
```

Access in code: `import.meta.env.VITE_API_URL`

## 🐛 Troubleshooting

### Port Already in Use
If port 5173 is in use, modify `vite.config.js`:
```javascript
server: {
  port: 3000,  // Change to any available port
}
```

### Backend Connection Error
1. Check backend server is running: `http://localhost:5000`
2. Verify CORS is configured in backend
3. Check network tab in DevTools for blocked requests
4. Ensure `VITE_API_URL` matches backend location

### Hot Reload Not Working
1. Clear node_modules: `rm -rf node_modules && npm install`
2. Restart dev server: stop and run `npm run dev` again
3. Clear browser cache (Ctrl+Shift+Del)

### Build Fails
1. Clear dist folder: `rm -rf dist`
2. Reinstall dependencies: `npm ci`
3. Run build again: `npm run build`

## 📦 Dependencies

### Production
- **react** (18.2.0): UI framework
- **react-dom** (18.2.0): React DOM renderer
- **axios** (1.6.0): HTTP client
- **lucide-react** (0.263.1): Professional icon library

### Development
- **vite** (4.4.0): Build tool and dev server
- **@vitejs/plugin-react** (4.0.0): React support for Vite

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Output
Production-ready files in `dist/` folder:
- Minified JavaScript
- Optimized CSS
- Processed images and assets
- Source maps (optional)

### Serve Production Build
```bash
npm run preview
```

### Deploy to Hosting
1. Upload `dist/` contents to web server
2. Update `VITE_API_URL` in environment or during build
3. Ensure backend API is accessible from hosting location

## 💡 Tips & Best Practices

1. **Always start backend first** before running frontend
2. **Use .env for configuration** - don't hardcode API URLs
3. **Check console for errors** - browser DevTools helps debugging
4. **Test on mobile** - responsive design should work across devices
5. **Clear browser cache** if seeing outdated code after updates

## 📄 License

Part of the Contact Manager full-stack application.
Frontend built with React and Vite for optimal performance.

## 🤝 Support

For issues or questions:
1. Check error messages in browser console
2. Verify backend is running and accessible
3. Ensure all dependencies are installed
4. Review environment configuration

---

**Happy managing contacts! 🚀**
