import { UserRole } from "./auth";

export interface Message {
  _id: string;
  content: string;
  createdAt: Date;
  status: string;
  sender: {
    name: string;
    email: string;
    role: UserRole;
  };
  recipient: {
    name: string;
    email: string;
    role: UserRole;
  };
  read: boolean;
}

export interface ForumPost {
  _id: string;
  title: string;
  content: string;
  createdAt: Date;
  author: {
    name: string;
    email: string;
    role: UserRole;
  };
  replies: ForumReply[];
}

export interface ForumReply {
  _id: string;
  content: string;
  createdAt: Date;
  author: {
    name: string;
    email: string;
    role: UserRole;
  };
}

export const mockMessages: Message[] = [
  {
    _id: "1",
    content: "I'm experiencing some discomfort after delivery. Is this normal?",
    createdAt: new Date("2024-03-15T10:00:00"),
    status: "pending",
    sender: {
      name: "Sarah Johnson",
      email: "sarah@example.com",
      role: "mom"
    },
    recipient: {
      name: "Michael Brown",
      email: "michael@example.com",
      role: "dad"
    },
    read: true
  },
  {
    _id: "2",
    content: "My baby's feeding schedule seems irregular. Should I be concerned?",
    createdAt: new Date("2024-03-15T11:30:00"),
    status: "pending",
    sender: {
      name: "Michael Brown",
      email: "michael@example.com",
      role: "dad"
    },
    recipient: {
      name: "Sarah Johnson",
      email: "sarah@example.com",
      role: "mom"
    },
    read: true
  },
  {
    _id: "3",
    content: "I'm having trouble sleeping. Any advice?",
    createdAt: new Date("2024-03-15T14:20:00"),
    status: "pending",
    sender: {
      name: "Emily Davis",
      email: "emily@example.com",
      role: "mom"
    },
    recipient: {
      name: "Michael Brown",
      email: "michael@example.com",
      role: "dad"
    },
    read: true
  },
  {
    _id: "4",
    content: "Hi there! I saw your post about sleep training. We're going through the same thing with our 6-month-old. Would love to chat!",
    sender: {
      name: "Lisa Chen",
      email: "lisa@example.com",
      role: "mom"
    },
    recipient: {
      name: "Michael Brown",
      email: "michael@example.com",
      role: "dad"
    },
    createdAt: new Date("2024-03-16T10:30:00"),
    read: true,
    status: "delivered"
  },
  {
    _id: "5",
    content: "Hi Lisa! Yes, I'd be happy to share our experience with the Ferber method. When would be a good time to chat?",
    sender: {
      name: "Michael Brown",
      email: "michael@example.com",
      role: "dad"
    },
    recipient: {
      name: "Lisa Chen",
      email: "lisa@example.com",
      role: "mom"
    },
    createdAt: new Date("2024-03-16T11:00:00"),
    read: true,
    status: "delivered"
  },
  {
    _id: "6",
    content: "I'm free tomorrow evening after 7 PM. Would that work for you?",
    sender: {
      name: "Lisa Chen",
      email: "lisa@example.com",
      role: "mom"
    },
    recipient: {
      name: "Michael Brown",
      email: "michael@example.com",
      role: "dad"
    },
    createdAt: new Date("2024-03-16T11:15:00"),
    read: true,
    status: "delivered"
  },
  {
    _id: "7",
    content: "Perfect! I'll send you a calendar invite. Looking forward to sharing our experience.",
    sender: {
      name: "Michael Brown",
      email: "michael@example.com",
      role: "dad"
    },
    recipient: {
      name: "Lisa Chen",
      email: "lisa@example.com",
      role: "mom"
    },
    createdAt: new Date("2024-03-16T11:30:00"),
    read: false,
    status: "delivered"
  },
  {
    _id: "8",
    content: "Hi! I saw your post about work-life balance. I'm also a working parent and would love to connect and share strategies.",
    sender: {
      name: "Rachel Green",
      email: "rachel@example.com",
      role: "mom"
    },
    recipient: {
      name: "John Smith",
      email: "john@example.com",
      role: "dad"
    },
    createdAt: new Date("2024-03-16T15:45:00"),
    read: true,
    status: "delivered"
  }
];

