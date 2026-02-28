// Dummy users for admin and student login
export const dummyUsers = {
  admin: {
    id: 'admin1',
    email: 'admin@club.com',
    password: 'admin123',
    name: 'Admin User',
    role: 'admin',
  },
  student: {
    id: 'student1',
    email: 'student@email.com',
    password: 'student123',
    name: 'John Doe',
    roll: 'CS101',
    department: 'Computer Science',
    role: 'student',
    approved: true,
  },
};

// Pending students awaiting approval
export const pendingStudentsData = [
  {
    id: 'pending1',
    name: 'Alice Smith',
    email: 'alice@email.com',
    roll: 'CS102',
    department: 'Computer Science',
    registeredAt: '2024-02-15',
    status: 'pending',
  },
  {
    id: 'pending2',
    name: 'Bob Johnson',
    email: 'bob@email.com',
    roll: 'IT103',
    department: 'Information Technology',
    registeredAt: '2024-02-16',
    status: 'pending',
  },
];

// Approved students
export const approvedStudentsData = [
  {
    id: 'student1',
    name: 'John Doe',
    email: 'student@email.com',
    roll: 'CS101',
    department: 'Computer Science',
    approvedAt: '2024-01-10',
  },
  {
    id: 'student3',
    name: 'Emma Davis',
    email: 'emma@email.com',
    roll: 'CS105',
    department: 'Computer Science',
    approvedAt: '2024-02-01',
  },
  {
    id: 'student4',
    name: 'Michael Brown',
    email: 'michael@email.com',
    roll: 'IT104',
    department: 'Information Technology',
    approvedAt: '2024-02-05',
  },
];

// Notices
export const noticesData = [
  {
    id: 'notice1',
    title: 'Club Meeting This Saturday',
    content: 'We have scheduled a general body meeting on Saturday at 3 PM in the main hall. All members are requested to attend.',
    author: 'Admin User',
    date: '2024-02-20',
    category: 'Event',
  },
  {
    id: 'notice2',
    title: 'New Project Collaboration',
    content: 'We are looking for students interested in contributing to our upcoming project. Sign up at the notice board.',
    author: 'Admin User',
    date: '2024-02-19',
    category: 'Opportunity',
  },
  {
    id: 'notice3',
    title: 'Study Group Formation',
    content: 'Study groups for the upcoming exam will be formed this week. Please indicate your preferred subject area.',
    author: 'Admin User',
    date: '2024-02-18',
    category: 'Study',
  },
];

// Study Materials
export const materialsData = [
  {
    id: 'material1',
    title: 'Data Structures Basics',
    category: 'Computer Science',
    fileType: 'pdf',
    uploadedBy: 'Admin User',
    uploadedAt: '2024-02-15',
    downloads: 45,
  },
  {
    id: 'material2',
    title: 'Web Development Guide',
    category: 'Web Development',
    fileType: 'pdf',
    uploadedBy: 'Admin User',
    uploadedAt: '2024-02-14',
    downloads: 62,
  },
  {
    id: 'material3',
    title: 'Database Design Tutorial',
    category: 'Database',
    fileType: 'pdf',
    uploadedBy: 'Admin User',
    uploadedAt: '2024-02-12',
    downloads: 38,
  },
  {
    id: 'material4',
    title: 'Python for Beginners',
    category: 'Programming',
    fileType: 'pdf',
    uploadedBy: 'Admin User',
    uploadedAt: '2024-02-10',
    downloads: 91,
  },
];

// Events
export const eventsData = [
  {
    id: 'event1',
    title: 'Tech Workshop 2024',
    description: 'Learn latest technologies and industry practices from experts',
    date: '2024-03-10',
    time: '10:00 AM',
    location: 'Main Hall',
    category: 'Workshop',
    attendees: 87,
  },
  {
    id: 'event2',
    title: 'Hackathon Challenge',
    description: 'Join our 24-hour hackathon and showcase your coding skills',
    date: '2024-03-15',
    time: '9:00 AM',
    location: 'Computer Lab',
    category: 'Competition',
    attendees: 65,
  },
  {
    id: 'event3',
    title: 'Guest Lecture - AI in 2024',
    description: 'Industry expert discussing artificial intelligence trends and applications',
    date: '2024-02-25',
    time: '2:00 PM',
    location: 'Auditorium',
    category: 'Lecture',
    attendees: 150,
  },
  {
    id: 'event4',
    title: 'Monthly Meetup',
    description: 'Casual meetup for club members to network and discuss projects',
    date: '2024-02-23',
    time: '4:00 PM',
    location: 'Cafeteria',
    category: 'Meetup',
    attendees: 42,
  },
];

// Gallery Images
export const galleryData = [
  {
    id: 'gallery1',
    imageUrl: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop',
    caption: 'Tech Workshop 2024',
    uploadedBy: 'Admin User',
    uploadedAt: '2024-02-18',
  },
  {
    id: 'gallery2',
    imageUrl: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop',
    caption: 'Club Meeting Highlights',
    uploadedBy: 'Admin User',
    uploadedAt: '2024-02-17',
  },
  {
    id: 'gallery3',
    imageUrl: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop',
    caption: 'Member Collaboration',
    uploadedBy: 'Admin User',
    uploadedAt: '2024-02-16',
  },
  {
    id: 'gallery4',
    imageUrl: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop',
    caption: 'Project Showcase',
    uploadedBy: 'Admin User',
    uploadedAt: '2024-02-15',
  },
];

// Team Members
export const teamData = [
  {
    id: 'team1',
    name: 'Sarah Anderson',
    position: 'President',
    bio: 'Computer Science student with passion for technology',
    imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop',
  },
  {
    id: 'team2',
    name: 'James Wilson',
    position: 'Vice President',
    bio: 'Web developer and tech enthusiast',
    imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop',
  },
  {
    id: 'team3',
    name: 'Maria Garcia',
    position: 'Treasurer',
    bio: 'Mathematics student interested in AI',
    imageUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop',
  },
  {
    id: 'team4',
    name: 'David Lee',
    position: 'Event Coordinator',
    bio: 'Event management specialist',
    imageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop',
  },
];

// Club Activities/Descriptions
export const activitiesData = [
  {
    id: 'activity1',
    title: 'Coding Sessions',
    description: 'Regular sessions to solve coding problems and share knowledge about programming languages and data structures.',
    icon: '💻',
  },
  {
    id: 'activity2',
    title: 'Project Development',
    description: 'Collaborative development of web applications, mobile apps, and other software projects.',
    icon: '🚀',
  },
  {
    id: 'activity3',
    title: 'Workshops & Seminars',
    description: 'Guest lectures and workshops by industry professionals to share expertise and latest industry trends.',
    icon: '📚',
  },
  {
    id: 'activity4',
    title: 'Competitions',
    description: 'Organize and participate in hackathons, coding contests, and other competitive events.',
    icon: '🏆',
  },
  {
    id: 'activity5',
    title: 'Networking Events',
    description: 'Monthly meetups for members to network, collaborate, and build professional connections.',
    icon: '🤝',
  },
  {
    id: 'activity6',
    title: 'Technical Blog',
    description: 'Publish technical articles and tutorials to share knowledge with the community.',
    icon: '✍️',
  },
];
