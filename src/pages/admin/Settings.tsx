import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { Save, CheckCircle } from 'lucide-react';

export default function Settings() {
  const { content, updateContent } = useData();
  const [theme, setTheme] = useState(content.theme);
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setTheme({ ...theme, logo: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await updateContent('theme', theme);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (error) {
      console.error("Save error:", error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="bg-white shadow rounded-lg max-w-3xl">
      <div className="border-b border-gray-200 px-6 py-4 flex justify-between items-center">
        <h3 className="text-lg font-medium text-gray-900">Theme Settings</h3>
        <div className="flex items-center space-x-4">
          {showSuccess && (
            <span className="flex items-center text-sm text-blue-600 font-medium">
              <CheckCircle className="w-4 h-4 mr-1" /> Saved successfully
            </span>
          )}
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="flex items-center px-4 py-2 bg-slate-900 text-white text-sm font-medium rounded-md hover:bg-slate-800 disabled:opacity-70"
          >
            <Save className="w-4 h-4 mr-2" />
            {isSaving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>
      
      <div className="p-6 space-y-8">
        <div>
          <h4 className="text-md font-medium text-gray-900 mb-4">Brand Colors</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Primary Color</label>
              <div className="flex items-center space-x-3">
                <input
                  type="color"
                  value={theme.primaryColor}
                  onChange={(e) => setTheme({...theme, primaryColor: e.target.value})}
                  className="h-10 w-10 border border-gray-300 rounded cursor-pointer"
                />
                <input
                  type="text"
                  value={theme.primaryColor}
                  onChange={(e) => setTheme({...theme, primaryColor: e.target.value})}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-slate-500 focus:border-slate-500 uppercase"
                />
              </div>
              <p className="mt-1 text-xs text-gray-500">Used for buttons, accents, and highlights.</p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Secondary Color</label>
              <div className="flex items-center space-x-3">
                <input
                  type="color"
                  value={theme.secondaryColor}
                  onChange={(e) => setTheme({...theme, secondaryColor: e.target.value})}
                  className="h-10 w-10 border border-gray-300 rounded cursor-pointer"
                />
                <input
                  type="text"
                  value={theme.secondaryColor}
                  onChange={(e) => setTheme({...theme, secondaryColor: e.target.value})}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-slate-500 focus:border-slate-500 uppercase"
                />
              </div>
              <p className="mt-1 text-xs text-gray-500">Used for footers, dark sections, and headings.</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Base Text Color</label>
              <div className="flex items-center space-x-3">
                <input
                  type="color"
                  value={theme.textColor}
                  onChange={(e) => setTheme({...theme, textColor: e.target.value})}
                  className="h-10 w-10 border border-gray-300 rounded cursor-pointer"
                />
                <input
                  type="text"
                  value={theme.textColor}
                  onChange={(e) => setTheme({...theme, textColor: e.target.value})}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-slate-500 focus:border-slate-500 uppercase"
                />
              </div>
              <p className="mt-1 text-xs text-gray-500">The default color for body text.</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Background Font Color</label>
              <div className="flex items-center space-x-3">
                <input
                  type="color"
                  value={theme.onSecondaryColor}
                  onChange={(e) => setTheme({...theme, onSecondaryColor: e.target.value})}
                  className="h-10 w-10 border border-gray-300 rounded cursor-pointer"
                />
                <input
                  type="text"
                  value={theme.onSecondaryColor}
                  onChange={(e) => setTheme({...theme, onSecondaryColor: e.target.value})}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-slate-500 focus:border-slate-500 uppercase"
                />
              </div>
              <p className="mt-1 text-xs text-gray-500">Color of text when placed on the Secondary Color background.</p>
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-gray-200">
          <h4 className="text-md font-medium text-gray-900 mb-4">Brand Assets</h4>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Upload Local Logo</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleLogoUpload}
                className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-slate-50 file:text-slate-700 hover:file:bg-slate-100"
              />
              <p className="mt-1 text-xs text-gray-500">Upload a logo from your computer. This will be stored locally.</p>
            </div>
          </div>
          
          {theme.logo && (
            <div className="mt-4 p-4 border border-gray-100 rounded bg-gray-50 flex items-center justify-center">
              <img src={theme.logo} alt="Logo Preview" className="h-16 object-contain" />
            </div>
          )}
        </div>

        <div className="pt-6 border-t border-gray-200">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Font Family</label>
            <select
              value={theme.fontFamily}
              onChange={(e) => setTheme({...theme, fontFamily: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-slate-500 focus:border-slate-500"
            >
              <option value="Inter, sans-serif">Inter (Modern, Clean)</option>
              <option value="Poppins, sans-serif">Poppins (Geometric, Friendly)</option>
              <option value="Roboto, sans-serif">Roboto (Technical, Professional)</option>
              <option value="Merriweather, serif">Merriweather (Editorial, Classic)</option>
            </select>
          </div>
        </div>

        <div className="pt-6 border-t border-gray-200">
          <h4 className="text-md font-medium text-gray-900 mb-4">Preview</h4>
          <div className="space-y-4">
            <div className="p-6 border border-gray-200 rounded-lg" style={{ fontFamily: theme.fontFamily, color: theme.textColor }}>
              <h1 className="text-2xl font-bold mb-4" style={{ color: theme.secondaryColor }}>
                Terra Vision Consult
              </h1>
              <p className="mb-6">
                This is a preview of how your typography and base text color will look on the website.
              </p>
              <button 
                className="px-4 py-2 rounded text-white font-medium"
                style={{ backgroundColor: theme.primaryColor }}
              >
                Primary Button
              </button>
            </div>

            <div className="p-6 rounded-lg" style={{ fontFamily: theme.fontFamily, backgroundColor: theme.secondaryColor, color: theme.onSecondaryColor }}>
              <h3 className="text-lg font-bold mb-2">Background Section Preview</h3>
              <p className="text-sm opacity-80">
                This is how text looks on the secondary background color.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
