import { Event, UserEventActivity } from "@/types";

export const mockEvents: Event[] = [
  {
    id: "1",
    title: "Tech Fest 2024",
    date: "2024-08-15",
    posterUrl: "https://via.placeholder.com/400x300.png?text=Tech+Fest+2024",
    description: "Annual technical festival with coding competitions and workshops.",
  },
  {
    id: "2",
    title: "Cultural Night",
    date: "2024-09-01",
    posterUrl: "https://via.placeholder.com/400x300.png?text=Cultural+Night",
    description: "A night of music, dance, and cultural performances.",
  },
  {
    id: "3",
    title: "Sports Day",
    date: "2024-09-20",
    posterUrl: "https://via.placeholder.com/400x300.png?text=Sports+Day",
    description: "The annual university sports competition.",
  },
];

export const mockUserActivity: UserEventActivity[] = [
  {
    id: "1",
    title: "Tech Fest 2024",
    date: "2024-08-15",
    posterUrl: "https://via.placeholder.com/400x300.png?text=Tech+Fest+2024",
    description: "Annual technical festival with coding competitions and workshops.",
    silPointsGained: 10,
    attended: true,
  },
  {
    id: "2",
    title: "Cultural Night",
    date: "2024-09-01",
    posterUrl: "https://via.placeholder.com/400x300.png?text=Cultural+Night",
    description: "A night of music, dance, and cultural performances.",
    silPointsGained: 0,
    attended: false,
  },
  {
    id: "3",
    title: "Guest Lecture on AI",
    date: "2024-07-30",
    posterUrl: "https://via.placeholder.com/400x300.png?text=AI+Lecture",
    description: "An insightful lecture by a leading AI researcher.",
    silPointsGained: 5,
    attended: true,
  },
];