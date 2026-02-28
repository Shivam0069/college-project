# Student Club Management System

A complete React-based Student Club Management System built with Next.js 16, React 19, and Tailwind CSS. The application provides public pages, student portal, and admin dashboard for managing club activities, notices, study materials, and events.

## Project Structure

```
/app
  /student - Student portal pages
    /dashboard - Student dashboard
    /notices - View club notices
    /materials - Download study materials
    /events - View club events
    /profile - Student profile management
  /admin - Admin management pages
    /dashboard - Admin dashboard
    /students
      /pending - Approve pending students
      /approved - View approved students
    /notices - Create/manage notices
    /materials - Upload study materials
    /events - Create/manage events
    /gallery - Manage gallery images
    /profile - Admin profile
  /login - Student/Admin login page
  /register - Student registration page
  /about - About club page
  /activities - Club activities page
  /team - Club team page
  /events - Public events page
  /gallery - Public gallery page
  /contact - Contact page

/components
  /custom - Reusable UI components (Button, Input, Modal, Card, Table, etc.)
  /layouts - Layout components for different sections
  ProtectedRoute.jsx - Route protection for authenticated pages

/lib
  /contexts
    AuthContext.jsx - Authentication and user management context
    ClubContext.jsx - Club content management context
  /hooks
    useAuth.js - Hook to use AuthContext
    useClub.js - Hook to use ClubContext
  /constants
    dummyData.js - All dummy data for testing

/styles
  globals.css - Global styles and Tailwind configuration
```

## Features

### Public Pages
- **Home**: Hero section, club activities, statistics
- **About**: Club mission, vision, values, and history
- **Activities**: Detailed information about club activities
- **Team**: Meet the club leadership team
- **Events**: Browse upcoming and past club events
- **Gallery**: View club event photos
- **Contact**: Contact form and club information

### Authentication
- **Login**: Admin and student login with demo credentials
- **Register**: Student registration with admin approval flow
- **Protected Routes**: Role-based access control (Admin/Student)

### Student Portal
- **Dashboard**: Quick overview of notices, materials, events
- **Notices**: View all club announcements and notices
- **Study Materials**: Download learning resources by category
- **Events**: Browse and track upcoming events
- **Profile**: View and manage student account

### Admin Panel
- **Dashboard**: Overview of system statistics and pending tasks
- **Student Approval**: Review and approve pending student registrations
- **Approved Students**: View all approved members
- **Notices**: Create, view, and delete club notices
- **Materials**: Upload and manage study materials
- **Events**: Create and manage club events
- **Gallery**: Upload and manage gallery images
- **Profile**: Admin account management

## Context Functions

### AuthContext
Authentication and user management with the following functions:

```javascript
loginUser(email, password)           // Login user
registerStudent(studentData)        // Register new student
logoutUser()                         // Logout current user
approveStudent(studentId)           // Admin: approve student
rejectStudent(studentId)            // Admin: reject student
getStudentById(studentId)           // Get student details
```

### ClubContext
Club content management with functions for:

**Notices:**
```javascript
addNotice(noticeData)              // Create new notice
removeNotice(noticeId)             // Delete notice
getNoticesByClub()                 // Fetch all notices
```

**Study Materials:**
```javascript
uploadMaterial(materialData)       // Upload study material
removeMaterial(materialId)         // Delete material
getMaterialsByClub()               // Get all materials
getMaterialsByCategory(category)   // Filter by category
incrementDownload(materialId)      // Track downloads
```

**Events:**
```javascript
addEvent(eventData)                // Create event
deleteEvent(eventId)               // Delete event
getEventsByClub()                  // Get all events
updateEventAttendees(eventId, count) // Update attendance
```

**Gallery:**
```javascript
uploadGalleryImage(imageData)      // Add gallery image
removeGalleryImage(imageId)        // Remove image
getGalleryImages()                 // Get all images
```

## Custom UI Components

All components are built with Tailwind CSS and no external UI libraries:

- **Button**: Customizable button with variants (primary, secondary, danger, success, outline)
- **Input**: Text input with label, error handling, and validation
- **Textarea**: Multi-line text input for longer content
- **Select**: Dropdown select component
- **Card**: Container component with optional hover effect
- **Modal**: Modal dialog for forms and confirmations
- **Table**: Responsive table component with header, body, and pagination
- **Navbar**: Navigation bar with responsive mobile menu
- **Sidebar**: Collapsible sidebar for navigation

## Demo Credentials

### Admin Login
- **Email**: admin@club.com
- **Password**: admin123

### Student Login
- **Email**: student@email.com
- **Password**: student123

### New Student Registration
Students can register and their accounts will be pending until admin approval.

## Data Persistence

The application uses localStorage for data persistence:
- User authentication state
- Student registration data
- Notices and announcements
- Study materials
- Events and gallery images
- Admin actions are immediately reflected in the UI

All data is stored in the browser's localStorage and persists across sessions.

## Technology Stack

- **Framework**: Next.js 16
- **React**: Version 19
- **Styling**: Tailwind CSS 4
- **State Management**: React Context API
- **Language**: JavaScript (JSX)
- **Routing**: Next.js App Router
- **Storage**: Browser localStorage

## Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   # or
   pnpm install
   ```

2. **Run development server**:
   ```bash
   npm run dev
   # or
   pnpm dev
   ```

3. **Open browser**:
   Navigate to `http://localhost:3000`

4. **Login with demo credentials** (see Demo Credentials section)

## File Structure Explanation

- **Components are modular**: Each UI component is independent and reusable
- **Contexts handle state**: AuthContext and ClubContext manage all application state
- **Layouts provide structure**: PublicLayout, StudentLayout, AdminLayout define page structure
- **ProtectedRoute ensures security**: Routes are protected based on user role
- **Dummy data provides initialization**: All demo data is in one file for easy modification

## Customization

### Adding New Notices
```javascript
const { addNotice } = useClub();
addNotice({
  title: 'Notice Title',
  content: 'Notice content...',
  category: 'General'
});
```

### Adding New Students
```javascript
const { registerStudent } = useAuth();
registerStudent({
  name: 'Student Name',
  email: 'student@example.com',
  password: 'password123',
  roll: 'CS101',
  department: 'Computer Science'
});
```

### Creating Events
```javascript
const { addEvent } = useClub();
addEvent({
  title: 'Event Name',
  description: 'Event description',
  date: '2024-03-15',
  time: '10:00 AM',
  location: 'Main Hall',
  category: 'Workshop'
});
```

## Key Features Implemented

- ✅ Role-based authentication (Admin/Student/Guest)
- ✅ Student registration and approval workflow
- ✅ Notice creation and management
- ✅ Study material upload and download tracking
- ✅ Event creation and management
- ✅ Gallery image management
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Context-based state management
- ✅ Protected routes with role checking
- ✅ Form validation and error handling
- ✅ LocalStorage persistence
- ✅ Modal dialogs for confirmations
- ✅ Data filtering and sorting
- ✅ Search and category filtering

## Future Enhancements

- Real backend API integration
- Database for persistent storage
- Email notifications for events and approvals
- User profile picture uploads
- Event registration/attendance tracking
- Messaging between students and admins
- Advanced search and filtering
- Export data to CSV/PDF
- User roles and permissions management
- Two-factor authentication
- Student feedback and ratings system

## License

This project is open source and available under the MIT License.

## Support

For questions or issues, please contact the development team or check the documentation in each component file.
