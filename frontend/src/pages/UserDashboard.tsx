import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Calendar, Users, Award, Trophy, TrendingUp, User } from 'lucide-react';
import { mockEvents } from '../data/mockEvents';
import EventCard from '../components/Events/EventCard';

const UserDashboard: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'ongoing' | 'upcoming' | 'past' | 'profile'>('upcoming');
  const [registeredEvents, setRegisteredEvents] = useState<string[]>([]);

  const ongoingEvents = mockEvents.filter(event => event.status === 'ongoing');
  const upcomingEvents = mockEvents.filter(event => event.status === 'upcoming');
  const pastEvents = mockEvents.filter(event => event.status === 'completed');

  const handleRegister = (eventId: string) => {
    if (!registeredEvents.includes(eventId)) {
      setRegisteredEvents([...registeredEvents, eventId]);
    }
  };

  const tabs = [
    { id: 'upcoming', label: 'Upcoming Events', count: upcomingEvents.length },
    { id: 'ongoing', label: 'Ongoing Events', count: ongoingEvents.length },
    { id: 'past', label: 'Past Events', count: pastEvents.length },
    { id: 'profile', label: 'My Profile', count: 0 },
  ];

  const renderEvents = (events: typeof mockEvents, showRegisterButton = false) => {
    if (events.length === 0) {
      return (
        <div className="text-center py-12">
          <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-600 mb-2">No Events Found</h3>
          <p className="text-gray-500">
            {activeTab === 'upcoming' && 'Check back soon for exciting upcoming events!'}
            {activeTab === 'ongoing' && 'No events are currently ongoing.'}
            {activeTab === 'past' && 'No past events to display.'}
          </p>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          <EventCard
            key={event.id}
            event={event}
            showRegisterButton={showRegisterButton}
            onRegister={handleRegister}
            isRegistered={registeredEvents.includes(event.id)}
          />
        ))}
      </div>
    );
  };

  const renderProfile = () => {
    const categoryStats = [
      { category: 'Technical', attended: 3, registered: 4, points: 60 },
      { category: 'Cultural', attended: 1, registered: 2, points: 15 },
      { category: 'Sports', attended: 1, registered: 1, points: 30 },
    ];

    return (
      <div className="space-y-8">
        {/* User Stats Overview */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
          <div className="flex items-center space-x-4 mb-6">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
              <User className="w-8 h-8" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">{user?.name}</h2>
              <p className="text-blue-200">{user?.email}</p>
              <span className="inline-block bg-white/20 px-3 py-1 rounded-full text-sm mt-2">
                {user?.role?.charAt(0).toUpperCase() + user?.role?.slice(1)}
              </span>
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold">{user?.silPoints}</div>
              <div className="text-blue-200 text-sm">SIL Points</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">{user?.eventsAttended}</div>
              <div className="text-blue-200 text-sm">Events Attended</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">{user?.eventsRegistered}</div>
              <div className="text-blue-200 text-sm">Events Registered</div>
            </div>
          </div>
        </div>

        {/* Activity Summary */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
              <Trophy className="w-6 h-6 text-yellow-600 mr-2" />
              SIL Points Breakdown
            </h3>
            <div className="space-y-4">
              {categoryStats.map((stat, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h4 className="font-semibold text-gray-900">{stat.category}</h4>
                    <p className="text-sm text-gray-600">
                      {stat.attended} attended • {stat.registered} registered
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-green-600">{stat.points}</div>
                    <div className="text-xs text-gray-500">points</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
              <TrendingUp className="w-6 h-6 text-blue-600 mr-2" />
              Recent Activity
            </h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg">
                <Award className="w-5 h-5 text-green-600 mt-1" />
                <div>
                  <p className="font-medium text-gray-900">Earned 20 SIL Points</p>
                  <p className="text-sm text-gray-600">AI Workshop completion</p>
                  <p className="text-xs text-gray-500">2 days ago</p>
                </div>
              </div>
              <div className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
                <Calendar className="w-5 h-5 text-blue-600 mt-1" />
                <div>
                  <p className="font-medium text-gray-900">Registered for Event</p>
                  <p className="text-sm text-gray-600">Sports Day Competition</p>
                  <p className="text-xs text-gray-500">1 week ago</p>
                </div>
              </div>
              <div className="flex items-start space-x-3 p-3 bg-purple-50 rounded-lg">
                <Users className="w-5 h-5 text-purple-600 mt-1" />
                <div>
                  <p className="font-medium text-gray-900">Attended Event</p>
                  <p className="text-sm text-gray-600">Cultural Fest - RUBIX Utsav</p>
                  <p className="text-xs text-gray-500">2 weeks ago</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">Welcome back, {user?.name}!</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center">
              <Award className="w-8 h-8 text-green-600" />
              <div className="ml-4">
                <p className="text-2xl font-bold text-gray-900">{user?.silPoints}</p>
                <p className="text-gray-600">SIL Points</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center">
              <Calendar className="w-8 h-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-2xl font-bold text-gray-900">{user?.eventsRegistered}</p>
                <p className="text-gray-600">Registered</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center">
              <Users className="w-8 h-8 text-purple-600" />
              <div className="ml-4">
                <p className="text-2xl font-bold text-gray-900">{user?.eventsAttended}</p>
                <p className="text-gray-600">Attended</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center">
              <TrendingUp className="w-8 h-8 text-orange-600" />
              <div className="ml-4">
                <p className="text-2xl font-bold text-gray-900">
                  {user?.eventsAttended && user?.eventsRegistered 
                    ? Math.round((user.eventsAttended / user.eventsRegistered) * 100) 
                    : 0}%
                </p>
                <p className="text-gray-600">Attendance</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6" aria-label="Tabs">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.label}
                  {tab.count > 0 && (
                    <span className="ml-2 bg-gray-100 text-gray-900 py-0.5 px-2.5 rounded-full text-xs">
                      {tab.count}
                    </span>
                  )}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'upcoming' && renderEvents(upcomingEvents, true)}
            {activeTab === 'ongoing' && renderEvents(ongoingEvents)}
            {activeTab === 'past' && renderEvents(pastEvents)}
            {activeTab === 'profile' && renderProfile()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;