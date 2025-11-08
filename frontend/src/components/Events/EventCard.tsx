import React from 'react';
import { Calendar, Clock, MapPin, Users, Award } from 'lucide-react';
import { Event } from '../../types';

interface EventCardProps {
  event: Event;
  showRegisterButton?: boolean;
  onRegister?: (eventId: string) => void;
  isRegistered?: boolean;
}

const EventCard: React.FC<EventCardProps> = ({ 
  event, 
  showRegisterButton = false, 
  onRegister,
  isRegistered = false 
}) => {
  const getStatusColor = (status: Event['status']) => {
    switch (status) {
      case 'upcoming': return 'bg-blue-100 text-blue-800';
      case 'ongoing': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryColor = (category: Event['category']) => {
    switch (category) {
      case 'technical': return 'bg-purple-100 text-purple-800';
      case 'cultural': return 'bg-pink-100 text-pink-800';
      case 'sports': return 'bg-orange-100 text-orange-800';
      case 'workshop': return 'bg-indigo-100 text-indigo-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
      {/* Event Poster */}
      <div className="relative h-48 overflow-hidden">
        <img 
          src={event.posterUrl} 
          alt={event.title}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-4 left-4 flex gap-2">
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(event.status)}`}>
            {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
          </span>
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(event.category)}`}>
            {event.category.charAt(0).toUpperCase() + event.category.slice(1)}
          </span>
        </div>
      </div>

      {/* Event Details */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2">{event.title}</h3>
        <p className="text-gray-600 mb-4 line-clamp-2">{event.description}</p>

        <div className="space-y-2 mb-4">
          <div className="flex items-center text-gray-600">
            <Calendar className="w-4 h-4 mr-2" />
            <span className="text-sm">{formatDate(event.date)}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <Clock className="w-4 h-4 mr-2" />
            <span className="text-sm">{event.time}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <MapPin className="w-4 h-4 mr-2" />
            <span className="text-sm">{event.venue}</span>
          </div>
          {event.maxParticipants && (
            <div className="flex items-center text-gray-600">
              <Users className="w-4 h-4 mr-2" />
              <span className="text-sm">{event.registeredCount} / {event.maxParticipants} registered</span>
            </div>
          )}
          <div className="flex items-center text-green-600">
            <Award className="w-4 h-4 mr-2" />
            <span className="text-sm font-medium">{event.silPoints} SIL Points</span>
          </div>
        </div>

        {/* Action Buttons */}
        {showRegisterButton && event.status === 'upcoming' && (
          <div className="flex gap-2">
            {isRegistered ? (
              <button 
                className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg font-medium cursor-not-allowed"
                disabled
              >
                Registered ✓
              </button>
            ) : (
              <button 
                onClick={() => onRegister?.(event.id)}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-medium transition-colors"
                disabled={event.maxParticipants ? event.registeredCount >= event.maxParticipants : false}
              >
                {event.maxParticipants && event.registeredCount >= event.maxParticipants 
                  ? 'Event Full' 
                  : 'Register Now'
                }
              </button>
            )}
          </div>
        )}

        {/* Event Photos for completed events */}
        {event.status === 'completed' && event.photos.length > 0 && (
          <div className="mt-4">
            <h4 className="text-sm font-medium text-gray-700 mb-2">Event Photos</h4>
            <div className="flex gap-2 overflow-x-auto">
              {event.photos.slice(0, 3).map((photo, index) => (
                <img 
                  key={index}
                  src={photo} 
                  alt={`Event photo ${index + 1}`}
                  className="w-16 h-16 object-cover rounded-md flex-shrink-0"
                />
              ))}
              {event.photos.length > 3 && (
                <div className="w-16 h-16 bg-gray-200 rounded-md flex items-center justify-center flex-shrink-0">
                  <span className="text-xs text-gray-600">+{event.photos.length - 3}</span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventCard;