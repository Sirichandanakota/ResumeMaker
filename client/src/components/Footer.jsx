import React from 'react';
import { Heart } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-8 mt-16">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Section */}
          <div className="flex flex-col justify-between">
            <div>
              <h3 className="text-xl font-bold mb-2">Resume Maker</h3>
              <p className="text-blue-100 text-sm">Create professional resumes in minutes</p>
            </div>
          </div>

          {/* Links Section */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-blue-100 text-sm">
              <li><a href="#" className="hover:text-white transition">Home</a></li>
              <li><a href="#" className="hover:text-white transition">Templates</a></li>
              <li><a href="#" className="hover:text-white transition">About</a></li>
              <li><a href="#" className="hover:text-white transition">Contact</a></li>
            </ul>
          </div>

          {/* Social Section */}
          <div>
            <h4 className="font-semibold mb-4">Follow Us</h4>
            <div className="flex gap-4">
              <a href="#" className="text-blue-100 hover:text-white transition">Twitter</a>
              <a href="#" className="text-blue-100 hover:text-white transition">LinkedIn</a>
              <a href="#" className="text-blue-100 hover:text-white transition">GitHub</a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-blue-400 mt-8 pt-8">
          {/* Bottom Section */}
          <div className="flex flex-col md:flex-row justify-between items-center text-blue-100 text-sm">
            <p className="mb-4 md:mb-0">
              © {currentYear} Resume Maker. All rights reserved.
            </p>
            <div className="flex items-center gap-1">
              Made with <Heart size={16} className="text-red-400" /> by Resume Maker Team
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
