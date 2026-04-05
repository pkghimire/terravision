import React, { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Menu, X, MapPin, Phone, Mail, Linkedin, Twitter, Facebook } from 'lucide-react';
import { useData } from '../context/DataContext';

export default function PublicLayout() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { pathname } = useLocation();
  const { content } = useData();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Blog', path: '/blog' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <div className="min-h-screen flex flex-col font-sans">
      {/* Top Bar */}
      <div className="py-2 px-4 md:px-8 text-sm hidden md:flex justify-between items-center" style={{ backgroundColor: content.theme.secondaryColor, color: content.theme.onSecondaryColor }}>
        <div className="flex items-center space-x-6">
          <span className="flex items-center"><Phone className="w-4 h-4 mr-2" /> +61 2 1234 5678</span>
          <span className="flex items-center"><Mail className="w-4 h-4 mr-2" /> info@terravisionconsult.com.au</span>
        </div>
        <div className="flex items-center space-x-4">
          <Linkedin className="w-4 h-4 cursor-pointer hover:opacity-80" />
          <Twitter className="w-4 h-4 cursor-pointer hover:opacity-80" />
          <Facebook className="w-4 h-4 cursor-pointer hover:opacity-80" />
        </div>
      </div>

      {/* Main Navigation */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <Link to="/" className="flex items-center">
                {/* Logo */}
                <div className="max-h-48 max-w-[300px] overflow-hidden">
                  <img src={content.theme.logo} alt="Terra Vision Logo" className="h-full w-auto max-h-48 object-contain" referrerPolicy="no-referrer" />
                </div>
              </Link>
            </div>
            
            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`text-sm font-medium transition-colors hover:text-primary ${
                    pathname === link.path ? 'text-primary border-b-2 border-primary' : 'text-gray-600'
                  }`}
                  style={pathname === link.path ? { color: content.theme.primaryColor, borderColor: content.theme.primaryColor } : {}}
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            {/* Mobile menu button */}
            <div className="flex items-center md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-600 hover:text-gray-900 focus:outline-none"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Nav */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    pathname === link.path ? 'bg-gray-50 text-primary' : 'text-gray-700 hover:bg-gray-50'
                  }`}
                  style={pathname === link.path ? { color: content.theme.primaryColor } : {}}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="pt-16 pb-8" style={{ backgroundColor: content.theme.secondaryColor, color: content.theme.onSecondaryColor }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div className="col-span-1 md:col-span-1">
              <Link to="/" className="flex items-center mb-2">
                <div className="max-h-40 max-w-[250px] overflow-hidden">
                  <img src={content.theme.logo} alt="Terra Vision Logo" className="h-full w-auto max-h-40 object-contain" referrerPolicy="no-referrer" />
                </div>
              </Link>
              <p className="text-sm mb-6 opacity-80" style={{ color: content.theme.onSecondaryColor }}>
                Data-driven insights for a sustainable world. Specializing in GIS, remote sensing, and environmental intelligence.
              </p>
              <div className="flex space-x-4">
                <Linkedin className="w-5 h-5 opacity-80 hover:opacity-100 cursor-pointer" />
                <Twitter className="w-5 h-5 opacity-80 hover:opacity-100 cursor-pointer" />
                <Facebook className="w-5 h-5 opacity-80 hover:opacity-100 cursor-pointer" />
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-6">Quick Links</h3>
              <ul className="space-y-3 text-sm opacity-80">
                <li><Link to="/about" className="hover:opacity-100 transition-colors">About Us</Link></li>
                <li><Link to="/services" className="hover:opacity-100 transition-colors">Our Services</Link></li>
                <li><Link to="/blog" className="hover:opacity-100 transition-colors">Insights & Blog</Link></li>
                <li><Link to="/contact" className="hover:opacity-100 transition-colors">Contact</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-6">Services</h3>
              <ul className="space-y-3 text-sm opacity-80">
                <li><Link to="/services" className="hover:opacity-100 transition-colors">Spatial Analysis</Link></li>
                <li><Link to="/services" className="hover:opacity-100 transition-colors">Environmental Modeling</Link></li>
                <li><Link to="/services" className="hover:opacity-100 transition-colors">Web Mapping</Link></li>
                <li><Link to="/services" className="hover:opacity-100 transition-colors">Capacity Building</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-6">Contact Us</h3>
              <ul className="space-y-4 text-sm opacity-80">
                <li className="flex items-start">
                  <MapPin className="w-5 h-5 mr-3 mt-0.5 opacity-60" />
                  <span>Level 4, 123 Innovation Way<br />Sydney NSW 2000<br />Australia</span>
                </li>
                <li className="flex items-center">
                  <Phone className="w-5 h-5 mr-3 opacity-60" />
                  <span>+61 2 1234 5678</span>
                </li>
                <li className="flex items-center">
                  <Mail className="w-5 h-5 mr-3 opacity-60" />
                  <span>info@terravisionconsult.com.au</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="border-t pt-8 flex flex-col md:flex-row justify-between items-center text-sm opacity-60" style={{ borderColor: `${content.theme.onSecondaryColor}20` }}>
            <p>&copy; {new Date().getFullYear()} Terra Vision Consult. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link to="#" className="hover:opacity-100">Privacy Policy</Link>
              <Link to="#" className="hover:opacity-100">Terms of Service</Link>
              <Link to="/admin/login" className="hover:opacity-100">Admin Login</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