export const mockForumPosts: ForumPost[] = [
  {
    _id: "1",
    title: "Postpartum Recovery Tips",
    content: "As a medical professional, I'd like to share some essential postpartum recovery tips. Remember to stay hydrated, get plenty of rest, and don't hesitate to ask for help when needed. Monitor your physical and emotional well-being closely during this period.",
    createdAt: new Date("2024-03-14T09:00:00"),
    author: {
      name: "Dr. Lisa Smith",
      email: "lisa@example.com",
      role: "medical_monitor"
    },
    replies: [
      {
        _id: "1-1",
        content: "Thank you for these tips! I'm 2 weeks postpartum and finding it challenging to get enough rest with the baby's schedule. Any specific advice for managing sleep?",
        createdAt: new Date("2024-03-14T10:30:00"),
        author: {
          name: "Jennifer Wilson",
          email: "jennifer@example.com",
          role: "mom"
        }
      },
      {
        _id: "1-2",
        content: "I'd like to add that staying hydrated is crucial during recovery. Try to keep a water bottle nearby at all times.",
        createdAt: new Date("2024-03-14T11:45:00"),
        author: {
          name: "Dr. Mark Johnson",
          email: "mark@example.com",
          role: "medical_monitor"
        }
      },
      {
        _id: "1-3",
        content: "As a new dad, I'm trying to help my partner with recovery. What are some specific ways I can support her during this time?",
        createdAt: new Date("2024-03-14T12:15:00"),
        author: {
          name: "Michael Chen",
          email: "michael@example.com",
          role: "dad"
        }
      }
    ]
  },
  {
    _id: "2",
    title: "New Dad Support Group",
    content: "Hey fellow dads! I'm a first-time father and would love to connect with others going through similar experiences. Let's share tips, challenges, and support each other through this journey.",
    createdAt: new Date("2024-03-14T15:00:00"),
    author: {
      name: "David Miller",
      email: "david@example.com",
      role: "dad"
    },
    replies: [
      {
        _id: "2-1",
        content: "Great initiative! I'm also a new dad and finding it challenging to balance work and family time. Would love to hear how others are managing this.",
        createdAt: new Date("2024-03-14T16:20:00"),
        author: {
          name: "Robert Taylor",
          email: "robert@example.com",
          role: "dad"
        }
      },
      {
        _id: "2-2",
        content: "As a medical professional, I'd like to share some resources specifically for new dads. The transition to fatherhood can be challenging, and it's important to take care of your mental health too.",
        createdAt: new Date("2024-03-14T17:30:00"),
        author: {
          name: "Dr. Sarah Wilson",
          email: "sarah@example.com",
          role: "medical_monitor"
        }
      }
    ]
  },
  {
    _id: "3",
    title: "Breastfeeding Support Needed",
    content: "I'm having trouble with breastfeeding and feeling quite overwhelmed. Has anyone else experienced this? Looking for advice and support.",
    createdAt: new Date("2024-03-15T08:30:00"),
    author: {
      name: "Emma Thompson",
      email: "emma@example.com",
      role: "mom"
    },
    replies: [
      {
        _id: "3-1",
        content: "I'm a lactation consultant and would be happy to help. Could you share more about the specific challenges you're facing?",
        createdAt: new Date("2024-03-15T09:15:00"),
        author: {
          name: "Dr. Maria Garcia",
          email: "maria@example.com",
          role: "medical_monitor"
        }
      },
      {
        _id: "3-2",
        content: "I went through similar challenges. What helped me was finding a comfortable position and using a nursing pillow. Don't hesitate to reach out to a lactation consultant!",
        createdAt: new Date("2024-03-15T10:00:00"),
        author: {
          name: "Sophie Anderson",
          email: "sophie@example.com",
          role: "mom"
        }
      }
    ]
  },
  {
    _id: "4",
    title: "Postpartum Depression Discussion",
    content: "I'm a mental health professional specializing in postpartum care. Let's discuss the signs of postpartum depression and available support resources. Remember, seeking help is a sign of strength.",
    createdAt: new Date("2024-03-15T11:00:00"),
    author: {
      name: "Dr. James Wilson",
      email: "james@example.com",
      role: "medical_monitor"
    },
    replies: [
      {
        _id: "4-1",
        content: "Thank you for starting this discussion. I've been feeling really low lately and wasn't sure if it was normal. This helps me understand I'm not alone.",
        createdAt: new Date("2024-03-15T11:45:00"),
        author: {
          name: "Rachel Brown",
          email: "rachel@example.com",
          role: "mom"
        }
      },
      {
        _id: "4-2",
        content: "As a dad, I want to support my partner but sometimes feel unsure how to help. What are some signs I should look out for?",
        createdAt: new Date("2024-03-15T12:30:00"),
        author: {
          name: "Tom Wilson",
          email: "tom@example.com",
          role: "dad"
        }
      },
      {
        _id: "4-3",
        content: "It's great that you're being proactive about this, Tom. Some signs to watch for include persistent sadness, changes in sleep patterns, and loss of interest in activities they previously enjoyed.",
        createdAt: new Date("2024-03-15T13:15:00"),
        author: {
          name: "Dr. Emily Chen",
          email: "emily@example.com",
          role: "medical_monitor"
        }
      }
    ]
  },
  {
    _id: "5",
    title: "Dad's Perspective: First Month Experience",
    content: "Just wanted to share my experience as a new dad during the first month. The sleepless nights were tough, but seeing my baby's first smile made it all worth it. Any other dads want to share their experiences?",
    createdAt: new Date("2024-03-15T14:00:00"),
    author: {
      name: "Alex Rodriguez",
      email: "alex@example.com",
      role: "dad"
    },
    replies: [
      {
        _id: "5-1",
        content: "I can relate! The first month was a rollercoaster. What helped me was setting up a schedule with my partner for night shifts.",
        createdAt: new Date("2024-03-15T14:45:00"),
        author: {
          name: "Chris Lee",
          email: "chris@example.com",
          role: "dad"
        }
      },
      {
        _id: "5-2",
        content: "As a pediatrician, I'd like to add that it's completely normal to feel overwhelmed during this period. Don't hesitate to reach out for support when needed.",
        createdAt: new Date("2024-03-15T15:30:00"),
        author: {
          name: "Dr. Sarah Johnson",
          email: "sarah@example.com",
          role: "medical_monitor"
        }
      }
    ]
  },
  {
    _id: "6",
    title: "Sleep Training Tips",
    content: "Looking for advice on sleep training my 6-month-old. We've tried a few methods but nothing seems to work consistently. Any success stories or tips?",
    createdAt: new Date("2024-03-16T09:00:00"),
    author: {
      name: "Lisa Chen",
      email: "lisa@example.com",
      role: "mom"
    },
    replies: [
      {
        _id: "6-1",
        content: "We had great success with the Ferber method. It was tough the first few nights but worth it in the long run. Would be happy to share our experience!",
        createdAt: new Date("2024-03-16T10:15:00"),
        author: {
          name: "Michael Brown",
          email: "michael@example.com",
          role: "dad"
        }
      },
      {
        _id: "6-2",
        content: "As a pediatric sleep consultant, I recommend starting with a consistent bedtime routine first. This sets the foundation for any sleep training method.",
        createdAt: new Date("2024-03-16T11:30:00"),
        author: {
          name: "Dr. Sarah Wilson",
          email: "sarah@example.com",
          role: "medical_monitor"
        }
      },
      {
        _id: "6-3",
        content: "We tried gentle sleep training and it worked well for us. It took longer but felt more comfortable for our family. Happy to share our routine!",
        createdAt: new Date("2024-03-16T12:45:00"),
        author: {
          name: "Emma Davis",
          email: "emma@example.com",
          role: "mom"
        }
      }
    ]
  },
  {
    _id: "7",
    title: "Balancing Work and Parenting",
    content: "How do other working parents manage their time? I'm struggling to find the right balance between work responsibilities and being present for my kids.",
    createdAt: new Date("2024-03-16T14:00:00"),
    author: {
      name: "John Smith",
      email: "john@example.com",
      role: "dad"
    },
    replies: [
      {
        _id: "7-1",
        content: "I work from home and set strict boundaries. No work after 6 PM and dedicated family time on weekends. It's not always easy but helps maintain balance.",
        createdAt: new Date("2024-03-16T15:20:00"),
        author: {
          name: "Rachel Green",
          email: "rachel@example.com",
          role: "mom"
        }
      },
      {
        _id: "7-2",
        content: "As a family therapist, I often recommend creating a visual schedule that includes both work and family time. This helps set clear expectations for everyone.",
        createdAt: new Date("2024-03-16T16:30:00"),
        author: {
          name: "Dr. James Wilson",
          email: "james@example.com",
          role: "medical_monitor"
        }
      },
      {
        _id: "7-3",
        content: "I've found that meal prepping on weekends and using a shared calendar with my partner has been a game-changer for managing our busy schedules.",
        createdAt: new Date("2024-03-16T17:45:00"),
        author: {
          name: "David Miller",
          email: "david@example.com",
          role: "dad"
        }
      }
    ]
  }
]; 