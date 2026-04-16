// --- API CONFIGURATION ---
const API_BASE_URL = 'http://localhost:5000/api/contacts';

// --- AUDIO SYSTEM ---
let audioContext;
let typingSoundBuffer;
let clickSoundBuffer;
let successSoundBuffer;

function initAudio() {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
    createTypingSound();
    createClickSound();
    createSuccessSound();
}

function createTypingSound() {
    const duration = 0.08;
    const sampleRate = audioContext.sampleRate;
    const numSamples = duration * sampleRate;
    const buffer = audioContext.createBuffer(1, numSamples, sampleRate);
    const channelData = buffer.getChannelData(0);

    for (let i = 0; i < numSamples; i++) {
        const t = i / sampleRate;
        const frequency = 900 + Math.random() * 300;
        channelData[i] = Math.sin(2 * Math.PI * frequency * t) * Math.exp(-t * 12) * 0.08;
    }
    typingSoundBuffer = buffer;
}

function createClickSound() {
    const duration = 0.15;
    const sampleRate = audioContext.sampleRate;
    const numSamples = duration * sampleRate;
    const buffer = audioContext.createBuffer(1, numSamples, sampleRate);
    const channelData = buffer.getChannelData(0);

    for (let i = 0; i < numSamples; i++) {
        const t = i / sampleRate;
        const frequency = 600 - (t * 200);
        channelData[i] = Math.sin(2 * Math.PI * frequency * t) * Math.exp(-t * 8) * 0.12;
    }
    clickSoundBuffer = buffer;
}

function createSuccessSound() {
    const duration = 0.3;
    const sampleRate = audioContext.sampleRate;
    const numSamples = duration * sampleRate;
    const buffer = audioContext.createBuffer(1, numSamples, sampleRate);
    const channelData = buffer.getChannelData(0);

    for (let i = 0; i < numSamples; i++) {
        const t = i / sampleRate;
        const frequency = 400 + (t * 300);
        channelData[i] = Math.sin(2 * Math.PI * frequency * t) * Math.exp(-t * 4) * 0.1;
    }
    successSoundBuffer = buffer;
}

function playTypingSound() {
    if (!audioContext) return;
    const source = audioContext.createBufferSource();
    source.buffer = typingSoundBuffer;
    source.connect(audioContext.destination);
    source.start();
}

function playClickSound() {
    if (!audioContext) return;
    const source = audioContext.createBufferSource();
    source.buffer = clickSoundBuffer;
    source.connect(audioContext.destination);
    source.start();
}

function playSuccessSound() {
    if (!audioContext) return;
    const source = audioContext.createBufferSource();
    source.buffer = successSoundBuffer;
    source.connect(audioContext.destination);
    source.start();
}

// --- STATE & DOM ELEMENTS ---
let contacts = [];
let editingContactId = null;
const contactForm = document.getElementById('contactForm');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const phoneInput = document.getElementById('number');
const contactList = document.getElementById('contactList');
const submitBtn = document.getElementById('submitBtn');
const searchInput = document.getElementById('searchInput');
const feedbackElement = document.getElementById('feedback');

// --- NOTIFICATION SYSTEM ---
function showNotification(message, type = 'success') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Style the notification
    Object.assign(notification.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        padding: '15px 20px',
        borderRadius: '8px',
        backgroundColor: type === 'success' ? '#10b981' : '#ef4444',
        color: 'white',
        zIndex: '9999',
        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
        animation: 'slideIn 0.3s ease'
    });
    
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add animation styles
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(400px); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(400px); opacity: 0; }
    }
`;
document.head.appendChild(style);

// --- INITIALIZE AUDIO ON INTERACTION ---
document.addEventListener('keydown', () => {
    if (!audioContext) initAudio();
}, { once: true });

// Attach sounds to all inputs
document.querySelectorAll('input').forEach(input => {
    input.addEventListener('keydown', playTypingSound);
});

// Attach click sounds to buttons
document.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', playClickSound);
});

// --- CORE API FUNCTIONS ---

// 1. Fetch all contacts from API
async function fetchContacts(filter = "") {
    try {
        const response = await fetch(API_BASE_URL);
        
        if (!response.ok) {
            throw new Error('Failed to fetch contacts');
        }

        const result = await response.json();
        contacts = result.data || [];
        renderContacts(filter);
    } catch (error) {
        console.error('Error fetching contacts:', error);
        showNotification('Failed to load contacts. Please check if the server is running.', 'error');
    }
}

// 2. Render contacts with filtering
function renderContacts(filter = "") {
    contactList.innerHTML = '';
    
    const filteredContacts = contacts.filter(contact => {
        return contact.name.toLowerCase().includes(filter.toLowerCase()) || 
               contact.email.toLowerCase().includes(filter.toLowerCase());
    });

    if (filteredContacts.length === 0) {
        contactList.innerHTML = '<p style="text-align: center; color: #999; padding: 20px;">No contacts found</p>';
        return;
    }

    filteredContacts.forEach((contact) => {
        const div = document.createElement('div');
        div.className = 'contact-item';
        div.draggable = true;
        div.dataset.id = contact._id;
        
        div.innerHTML = `
            <div class="contact-info">
                <strong>${contact.name}</strong>
                <small>${contact.email} | ${contact.phone}</small>
            </div>
            <div class="btn-group">
                <button class="edit-btn" onclick="editContact('${contact._id}')">Edit</button>
                <button class="delete-btn" onclick="deleteContact('${contact._id}')">Delete</button>
            </div>
        `;

        // Drag events
        div.addEventListener('dragstart', () => div.classList.add('dragging'));
        div.addEventListener('dragend', () => div.classList.remove('dragging'));

        contactList.appendChild(div);
    });
}

// 3. Add/Update Contact
contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const phone = phoneInput.value.trim();

    if (!name || !email || !phone) {
        showNotification('Please fill in all fields', 'error');
        return;
    }

    try {
        const method = editingContactId ? 'PUT' : 'POST';
        const url = editingContactId 
            ? `${API_BASE_URL}/${editingContactId}` 
            : API_BASE_URL;

        const response = await fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, phone })
        });

        const result = await response.json();

        if (!response.ok) {
            const errorMessages = result.errors 
                ? result.errors.map(e => e.message || e).join(', ')
                : result.message;
            showNotification(errorMessages, 'error');
            return;
        }

        showNotification(
            editingContactId 
                ? 'Contact updated successfully!' 
                : 'Contact added successfully!',
            'success'
        );
        playSuccessSound();
        
        contactForm.reset();
        editingContactId = null;
        submitBtn.textContent = 'Add Contact';
        
        fetchContacts(searchInput.value);
    } catch (error) {
        console.error('Error saving contact:', error);
        showNotification('Error saving contact. Please try again.', 'error');
    }
});

// 4. Edit Contact
window.editContact = async (id) => {
    try {
        const response = await fetch(`${API_BASE_URL}/${id}`);
        
        if (!response.ok) {
            showNotification('Failed to load contact', 'error');
            return;
        }

        const result = await response.json();
        const contact = result.data;

        nameInput.value = contact.name;
        emailInput.value = contact.email;
        phoneInput.value = contact.phone;
        editingContactId = id;
        submitBtn.textContent = 'Update Contact';
        
        window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
        console.error('Error loading contact:', error);
        showNotification('Error loading contact', 'error');
    }
};

// 5. Delete Contact
window.deleteContact = async (id) => {
    if (!confirm('Are you sure you want to delete this contact?')) {
        return;
    }

    try {
        const response = await fetch(`${API_BASE_URL}/${id}`, {
            method: 'DELETE'
        });

        if (!response.ok) {
            showNotification('Failed to delete contact', 'error');
            return;
        }

        showNotification('Contact deleted successfully!', 'success');
        playSuccessSound();
        fetchContacts(searchInput.value);
    } catch (error) {
        console.error('Error deleting contact:', error);
        showNotification('Error deleting contact', 'error');
    }
};

// 6. Search Contacts
searchInput.addEventListener('input', (e) => {
    renderContacts(e.target.value);
});

// 7. Drag and Drop Reordering
contactList.addEventListener('dragover', e => {
    e.preventDefault();
    const draggingItem = document.querySelector('.dragging');
    const siblings = [...contactList.querySelectorAll('.contact-item:not(.dragging)')];
    
    const nextSibling = siblings.find(sibling => {
        return e.clientY <= sibling.offsetTop + sibling.offsetHeight / 2;
    });

    contactList.insertBefore(draggingItem, nextSibling);
});

// Initial Load
window.addEventListener('DOMContentLoaded', () => {
    fetchContacts();
});
