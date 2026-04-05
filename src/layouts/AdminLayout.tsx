import React from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, FileText, Settings as SettingsIcon, LogOut, Globe, FileEdit } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';

export default function AdminLayout() {
  const { pathname } = useLocation();
  const { logout, user } = useAuth();
  const { content } = useData();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const navItems = [
    { name: 'Dashboard', path: '/admin', icon: LayoutDashboard },
    { name: 'Content Editor', path: '/admin/content', icon: FileEdit },
    { name: 'Blog Manager', path: '/admin/blog', icon: FileText },
    { name: 'Theme Settings', path: '/admin/settings', icon: SettingsIcon },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-white flex flex-col">
        <div className="p-6 border-b border-slate-800">
          <h1 className="text-xl font-bold tracking-tight">Terra Vision</h1>
          <p className="text-slate-400 text-sm">Admin Portal</p>
        </div>
        
        <nav className="flex-1 py-6 px-3 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.path;
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center px-3 py-2.5 text-sm font-medium rounded-md transition-colors ${
                  isActive 
                    ? 'bg-slate-800 text-white' 
                    : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <Icon className="mr-3 h-5 w-5" style={{ color: isActive ? content.theme.primaryColor : undefined }} />
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-slate-800 space-y-2">
          <Link 
            to="/" 
            target="_blank"
            className="flex items-center px-3 py-2 text-sm font-medium text-slate-300 rounded-md hover:bg-slate-800 hover:text-white transition-colors"
          >
            <Globe className="mr-3 h-5 w-5 text-slate-400" />
            View Live Site
          </Link>
          <button
            onClick={handleLogout}
            className="w-full flex items-center px-3 py-2 text-sm font-medium text-slate-300 rounded-md hover:bg-slate-800 hover:text-white transition-colors"
          >
            <LogOut className="mr-3 h-5 w-5 text-slate-400" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-sm h-16 flex items-center justify-between px-8">
          <h2 className="text-xl font-semibold text-gray-800">
            {navItems.find(item => item.path === pathname)?.name || 'Admin'}
          </h2>
          <div className="flex items-center">
            <span className="text-sm text-gray-500 mr-4">Logged in as {user?.name}</span>
            <div className="h-8 w-8 rounded-full flex items-center justify-center text-white font-bold" style={{ backgroundColor: content.theme.primaryColor }}>
              {user?.name?.charAt(0) || 'A'}
            </div>
          </div>
        </header>
        
        <div className="flex-1 overflow-auto p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
