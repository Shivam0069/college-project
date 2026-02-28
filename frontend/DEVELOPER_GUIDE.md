# Developer Guide - Quick Reference

## Quick Start

```bash
npm install
npm run dev
# http://localhost:3000
```

## Project Structure Quick Reference

```
├── app/                    # Next.js pages and routes
├── components/             # React components
│   ├── custom/            # UI components (Button, Input, etc.)
│   ├── layouts/           # Layout wrappers
│   └── ProtectedRoute.jsx # Auth wrapper
├── lib/
│   ├── contexts/          # AuthContext, ClubContext
│   ├── hooks/             # useAuth, useClub
│   └── constants/         # dummyData.js
└── styles/                # Tailwind CSS
```

## Using Contexts

### In a Component

```jsx
'use client';

import { useAuth } from '@/lib/hooks/useAuth';
import { useClub } from '@/lib/hooks/useClub';

export default function MyComponent() {
  const { user, loginUser, logoutUser } = useAuth();
  const { notices, addNotice, removeNotice } = useClub();

  return <div>{/* component code */}</div>;
}
```

## Context Functions Cheat Sheet

### AuthContext

```javascript
// Login
const result = loginUser('email@example.com', 'password');
// Returns: { success: true/false, message: string }

// Register
const result = registerStudent({
  name: 'John',
  email: 'john@example.com',
  password: 'pass123',
  roll: 'CS101',
  department: 'CS'
});

// Logout
const result = logoutUser();

// Admin: Approve student
const result = approveStudent(studentId);

// Admin: Reject student
const result = rejectStudent(studentId);

// Get user by ID
const user = getStudentById(studentId);

// Current state
const { user, isAuthenticated, userRole, pendingStudents, approvedStudents } = useAuth();
```

### ClubContext

```javascript
// ===== NOTICES =====
const result = addNotice({
  title: 'Title',
  content: 'Content',
  category: 'General'
});

const result = removeNotice(noticeId);
const notices = getNoticesByClub();

// ===== MATERIALS =====
const result = uploadMaterial({
  title: 'Material Title',
  category: 'CS',
  fileType: 'pdf'
});

const result = removeMaterial(materialId);
const materials = getMaterialsByClub();
const filtered = getMaterialsByCategory('CS');
incrementDownload(materialId);

// ===== EVENTS =====
const result = addEvent({
  title: 'Event',
  description: 'Desc',
  date: '2024-03-15',
  time: '10:00 AM',
  location: 'Hall',
  category: 'Workshop'
});

const result = deleteEvent(eventId);
const events = getEventsByClub();
updateEventAttendees(eventId, 100);

// ===== GALLERY =====
const result = uploadGalleryImage({
  imageUrl: 'https://...',
  caption: 'Caption'
});

const result = removeGalleryImage(imageId);
const gallery = getGalleryImages();

// ===== SUMMARY =====
const summary = getClubSummary();
// Returns: { totalNotices, totalMaterials, totalEvents, galleryImages }

// Current state
const { notices, materials, events, gallery, loading } = useClub();
```

## Component Usage

### Button

```jsx
import { Button } from '@/components/custom/Button';

<Button variant="primary" size="lg">Click</Button>
<Button variant="danger" disabled>Disabled</Button>
<Button variant="outline" onClick={handleClick}>Outline</Button>

// Variants: primary, secondary, danger, success, outline
// Sizes: sm, md, lg
```

### Input

```jsx
import { Input } from '@/components/custom/Input';

<Input
  type="email"
  label="Email"
  placeholder="Enter email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  error={error ? 'Invalid email' : ''}
  required
/>
```

### Textarea

```jsx
import { Textarea } from '@/components/custom/Textarea';

<Textarea
  label="Description"
  placeholder="Enter text"
  value={text}
  onChange={(e) => setText(e.target.value)}
  rows={5}
/>
```

### Select

```jsx
import { Select } from '@/components/custom/Select';

<Select
  label="Category"
  value={category}
  onChange={(e) => setCategory(e.target.value)}
  options={[
    { value: 'cs', label: 'Computer Science' },
    { value: 'it', label: 'IT' }
  ]}
/>
```

### Card

```jsx
import { Card, CardTitle, CardContent } from '@/components/custom/Card';

<Card hover>
  <CardTitle>Title</CardTitle>
  <CardContent>Content here</CardContent>
</Card>
```

### Modal

```jsx
import { Modal } from '@/components/custom/Modal';
import { Button } from '@/components/custom/Button';

<Modal
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  title="Confirm"
  size="md"
  footer={
    <>
      <Button variant="outline" onClick={() => setIsOpen(false)}>
        Cancel
      </Button>
      <Button onClick={handleConfirm}>Confirm</Button>
    </>
  }
>
  <p>Are you sure?</p>
</Modal>
```

### Table

```jsx
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableHeader,
  TableCell,
} from '@/components/custom/Table';

<Table>
  <TableHead>
    <TableRow>
      <TableHeader>Name</TableHeader>
      <TableHeader>Email</TableHeader>
    </TableRow>
  </TableHead>
  <TableBody>
    {data.map((item) => (
      <TableRow key={item.id} hover>
        <TableCell>{item.name}</TableCell>
        <TableCell>{item.email}</TableCell>
      </TableRow>
    ))}
  </TableBody>
</Table>
```

## Creating Protected Pages

```jsx
'use client';

import { ProtectedRoute } from '@/components/ProtectedRoute';
import { StudentLayout } from '@/components/layouts/StudentLayout';

export default function Page() {
  return (
    <ProtectedRoute requiredRole="student">
      <StudentLayout>
        <div>Page content</div>
      </StudentLayout>
    </ProtectedRoute>
  );
}
```

RequiredRole options: `'admin'`, `'student'`, `'guest'`

## Form Handling Pattern

```jsx
'use client';

import { useState } from 'react';
import { Input } from '@/components/custom/Input';
import { Button } from '@/components/custom/Button';
import { useAuth } from '@/lib/hooks/useAuth';

export default function MyForm() {
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [error, setError] = useState('');
  const { registerStudent } = useAuth();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const result = registerStudent(formData);
    if (result.success) {
      // Success
    } else {
      setError(result.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <div className="text-red-600">{error}</div>}
      <Input
        name="name"
        value={formData.name}
        onChange={handleChange}
        required
      />
      <Button type="submit">Submit</Button>
    </form>
  );
}
```

## Adding New Features

### Add a New Notice

```jsx
const { addNotice } = useClub();

const handleAddNotice = () => {
  const result = addNotice({
    title: 'New Notice',
    content: 'Some content',
    category: 'General'
  });

  if (result.success) {
    console.log('Notice added:', result.notice);
  }
};
```

### Add a New Event

```jsx
const { addEvent } = useClub();

const result = addEvent({
  title: 'Tech Workshop',
  description: 'Learn new tech',
  date: '2024-03-20',
  time: '10:00 AM',
  location: 'Main Hall',
  category: 'Workshop'
});
```

### Upload Material

```jsx
const { uploadMaterial } = useClub();
const { user } = useAuth();

const result = uploadMaterial({
  title: 'Data Structures',
  category: 'Computer Science',
  fileType: 'pdf',
  uploadedBy: user?.name
});
```

## Debugging Tips

### Check localStorage

```javascript
// In browser console
localStorage.getItem('authUser')
localStorage.getItem('clubNotices')
localStorage.getItem('pendingStudents')
```

### Clear localStorage

```javascript
localStorage.clear()
```

### Add debug logs

```jsx
const { notices } = useClub();
console.log('[v0] Notices:', notices);
```

## Common Patterns

### Loading State

```jsx
const [loading, setLoading] = useState(false);

const handleAction = async () => {
  setLoading(true);
  // Do action
  setLoading(false);
};
```

### Error Handling

```jsx
const [error, setError] = useState('');

try {
  const result = someFunction();
  if (!result.success) {
    setError(result.message);
  }
} catch (err) {
  setError('An error occurred');
}
```

### Conditional Rendering

```jsx
import { useAuth } from '@/lib/hooks/useAuth';

export default function Component() {
  const { isAuthenticated, userRole } = useAuth();

  if (!isAuthenticated) return <p>Please login</p>;
  if (userRole === 'admin') return <AdminPanel />;
  if (userRole === 'student') return <StudentPanel />;
  return <GuestPanel />;
}
```

## Testing Data

### Default Admin

```
Email: admin@club.com
Password: admin123
```

### Default Student

```
Email: student@email.com
Password: student123
```

### Register New Student

1. Go to /register
2. Fill form
3. Admin approves from /admin/students/pending
4. Can then login

## Styling with Tailwind

### Common Classes

```jsx
// Layout
<div className="flex items-center justify-between gap-4">

// Spacing
<div className="p-6 mb-4 mx-auto">

// Colors
<div className="bg-blue-600 text-white hover:bg-blue-700">

// Responsive
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">

// Shadows & Borders
<div className="shadow-lg border-2 border-gray-200 rounded-lg">
```

## File Naming Conventions

- Components: PascalCase (Button.jsx)
- Pages: lowercase with dash (page.jsx)
- Utilities/Hooks: camelCase (useAuth.js)
- Contexts: PascalCase (AuthContext.jsx)

## Next.js App Router Routes

```
/                     → app/page.jsx
/login                → app/login/page.jsx
/student/dashboard    → app/student/dashboard/page.jsx
/admin/notices        → app/admin/notices/page.jsx
```

## Deployment Checklist

- [ ] Remove console.log statements
- [ ] Test all auth flows
- [ ] Verify protected routes work
- [ ] Check localStorage usage
- [ ] Test on mobile
- [ ] Validate forms
- [ ] Check error handling
- [ ] Optimize images
- [ ] Remove dummy data or keep for demo
- [ ] Update meta tags
- [ ] Test all CRUD operations

## Performance Tips

1. Use React.memo for expensive components
2. Avoid re-renders with useMemo
3. Lazy load modals
4. Optimize images
5. Use CSS classes over inline styles
6. Minimize dependencies
7. Use localStorage efficiently

## Support & Resources

- Next.js Docs: https://nextjs.org/docs
- React Docs: https://react.dev
- Tailwind Docs: https://tailwindcss.com/docs
- MDN Web Docs: https://developer.mozilla.org

---

**Quick Commands**

```bash
npm run dev           # Start dev server
npm run build         # Build for production
npm run lint          # Run linter
npm start             # Start production server
```

**Happy coding!**
