/**
 * Represents a single event.
 */
export interface Event {
  id: string;
  title: string;
  date: string;
  posterUrl: string;
  description: string;
}

/**
 * Represents a user's activity related to an event,
 * including their attendance status and points gained.
 */
export interface UserEventActivity extends Event {
  silPointsGained: number;
  attended: boolean;
}