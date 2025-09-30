import type { User, EmployeeProfile, Role, DevelopmentActivity } from './types';
import { PlaceHolderImages } from './placeholder-images';

const getUserAvatar = (id: string) => {
  const img = PlaceHolderImages.find(p => p.id === id);
  return img ? img.imageUrl : 'https://picsum.photos/seed/placeholder/100/100';
};

export const allUsers: User[] = [
  { id: '1', name: 'Sarah Lee', email: 'employee@ascendify.com', role: 'employee', avatarUrl: getUserAvatar('user-1'), title: 'Software Engineer II' },
  { id: '2', name: 'David Chen', email: 'david.chen@ascendify.com', role: 'employee', avatarUrl: getUserAvatar('user-2'), title: 'Product Manager' },
  { id: '3', name: 'Maria Garcia', email: 'committee@ascendify.com', role: 'committee', avatarUrl: getUserAvatar('user-3'), title: 'Director of Engineering' },
  { id: '4', name: 'Ben Carter', email: 'admin@ascendify.com', role: 'admin', avatarUrl: getUserAvatar('user-4'), title: 'HR Business Partner' },
];

export const developmentActivities: DevelopmentActivity[] = [
    { id: 'd1', type: 'Training', title: 'Advanced System Design Course', status: 'In Progress' },
    { id: 'd2', type: 'Project', title: 'Lead "Phoenix" feature development', status: 'Not Started' },
    { id: 'd3', type: 'Mentorship', title: 'Mentorship with Principal Engineer', status: 'In Progress' },
    { id: 'd4', type: 'Training', title: 'Agile Leadership Workshop', status: 'Completed' },
    { id: 'd5', type: 'Training', title: 'Strategic Marketing Course', status: 'In Progress' },
    { id: 'd6', type: 'Project', title: 'Spearhead Q3 product launch', status: 'Not Started' },
    { id: 'd7', type: 'Training', title: 'Microservices Architecture Pattern', status: 'Not Started' },
    { id: 'd8', type: 'Mentorship', title: 'Connect with a Senior PM', status: 'Not Started' },
    { id: 'd9', type: 'Project', title: 'Infrastructure cost-saving initiative', status: 'Not Started' },
];

export const employeeProfiles: EmployeeProfile[] = [
  {
    id: 'p1',
    userId: '1',
    readiness: 72,
    targetRole: 'Senior Software Engineer',
    competencyGaps: [
      { id: 'c1', name: 'System Design', level: 3, target: 5 },
      { id: 'c2', name: 'Project Leadership', level: 2, target: 4 },
      { id: 'c3', name: 'Mentorship', level: 3, target: 4 },
    ],
    experienceGaps: [
      { id: 'e1', name: 'Lead a cross-functional project', acquired: false },
      { id: 'e2', name: 'Design a major new service', acquired: false },
    ],
    developmentPlan: [
      developmentActivities[0],
      developmentActivities[1],
      developmentActivities[2],
      developmentActivities[3],
    ],
    recommendations: [
      { type: 'Training', title: 'Microservices Architecture Pattern', reason: 'To close the System Design gap.' },
      { type: 'Mentorship', title: 'Connect with a Senior PM', reason: 'To improve product-engineering collaboration.' },
      { type: 'Project', title: 'Infrastructure cost-saving initiative', reason: 'To gain experience in operational excellence.' },
    ],
    gamification: {
      points: 1250,
      badges: ['Quick Learner', 'Team Player', 'Feedback Champion'],
    },
  },
  {
    id: 'p2',
    userId: '2',
    readiness: 65,
    targetRole: 'Senior Product Manager',
    competencyGaps: [
      { id: 'c4', name: 'Market Analysis', level: 3, target: 5 },
      { id: 'c5', name: 'Technical Acumen', level: 3, target: 4 },
    ],
    experienceGaps: [
      { id: 'e3', name: 'Launch a new product line', acquired: false },
    ],
    developmentPlan: [
      developmentActivities[4],
      developmentActivities[5],
    ],
    recommendations: [],
    gamification: {
      points: 800,
      badges: ['Goal-Getter'],
    },
  },
];

export const notifications = [
    { id: 'n1', text: 'Your "Advanced System Design" course is due next week.', time: '2h ago' },
    { id: 'n2', text: 'New mentorship opportunity available with Jane Doe.', time: '1d ago' },
    { id: 'n3', text: 'Committee approval pending for your project proposal.', time: '3d ago' },
];

export const learningPathSteps = [
    {
      "title": "Master Core Technologies",
      "description": "Solidify your foundation in core backend technologies.",
      "milestones": [
        "Complete 'Advanced NodeJS' training",
        "Achieve certification in 'Cloud Architecture'"
      ]
    },
    {
      "title": "Develop System Design Expertise",
      "description": "Learn to design scalable and resilient systems.",
      "milestones": [
        "Take 'System Design Interview Prep' course",
        "Lead the design of a new microservice",
        "Mentor a junior engineer on design principles"
      ]
    },
    {
      "title": "Cultivate Leadership Skills",
      "description": "Grow your ability to lead projects and people.",
      "milestones": [
        "Act as tech lead for a medium-sized project",
        "Complete 'Engineering Leadership' workshop",
        "Participate in the cross-departmental mentorship program"
      ]
    },
    {
      "title": "Achieve Senior Engineer Role",
      "description": "Transition into the target role by demonstrating expertise and leadership.",
      "milestones": [
        "Successfully deliver a major project as lead",
        "Receive positive feedback from peers and managers"
      ]
    }
  ];
