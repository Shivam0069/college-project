# Setup and Usage Guide

## Project Overview

This is a complete Student Club Management System built entirely in JavaScript (JSX) using React 19 and Next.js 16. It provides a three-tier interface:
1. **Public Pages** - Anyone can view
2. **Student Portal** - For registered and approved students
3. **Admin Dashboard** - For administrators

## Quick Start

### 1. Installation

```bash
# Install dependencies
npm install
# or
pnpm install
```

### 2. Run Development Server

```bash
npm run dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Test the Application

#### As a Guest (Public Pages)
- Visit the homepage to see the public interface
- Browse Activities, Team, Events, Gallery, Contact pages
- Access Home, About without logging in

#### As an Admin
1. Click "Login" button
2. Use credentials:
   - Email: `admin@club.com`
   - Password: `admin123`
3. You'll be redirected to Admin Dashboard
4. Access all admin features from the sidebar

#### As a Student
1. Click "Login" button
2. Use credentials:
   - Email: `student@email.com`
   - Password: `student123`
3. You'll be redirected to Student Dashboard
4. Access notices, materials, events

#### As a New Student (Registration)
1. Click "Register" on homepage
2. Fill in the registration form with:
   - Name, Email, Roll Number, Department
   - Create a password
3. Account will be in "pending" status
4. Admin must approve from admin panel
5. Once approved, you can login

## Application Structure

### File Organization

```
app/                          # Next.js app directory
├── page.jsx                 # Homepage
├── login/page.jsx           # Login page
├── register/page.jsx        # Registration page
├── about/page.jsx           # About page
├── activities/page.jsx      # Activities page
├── team/page.jsx            # Team page
├── events/page.jsx          # Public events page
├── gallery/page.jsx         # Gallery page
├── contact/page.jsx         # Contact page
├── student/                 # Student section
│   ├── dashboard/page.jsx
│   ├── notices/page.jsx
│   ├── materials/page.jsx
│   ├── events/page.jsx
│   └── profile/page.jsx
└── admin/                   # Admin section
    ├── dashboard/page.jsx
    ├── students/
    │   ├── pending/page.jsx
    │   └── approved/page.jsx
    ├── notices/page.jsx
    ├── materials/page.jsx
    ├── events/page.jsx
    ├── gallery/page.jsx
    └── profile/page.jsx

components/
├── custom/                  # UI components
│   ├── Button.jsx
│   ├── Input.jsx
│   ├── Textarea.jsx
│   ├── Card.jsx
│   ├── Modal.jsx
│   ├── Select.jsx
│   ├── Table.jsx
│   ├── Navbar.jsx
│   └── Sidebar.jsx
├── layouts/                 # Layout wrappers
│   ├── PublicLayout.jsx
│   ├── StudentLayout.jsx
│   └── AdminLayout.jsx
└── ProtectedRoute.jsx       # Route protection

lib/
├── contexts/                # State management
│   ├── AuthContext.jsx      # Auth state and functions
│   └── ClubContext.jsx      # Club content state
├── hooks/                   # Custom hooks
│   ├── useAuth.js
│   └── useClub.js
└── constants/
    └── dummyData.js         # Sample data
```

## Key Features

### 1. Authentication System

**AuthContext manages:**
- User login/logout
- Student registration
- Student approval workflow
- User roles (admin/student/guest)

**Functions:**
```javascript
// Login user
const result = loginUser(email, password);

// Register new student
const result = registerStudent({
  name, email, password, roll, department
});

// Admin approve student
const result = approveStudent(studentId);

// Admin reject student
const result = rejectStudent(studentId);
```

### 2. Content Management

**ClubContext manages:**
- Notices (create/delete)
- Study materials (upload/delete)
- Events (create/delete)
- Gallery images (upload/delete)

**Key Functions:**
```javascript
// Notices
addNotice({ title, content, category })
removeNotice(noticeId)

// Materials
uploadMaterial({ title, category, fileType })
removeMaterial(materialId)

// Events
addEvent({ title, date, time, location, category })
deleteEvent(eventId)

// Gallery
uploadGalleryImage({ imageUrl, caption })
removeGalleryImage(imageId)
```

### 3. Data Persistence

All data is stored in **browser localStorage**:
- `authUser` - Current logged-in user
- `pendingStudents` - Students awaiting approval
- `approvedStudents` - Approved students
- `clubNotices` - All notices
- `clubMaterials` - Study materials
- `clubEvents` - Events
- `clubGallery` - Gallery images

Data persists across browser sessions until cleared.

## Using the Application

### Student Workflow

1. **Register**
   - Fill registration form on /register
   - Enter name, email, roll, department
   - Account status: Pending

2. **Wait for Approval**
   - Admin will review on /admin/students/pending
   - Click "Approve" button
   - Email will be moved to approved list

3. **Login**
   - Use your email and password
   - Access student dashboard
   - Browse notices, materials, events

4. **Manage Profile**
   - Visit /student/profile
   - View account information
   - See activity statistics

### Admin Workflow

1. **Dashboard Overview**
   - See statistics on /admin/dashboard
   - Quick access to all management areas

2. **Approve Students**
   - Go to /admin/students/pending
   - Review student details
   - Click Approve or Reject

3. **Create Notices**
   - Go to /admin/notices
   - Click "+ Add Notice"
   - Fill title, content, category
   - Notice appears immediately

4. **Upload Materials**
   - Go to /admin/materials
   - Click "+ Upload Material"
   - Fill title, category, file type
   - Material listed for students

5. **Manage Events**
   - Go to /admin/events
   - Click "+ Create Event"
   - Fill date, time, location, description
   - Event appears in all places

6. **Manage Gallery**
   - Go to /admin/gallery
   - Click "+ Add Image"
   - Paste image URL and caption
   - Image displayed in gallery

## Custom Components Usage

### Button
```jsx
<Button variant="primary" size="lg" onClick={handleClick}>
  Click Me
