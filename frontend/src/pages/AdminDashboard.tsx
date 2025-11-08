import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Users, 
  Calendar, 
  Award, 
  BarChart3,
  Image,
  FileText,
  CheckCircle
} from 'lucide-react';
import { mockEvents } from '../data/mockEvents';
import { Event } from '../types';
import EventCard from '../components/Events/EventCard';

const AdminDashboard: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'overview' | 'events' | 'create' | 'analytics' | 'users'>('overview');
  const [events, setEvents] = useState(mockEvents);
  const [showCreateForm, setShowCreateForm] = useState(false);

  // New event form state
  const [newEvent, setNewEvent] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    venue: '',
    category: 'technical' as Event['category'],
    silPoints: 0,
    maxParticipants: 0,
    posterUrl: '',
  });

  const canCreateEvents = ['president', 'vp', 'event_manager'].includes(user?.role || '');
  const canUploadPhotos = ['social_media', 'president', 'vp'].includes(user?.role || '');
  const canMarkAttendance = ['coordinator', 'president', 'vp'].includes(user?.role || '');
  const canViewReports = ['hod', 'incharge', 'president', 'vp'].includes(user?.role || '');

  const handleCreateEvent = (e: React.FormEvent) => {
    e.preventDefault();
    const event: Event = {
      id: Date.now().toString(),
      ...newEvent,
      registeredCount: 0,
      status: 'upcoming',
      photos: [],
      createdBy: user?.email || '',
    };
    setEvents([event, ...events]);
    setNewEvent({
      title: '',
      description: '',
      date: '',
      time: '',
      venue: '',
      category: 'technical',
      silPoints: 0,
      maxParticipants: 0,
      posterUrl: '',
    });
    setShowCreateForm(false);
  };

  const handleDeleteEvent = (eventId: string) => {
    setEvents(events.filter(e => e.id !== eventId));
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'events', label: 'Manage Events', icon: Calendar },
    { id: 'create', label: 'Create Event', icon: Plus },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'users', label: 'Users', icon: Users },
  ];

  const renderOverview = () => (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-6 text-white">
          <div className="flex items-center">
            <Calendar className="w-8 h-8" />
            <div className="ml-4">
              <p className="text-2xl font-bold">{events.length}</p>
              <p className="text-blue-100">Total Events</p>
            </div>
          </div>
        </div>
        <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-6 text-white">
          <div className="flex items-center">
            <Users className="w-8 h-8" />
            <div className="ml-4">
              <p className="text-2xl font-bold">1,250</p>
              <p className="text-green-100">Total Participants</p>
            </div>
          </div>
        </div>
        <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl p-6 text-white">
          <div className="flex items-center">
            <Award className="w-8 h-8" />
            <div className="ml-4">
              <p className="text-2xl font-bold">15,000</p>
              <p className="text-purple-100">SIL Points Given</p>
            </div>
          </div>
        </div>
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl p-6 text-white">
          <div className="flex items-center">
            <BarChart3 className="w-8 h-8" />
            <div className="ml-4">
              <p className="text-2xl font-bold">85%</p>
              <p className="text-orange-100">Attendance Rate</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Events */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Recent Events</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.slice(0, 3).map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {canCreateEvents && (
            <button
              onClick={() => setShowCreateForm(true)}
              className="flex items-center p-4 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
            >
              <Plus className="w-6 h-6 text-blue-600 mr-3" />
              <span className="font-medium text-blue-900">Create Event</span>
            </button>
          )}
          {canUploadPhotos && (
            <button className="flex items-center p-4 bg-green-50 hover:bg-green-100 rounded-lg transition-colors">
              <Image className="w-6 h-6 text-green-600 mr-3" />
              <span className="font-medium text-green-900">Upload Photos</span>
            </button>
          )}
          {canMarkAttendance && (
            <button className="flex items-center p-4 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors">
              <CheckCircle className="w-6 h-6 text-purple-600 mr-3" />
              <span className="font-medium text-purple-900">Mark Attendance</span>
            </button>
          )}
          {canViewReports && (
            <button className="flex items-center p-4 bg-orange-50 hover:bg-orange-100 rounded-lg transition-colors">
              <FileText className="w-6 h-6 text-orange-600 mr-3" />
              <span className="font-medium text-orange-900">View Reports</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );

  const renderEvents = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold text-gray-900">Manage Events</h3>
        {canCreateEvents && (
          <button
            onClick={() => setShowCreateForm(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Create Event</span>
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          <div key={event.id} className="relative">
            <EventCard event={event} />
            <div className="absolute top-2 right-2 flex space-x-2">
              <button className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg">
                <Edit className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleDeleteEvent(event.id)}
                className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-lg"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderCreateForm = () => (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <h3 className="text-2xl font-bold text-gray-900 mb-6">Create New Event</h3>
      <form onSubmit={handleCreateEvent} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Event Title</label>
            <input
              type="text"
              value={newEvent.title}
              onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
            <select
              value={newEvent.category}
              onChange={(e) => setNewEvent({ ...newEvent, category: e.target.value as Event['category'] })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="technical">Technical</option>
              <option value="cultural">Cultural</option>
              <option value="sports">Sports</option>
              <option value="workshop">Workshop</option>
              <option value="non-technical">Non-Technical</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
          <textarea
            value={newEvent.description}
            onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
            rows={4}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
            <input
              type="date"
              value={newEvent.date}
              onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Time</label>
            <input
              type="time"
              value={newEvent.time}
              onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Venue</label>
            <input
              type="text"
              value={newEvent.venue}
              onChange={(e) => setNewEvent({ ...newEvent, venue: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">SIL Points</label>
            <input
              type="number"
              value={newEvent.silPoints}
              onChange={(e) => setNewEvent({ ...newEvent, silPoints: parseInt(e.target.value) })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Max Participants</label>
            <input
              type="number"
              value={newEvent.maxParticipants}
              onChange={(e) => setNewEvent({ ...newEvent, maxParticipants: parseInt(e.target.value) })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Poster URL</label>
          <input
            type="url"
            value={newEvent.posterUrl}
            onChange={(e) => setNewEvent({ ...newEvent, posterUrl: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="https://images.pexels.com/..."
            required
          />
        </div>

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => setShowCreateForm(false)}
            className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
          >
            Create Event
          </button>
        </div>
      </form>
    </div>
  );

  const renderAnalytics = () => (
    <div className="space-y-8">
      <h3 className="text-2xl font-bold text-gray-900">Analytics & Reports</h3>
      
      {/* Category Performance */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h4 className="text-lg font-semibold text-gray-900 mb-6">Event Categories Performance</h4>
        <div className="space-y-4">
          {[
            { category: 'Technical', events: 12, participants: 450, points: 5400 },
            { category: 'Cultural', events: 8, participants: 320, points: 2400 },
            { category: 'Sports', events: 6, participants: 280, points: 4200 },
            { category: 'Workshop', events: 10, participants: 200, points: 3000 },
          ].map((stat, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <h5 className="font-medium text-gray-900">{stat.category}</h5>
                <p className="text-sm text-gray-600">{stat.events} events • {stat.participants} participants</p>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold text-blue-600">{stat.points}</div>
                <div className="text-xs text-gray-500">SIL Points</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Attendance Trends */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h4 className="text-lg font-semibold text-gray-900 mb-6">Monthly Attendance</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">Dec 2024</div>
            <div className="text-gray-600">320 attendees</div>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600">Jan 2025</div>
            <div className="text-gray-600">450 attendees</div>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <div className="text-2xl font-bold text-purple-600">Feb 2025</div>
            <div className="text-gray-600">280 attendees</div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600">
            Welcome back, {user?.name} ({user?.role?.charAt(0).toUpperCase() + user?.role?.slice(1)})
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6" aria-label="Tabs">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'overview' && renderOverview()}
            {activeTab === 'events' && renderEvents()}
            {activeTab === 'create' && renderCreateForm()}
            {activeTab === 'analytics' && renderAnalytics()}
            {activeTab === 'users' && (
              <div className="text-center py-12">
                <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-600">User Management</h3>
                <p className="text-gray-500">This feature will be connected to your backend system.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Create Event Modal */}
      {showCreateForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            {renderCreateForm()}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;