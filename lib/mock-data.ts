export const mockUsers = {
  parents: [
    {
      id: '1',
      name: 'Sarah Johnson',
      email: 'sarah@example.com',
      role: 'mom',
      children: [
        { id: '1', name: 'Emma', age: 2 },
        { id: '2', name: 'Liam', age: 4 }
      ],
      profileImage: '/images/mock-parent-1.jpg'
    },
    {
      id: '2',
      name: 'Michael Chen',
      email: 'michael@example.com',
      role: 'dad',
      children: [
        { id: '3', name: 'Ava', age: 1 }
      ],
      profileImage: '/images/mock-parent-2.jpg'
    }
  ],
  therapists: [
    {
      id: 't1',
      name: 'Dr. Emily Parker',
      email: 'emily@example.com',
      specialization: 'Child Psychology',
      experience: '10 years',
      profileImage: '/images/mock-therapist-1.jpg'
    },
    {
      id: 't2',
      name: 'Dr. James Wilson',
      email: 'james@example.com',
      specialization: 'Family Therapy',
      experience: '8 years',
      profileImage: '/images/mock-therapist-2.jpg'
    }
  ]
};

export const mockMessages = [
  {
    id: '1',
    senderId: '1',
    receiverId: 't1',
    content: 'Hi Dr. Parker, I have some concerns about my daughter\'s sleep schedule.',
    timestamp: '2024-04-25T10:30:00Z',
    read: true
  },
  {
    id: '2',
    senderId: 't1',
    receiverId: '1',
    content: 'Hello Sarah! I\'d be happy to help. Could you tell me more about her current sleep patterns?',
    timestamp: '2024-04-25T11:00:00Z',
    read: true
  },
  {
    id: '3',
    senderId: '1',
    receiverId: 't1',
    content: 'She\'s having trouble falling asleep and wakes up frequently during the night.',
    timestamp: '2024-04-25T11:15:00Z',
    read: true
  }
];

export const mockTherapySessions = [
  {
    id: '1',
    therapistId: 't1',
    parentId: '1',
    childId: '1',
    date: '2024-04-28',
    time: '14:00',
    duration: 60,
    status: 'scheduled',
    notes: 'Initial consultation for sleep issues'
  },
  {
    id: '2',
    therapistId: 't2',
    parentId: '2',
    childId: '3',
    date: '2024-04-29',
    time: '15:30',
    duration: 45,
    status: 'completed',
    notes: 'Follow-up session for behavioral concerns'
  }
];

export const mockTherapyPlans = [
  {
    id: '1',
    childId: '1',
    therapistId: 't1',
    goals: [
      'Establish consistent bedtime routine',
      'Improve sleep quality',
      'Reduce night wakings'
    ],
    activities: [
      {
        id: '1',
        name: 'Bedtime Routine Chart',
        description: 'Create and follow a visual bedtime routine chart',
        frequency: 'Daily',
        duration: '15 minutes'
      },
      {
        id: '2',
        name: 'Relaxation Exercises',
        description: 'Practice simple breathing exercises before bed',
        frequency: 'Daily',
        duration: '5 minutes'
      }
    ],
    progress: [
      {
        date: '2024-04-20',
        notes: 'Started implementing bedtime routine',
        rating: 3
      },
      {
        date: '2024-04-25',
        notes: 'Showing improvement in falling asleep',
        rating: 4
      }
    ]
  }
];

export const mockParentingTips = [
  {
    id: '1',
    category: 'Sleep',
    title: 'Establishing a Bedtime Routine',
    content: 'Create a consistent bedtime routine that includes calming activities like reading or gentle music.',
    tags: ['sleep', 'routine', 'bedtime']
  },
  {
    id: '2',
    category: 'Behavior',
    title: 'Positive Reinforcement',
    content: 'Use positive reinforcement to encourage good behavior. Praise specific actions and be consistent.',
    tags: ['behavior', 'discipline', 'positive']
  }
];

export const mockResources = [
  {
    id: '1',
    title: 'Child Development Milestones',
    type: 'article',
    url: 'https://example.com/development-milestones',
    description: 'Comprehensive guide to child development milestones from birth to age 5.'
  },
  {
    id: '2',
    title: 'Parenting Support Groups',
    type: 'community',
    url: 'https://example.com/support-groups',
    description: 'Connect with other parents in your area for support and advice.'
  }
]; 