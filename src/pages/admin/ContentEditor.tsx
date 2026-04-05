import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { Save, CheckCircle } from 'lucide-react';

export default function ContentEditor() {
  const { content, updateContent } = useData();
  const [activeTab, setActiveTab] = useState('home');
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Local state for editing
  const [homeData, setHomeData] = useState(content.home);
  const [aboutData, setAboutData] = useState(content.about);
  const [servicesData, setServicesData] = useState(content.services);

  const handleHeroImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 800000) { // ~800KB
        alert('Image is too large. Please choose an image under 800KB.');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setHomeData({ ...homeData, heroImage: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAboutImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 800000) {
        alert('Image is too large. Please choose an image under 800KB.');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setAboutData({ ...aboutData, aboutImage: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    
    try {
      await Promise.all([
        updateContent('home', homeData),
        updateContent('about', aboutData),
        updateContent('services', servicesData)
      ]);
      
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (error) {
      console.error("Save error:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const updateService = (id: string, field: string, value: any) => {
    setServicesData(servicesData.map(s => s.id === id ? { ...s, [field]: value } : s));
  };

  const addService = () => {
    const newService = {
      id: `service-${Date.now()}`,
      title: 'New Service',
      description: 'Service description goes here.',
      icon: 'Globe',
      features: ['Feature 1', 'Feature 2']
    };
    setServicesData([...servicesData, newService]);
  };

  const deleteService = (id: string) => {
    if (confirm('Are you sure you want to delete this service?')) {
      setServicesData(servicesData.filter(s => s.id !== id));
    }
  };

  const updateFeature = (serviceId: string, featureIndex: number, value: string) => {
    setServicesData(servicesData.map(s => {
      if (s.id === serviceId) {
        const newFeatures = [...s.features];
        newFeatures[featureIndex] = value;
        return { ...s, features: newFeatures };
      }
      return s;
    }));
  };

  const addFeature = (serviceId: string) => {
    setServicesData(servicesData.map(s => {
      if (s.id === serviceId) {
        return { ...s, features: [...s.features, 'New Feature'] };
      }
      return s;
    }));
  };

  const removeFeature = (serviceId: string, featureIndex: number) => {
    setServicesData(servicesData.map(s => {
      if (s.id === serviceId) {
        return { ...s, features: s.features.filter((_, i) => i !== featureIndex) };
      }
      return s;
    }));
  };

  const updateCoreValue = (index: number, value: string) => {
    const newValues = [...(aboutData.coreValues || [])];
    newValues[index] = value;
    setAboutData({ ...aboutData, coreValues: newValues });
  };

  const addCoreValue = () => {
    setAboutData({ ...aboutData, coreValues: [...(aboutData.coreValues || []), 'New Value'] });
  };

  const removeCoreValue = (index: number) => {
    setAboutData({ ...aboutData, coreValues: (aboutData.coreValues || []).filter((_, i) => i !== index) });
  };

  const updateTeamMember = (id: string, field: string, value: any) => {
    setAboutData({
      ...aboutData,
      team: (aboutData.team || []).map(m => m.id === id ? { ...m, [field]: value } : m)
    });
  };

  const addTeamMember = () => {
    const newMember = {
      id: `member-${Date.now()}`,
      name: 'New Member',
      role: 'Consultant',
      bio: 'Short bio here...',
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=800&auto=format&fit=crop'
    };
    setAboutData({ ...aboutData, team: [...(aboutData.team || []), newMember] });
  };

  const deleteTeamMember = (id: string) => {
    if (confirm('Are you sure you want to delete this team member?')) {
      setAboutData({ ...aboutData, team: (aboutData.team || []).filter(m => m.id !== id) });
    }
  };

  const handleTeamPhotoUpload = (id: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 500000) { // ~500KB for team members
        alert('Image is too large. Please choose an image under 500KB.');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        updateTeamMember(id, 'image', reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleServiceImageUpload = (id: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 800000) { // ~800KB
        alert('Image is too large. Please choose an image under 800KB.');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        updateService(id, 'image', reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="bg-white shadow rounded-lg flex flex-col h-[calc(100vh-8rem)]">
      <div className="border-b border-gray-200 px-6 py-4 flex justify-between items-center">
        <div className="flex space-x-4">
          <button
            onClick={() => setActiveTab('home')}
            className={`px-3 py-2 text-sm font-medium rounded-md ${
              activeTab === 'home' ? 'bg-slate-100 text-slate-900' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Home Page
          </button>
          <button
            onClick={() => setActiveTab('about')}
            className={`px-3 py-2 text-sm font-medium rounded-md ${
              activeTab === 'about' ? 'bg-slate-100 text-slate-900' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            About Page
          </button>
          <button
            onClick={() => setActiveTab('services')}
            className={`px-3 py-2 text-sm font-medium rounded-md ${
              activeTab === 'services' ? 'bg-slate-100 text-slate-900' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Services Page
          </button>
        </div>
        
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

      <div className="p-6 flex-1 overflow-auto">
        {activeTab === 'home' && (
          <div className="space-y-6 max-w-3xl">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Hero Headline</label>
              <input
                type="text"
                value={homeData.heroHeadline}
                onChange={(e) => setHomeData({...homeData, heroHeadline: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-slate-500 focus:border-slate-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Hero Subheading</label>
              <textarea
                rows={3}
                value={homeData.heroSubheading}
                onChange={(e) => setHomeData({...homeData, heroSubheading: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-slate-500 focus:border-slate-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Upload Local Hero Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleHeroImageUpload}
                className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-slate-50 file:text-slate-700 hover:file:bg-slate-100"
              />
              <p className="mt-1 text-xs text-gray-500">Upload an image from your computer to use as the hero background.</p>
            </div>
            {homeData.heroImage && (
              <div className="mt-2 h-32 w-full rounded overflow-hidden border border-gray-200">
                <img src={homeData.heroImage} alt="Hero Preview" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </div>
            )}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">About Preview Text</label>
              <textarea
                rows={4}
                value={homeData.aboutPreview}
                onChange={(e) => setHomeData({...homeData, aboutPreview: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-slate-500 focus:border-slate-500"
              />
            </div>
          </div>
        )}

        {activeTab === 'about' && (
          <div className="space-y-6 max-w-3xl">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Main Content</label>
              <textarea
                rows={10}
                value={aboutData.content}
                onChange={(e) => setAboutData({...aboutData, content: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-slate-500 focus:border-slate-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Mission Statement</label>
              <textarea
                rows={3}
                value={aboutData.mission}
                onChange={(e) => setAboutData({...aboutData, mission: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-slate-500 focus:border-slate-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Vision Statement</label>
              <textarea
                rows={3}
                value={aboutData.vision}
                onChange={(e) => setAboutData({...aboutData, vision: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-slate-500 focus:border-slate-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Upload Local About Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleAboutImageUpload}
                className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-slate-50 file:text-slate-700 hover:file:bg-slate-100"
              />
              <p className="mt-1 text-xs text-gray-500">Upload an image from your computer to use on the about page.</p>
            </div>
            {aboutData.aboutImage && (
              <div className="mt-2 h-32 w-full rounded overflow-hidden border border-gray-200">
                <img src={aboutData.aboutImage} alt="About Preview" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </div>
            )}

            <div className="pt-8 border-t border-gray-200">
              <div className="flex justify-between items-center mb-4">
                <h4 className="text-lg font-medium text-gray-900">Core Values</h4>
                <button
                  onClick={addCoreValue}
                  className="text-sm text-slate-600 font-medium hover:text-slate-900"
                >
                  + Add Value
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {(aboutData.coreValues || []).map((value, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <input
                      type="text"
                      value={value}
                      onChange={(e) => updateCoreValue(index, e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-slate-500 focus:border-slate-500 text-sm"
                    />
                    <button
                      onClick={() => removeCoreValue(index)}
                      className="text-gray-400 hover:text-red-600"
                    >
                      &times;
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-8 border-t border-gray-200">
              <div className="flex justify-between items-center mb-6">
                <h4 className="text-lg font-medium text-gray-900">Our Leadership Team</h4>
                <button
                  onClick={addTeamMember}
                  className="px-4 py-2 bg-slate-900 text-white text-sm font-medium rounded-md hover:bg-slate-800"
                >
                  Add Team Member
                </button>
              </div>
              
              <div className="space-y-8">
                {(aboutData.team || []).map((member) => (
                  <div key={member.id} className="p-6 border border-gray-200 rounded-lg bg-gray-50 relative">
                    <button
                      onClick={() => deleteTeamMember(member.id)}
                      className="absolute top-4 right-4 text-red-600 hover:text-red-800 text-sm font-medium"
                    >
                      Delete Member
                    </button>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="space-y-4">
                        <div className="aspect-square rounded-lg overflow-hidden border border-gray-200 bg-white">
                          <img src={member.image} alt={member.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-gray-500 mb-1">Upload Photo</label>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleTeamPhotoUpload(member.id, e)}
                            className="w-full text-xs text-gray-500 file:mr-2 file:py-1 file:px-2 file:rounded file:border-0 file:text-xs file:font-semibold file:bg-slate-100 file:text-slate-700 hover:file:bg-slate-200"
                          />
                        </div>
                      </div>
                      
                      <div className="md:col-span-2 space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                          <input
                            type="text"
                            value={member.name}
                            onChange={(e) => updateTeamMember(member.id, 'name', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-slate-500 focus:border-slate-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                          <input
                            type="text"
                            value={member.role}
                            onChange={(e) => updateTeamMember(member.id, 'role', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-slate-500 focus:border-slate-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Bio / Profile</label>
                          <textarea
                            rows={3}
                            value={member.bio}
                            onChange={(e) => updateTeamMember(member.id, 'bio', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-slate-500 focus:border-slate-500"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'services' && (
          <div className="space-y-12 max-w-4xl">
            <div className="flex justify-between items-center">
              <h4 className="text-lg font-medium text-gray-900">Manage Services</h4>
              <button
                onClick={addService}
                className="px-4 py-2 bg-slate-900 text-white text-sm font-medium rounded-md hover:bg-slate-800"
              >
                Add New Service
              </button>
            </div>
            
            <div className="space-y-8">
              {servicesData.map((service) => (
                <div key={service.id} className="p-6 border border-gray-200 rounded-lg bg-gray-50 relative">
                  <button
                    onClick={() => deleteService(service.id)}
                    className="absolute top-4 right-4 text-red-600 hover:text-red-800 text-sm font-medium"
                  >
                    Delete Service
                  </button>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Service Title</label>
                        <input
                          type="text"
                          value={service.title}
                          onChange={(e) => updateService(service.id, 'title', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-slate-500 focus:border-slate-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Icon Name (Lucide)</label>
                        <select
                          value={service.icon}
                          onChange={(e) => updateService(service.id, 'icon', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-slate-500 focus:border-slate-500"
                        >
                          <option value="Globe">Globe</option>
                          <option value="Map">Map</option>
                          <option value="Layers">Layers</option>
                          <option value="BarChart">BarChart</option>
                          <option value="BookOpen">BookOpen</option>
                          <option value="Code">Code</option>
                          <option value="Monitor">Monitor</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                        <textarea
                          rows={4}
                          value={service.description}
                          onChange={(e) => updateService(service.id, 'description', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-slate-500 focus:border-slate-500"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Service Image</label>
                        <div className="mb-2 h-32 w-full rounded overflow-hidden border border-gray-200 bg-gray-100">
                          <img 
                            src={service.image || [
                              'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800&auto=format&fit=crop',
                              'https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=800&auto=format&fit=crop',
                              'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop'
                            ][servicesData.indexOf(service) % 3]} 
                            alt={service.title} 
                            className="w-full h-full object-cover" 
                            referrerPolicy="no-referrer" 
                          />
                        </div>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleServiceImageUpload(service.id, e)}
                          className="w-full text-xs text-gray-500 file:mr-2 file:py-1 file:px-2 file:rounded file:border-0 file:text-xs file:font-semibold file:bg-slate-100 file:text-slate-700 hover:file:bg-slate-200"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Key Features</label>
                        <div className="space-y-2">
                          {service.features.map((feature, fIndex) => (
                            <div key={fIndex} className="flex items-center space-x-2">
                              <input
                                type="text"
                                value={feature}
                                onChange={(e) => updateFeature(service.id, fIndex, e.target.value)}
                                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-slate-500 focus:border-slate-500 text-sm"
                              />
                              <button
                                onClick={() => removeFeature(service.id, fIndex)}
                                className="text-gray-400 hover:text-red-600"
                              >
                                &times;
                              </button>
                            </div>
                          ))}
                          <button
                            onClick={() => addFeature(service.id)}
                            className="text-sm text-slate-600 font-medium hover:text-slate-900"
                          >
                            + Add Feature
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
