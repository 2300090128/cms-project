import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Users, Award, ArrowRight, Code, Palette, Trophy, BookOpen, Star, CheckCircle } from 'lucide-react';
import { mockEvents } from '../data/mockEvents';
import EventCard from '../components/Events/EventCard';

const LandingPage: React.FC = () => {
  const upcomingEvents = mockEvents.filter(event => event.status === 'upcoming').slice(0, 3);

  const milestones = [
    { year: '2019', title: 'Club Founded', description: 'RUBIX was established to foster innovation' },
    { year: '2021', title: '1000+ Members', description: 'Reached our first major milestone' },
    { year: '2023', title: 'National Recognition', description: 'Won Best Tech Club Award' },
    { year: '2024', title: 'Industry Partnerships', description: 'Collaborated with leading tech companies' },
  ];

  const stats = [
    { icon: Users, label: 'Active Members', value: '1,200+' },
    { icon: Calendar, label: 'Events Hosted', value: '150+' },
    { icon: Award, label: 'SIL Points Distributed', value: '50,000+' },
    { icon: Trophy, label: 'Awards Won', value: '25+' },
  ];

  const categories = [
    { icon: Code, name: 'Technical', description: 'Workshops, Hackathons, Coding Challenges' },
    { icon: Palette, name: 'Cultural', description: 'Arts, Music, Dance Performances' },
    { icon: Trophy, name: 'Sports', description: 'Inter-department Competitions' },
    { icon: BookOpen, name: 'Educational', description: 'Seminars, Guest Lectures' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-purple-700 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center space-y-8">
            <div className="flex justify-center items-center space-x-4">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                <span className="text-white font-bold text-2xl">R</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-bold">RUBIX</h1>
            </div>
            
            <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
              Empowering Innovation, Building Tomorrow
            </p>
            
            <p className="text-lg text-blue-200 max-w-4xl mx-auto">
              Join KL University's premier tech club where students discover, create, and innovate. 
              From coding marathons to cultural celebrations, RUBIX is your gateway to extraordinary experiences.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
              <Link 
                to="/signup" 
                className="bg-white text-blue-600 px-8 py-3 rounded-xl font-semibold hover:bg-blue-50 transition-colors flex items-center space-x-2 shadow-lg hover:shadow-xl"
              >
                <span>Join RUBIX</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link 
                to="/login" 
                className="border-2 border-white/30 text-white px-8 py-3 rounded-xl font-semibold hover:bg-white/10 transition-colors backdrop-blur-sm"
              >
                Member Login
              </Link>
            </div>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="border-t border-white/20 bg-white/10 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <stat.icon className="w-8 h-8 mx-auto mb-2 text-blue-200" />
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <div className="text-blue-200 text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-4xl font-bold text-gray-900">Our Journey</h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                Since 2019, RUBIX has been at the forefront of student innovation at KL University. 
                We've grown from a small group of passionate students to a thriving community of 
                1,200+ members who share a common vision: to push boundaries and create impact.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <CheckCircle className="w-6 h-6 text-blue-600 mb-2" />
                  <h3 className="font-semibold text-gray-900">Student-Led</h3>
                  <p className="text-sm text-gray-600">100% student-driven initiatives</p>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <Star className="w-6 h-6 text-purple-600 mb-2" />
                  <h3 className="font-semibold text-gray-900">Excellence</h3>
                  <p className="text-sm text-gray-600">Award-winning club activities</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              {milestones.map((milestone, index) => (
                <div key={index} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="bg-blue-600 text-white w-12 h-8 rounded-md flex items-center justify-center font-bold text-sm">
                    {milestone.year}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{milestone.title}</h3>
                    <p className="text-gray-600 text-sm">{milestone.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Event Categories */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Event Categories</h2>
            <p className="text-lg text-gray-600">Diverse opportunities for every passion</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {categories.map((category, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                <category.icon className="w-12 h-12 text-blue-600 mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{category.name}</h3>
                <p className="text-gray-600">{category.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Upcoming Events</h2>
            <p className="text-lg text-gray-600">Don't miss out on these exciting opportunities</p>
          </div>
          
          {upcomingEvents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {upcomingEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No Upcoming Events</h3>
              <p className="text-gray-500">Stay tuned for exciting events coming soon!</p>
            </div>
          )}
          
          <div className="text-center mt-12">
            <Link 
              to="/login" 
              className="inline-flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-semibold transition-colors"
            >
              <span>View All Events</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">Ready to Join the Innovation?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Be part of a community that's shaping the future. Register with your KL University email and start your journey today.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/signup" 
              className="bg-white text-blue-600 px-8 py-3 rounded-xl font-semibold hover:bg-blue-50 transition-colors inline-flex items-center space-x-2"
            >
              <span>Get Started</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link 
              to="#contact" 
              className="border-2 border-white/30 text-white px-8 py-3 rounded-xl font-semibold hover:bg-white/10 transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;