</Button>
```

Variants: `primary`, `secondary`, `danger`, `success`, `outline`
Sizes: `sm`, `md`, `lg`

### Input
```jsx
<Input
  type="email"
  label="Email"
  placeholder="Enter email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  error={errorMessage}
  required
/>
```

### Modal
```jsx
<Modal
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  title="Modal Title"
  size="lg"
  footer={<Button>Save</Button>}
>
  Modal content here
</Modal>
```

### Card
```jsx
<Card hover>
  <CardTitle>Title</CardTitle>
  <CardContent>
    Card content
  </CardContent>
</Card>
```

## Modifying Data

### Adding Sample Data

Edit `lib/constants/dummyData.js`:

```javascript
// Add new notice
export const noticesData = [
  ...existing,
  {
    id: 'notice5',
    title: 'New Notice',
    content: 'Content here',
    author: 'Admin',
    date: '2024-02-22',
    category: 'General'
  }
];
```

### Changing Dummy Credentials

Edit `lib/constants/dummyData.js`:

```javascript
export const dummyUsers = {
  admin: {
    email: 'your-email@example.com',
    password: 'your-password',
    // ...
  }
};
```

## Testing Scenarios

### Scenario 1: New Student Registration
1. Go to /register
2. Fill form with new details
3. Submit
4. Login as admin
5. Go to /admin/students/pending
6. Click "Approve"
7. Student can now login

### Scenario 2: Create and Share Notice
1. Login as admin
2. Go to /admin/notices
3. Click "+ Add Notice"
4. Fill details and create
5. Logout
6. Login as student
7. Go to /student/notices - notice appears

### Scenario 3: Upload Material
1. Login as admin
2. Go to /admin/materials
3. Click "+ Upload Material"
4. Fill details
5. Logout
6. Login as student
7. Go to /student/materials
8. Click "Download" to increment counter

### Scenario 4: Create Event
1. Login as admin
2. Go to /admin/events
3. Click "+ Create Event"
4. Fill form with event details
5. Visit /events as guest - event appears
6. Login as student - event visible in /student/events

## Troubleshooting

### Can't login?
- Check if localStorage is enabled in browser
- Try clearing browser cache
- Ensure correct email and password from dummyUsers

### Data disappeared after refresh?
- localStorage was cleared
- Use browser DevTools to check localStorage
- Verify all keys are present

### Route not found?
- Ensure you're authenticated before accessing protected routes
- Guest users can only access public pages
- Admin can only access /admin/* pages
- Students can only access /student/* pages

### Images not loading in gallery?
- Use valid image URLs from public services
- Test URL in browser first
- Some URLs may have CORS restrictions

## Best Practices

### When Adding Features
1. Create components in `/components/custom/`
2. Add state management to appropriate context
3. Use custom components for UI consistency
4. Implement ProtectedRoute for new pages
5. Add data to dummyData.js for samples

### When Modifying Context
1. Keep functions pure (no side effects)
2. Update localStorage after state changes
3. Return result objects with success/message
4. Handle errors gracefully

### When Creating Pages
1. Use appropriate layout (PublicLayout/StudentLayout/AdminLayout)
2. Wrap with ProtectedRoute for protected pages
3. Use custom components for UI
4. Import hooks for state management

## Performance Tips

- Images are cached in browser
- Context uses localStorage for persistence
- Modal components prevent unnecessary re-renders
- Table components handle large datasets
- Responsive design optimized for mobile

## Browser Support

- Chrome/Edge (Chromium) - Full support
- Firefox - Full support
- Safari - Full support
- Mobile browsers - Responsive design

## Next Steps

After setting up, try:
1. Register as a new student
2. Get approved as admin
3. Create some notices and events
4. Upload study materials
5. Add gallery images
6. Test all pages and functionality

For production, consider:
- Connecting to a real backend API
- Using a database instead of localStorage
- Implementing file upload service
- Adding email notifications
- Setting up authentication tokens
- Adding user avatars/profile pictures

## Support

If you encounter issues:
1. Check browser console for errors
2. Verify localStorage is enabled
3. Clear cache and reload
4. Check all required files exist
5. Review the relevant component code

Enjoy using the Student Club Management System!
