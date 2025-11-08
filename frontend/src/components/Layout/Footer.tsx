import React from 'react';
import { Heart, Github, Mail, MapPin, Phone } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Club Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">R</span>
              </div>
              <h3 className="text-xl font-bold">RUBIX</h3>
            </div>
            <p className="text-gray-400">
              Empowering students through technology, innovation, and community engagement.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#about" className="text-gray-400 hover:text-white transition-colors">About Us</a></li>
              <li><a href="#events" className="text-gray-400 hover:text-white transition-colors">Events</a></li>
              <li><a href="#gallery" className="text-gray-400 hover:text-white transition-colors">Gallery</a></li>
              <li><a href="#contact" className="text-gray-400 hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Contact Info</h4>
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-gray-400">
                <MapPin className="w-4 h-4" />
                <span>KL University, Guntur</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-400">
                <Mail className="w-4 h-4" />
                <span>rubix@kluniversity.in</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-400">
                <Phone className="w-4 h-4" />
                <span>+91 98765 43210</span>
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Follow Us</h4>
            <div className="flex space-x-4">
              <a href="#" className="bg-gray-800 hover:bg-gray-700 p-2 rounded-lg transition-colors">
                <Github className="w-5 h-5" />
              </a>
              <a href="#" className="bg-gray-800 hover:bg-gray-700 p-2 rounded-lg transition-colors">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p className="flex items-center justify-center space-x-1">
            <span>Made with</span>
            <Heart className="w-4 h-4 text-red-500 fill-current" />
            <span>by RUBIX Team © 2025</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;