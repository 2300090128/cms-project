export interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'hod' | 'incharge' | 'president' | 'vp' | 'event_manager' | 'social_media' | 'designer' | 'coordinator';
  isAdmin: boolean;
  silPoints: number;
  eventsAttended: number;
  eventsRegistered: number;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  venue: string;
  posterUrl: string;
  category: 'technical' | 'non-technical' | 'sports' | 'cultural' | 'workshop';
  silPoints: number;
  maxParticipants?: number;
  registeredCount: number;
  status: 'upcoming' | 'ongoing' | 'completed';
  photos: string[];
  createdBy: string;
  outcome?: string;
}

export interface Registration {
  id: string;
  userId: string;
  eventId: string;
  registeredAt: string;
  attended: boolean;
  silPointsEarned: number;
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}