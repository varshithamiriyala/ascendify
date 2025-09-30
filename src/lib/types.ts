export type Role = 'employee' | 'committee' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  avatarUrl: string;
  title: string;
}

export interface Competency {
  id: string;
  name:string;
  level: number;
  target: number;
}

export interface Experience {
  id: string;
  name: string;
  acquired: boolean;
}

export interface DevelopmentActivity {
  id: string;
  type: 'Training' | 'Project' | 'Mentorship';
  title: string;
  status: 'Completed' | 'In Progress' | 'Not Started';
}

export interface Recommendation {
  type: 'Training' | 'Project' | 'Mentorship';
  title: string;
  reason: string;
}

export interface CareerGoals {
  shortTerm: string;
  longTerm: string;
}

export interface EmployeeProfile {
  id: string;
  userId: string;
  readiness: number;
  targetRole: string;
  careerGoals: CareerGoals;
  competencyGaps: Competency[];
  experienceGaps: Experience[];
  developmentPlan: DevelopmentActivity[];
  recommendations: Recommendation[];
  gamification: {
    points: number;
    badges: string[];
  };
}
