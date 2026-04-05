import React from 'react';
import { useData } from '../context/DataContext';
import { Target, Eye, Shield, Users, Lightbulb, Leaf } from 'lucide-react';

export default function About() {
  const { content } = useData();

  const valueIcons: Record<string, React.ReactNode> = {
    'Innovation': <Lightbulb className="w-6 h-6" />,
    'Sustainability': <Leaf className="w-6 h-6" />,
    'Integrity': <Shield className="w-6 h-6" />,
    'Excellence': <Target className="w-6 h-6" />,
    'Collaboration': <Users className="w-6 h-6" />
  };

  return (
    <div>
      {/* Page Header */}
      <div className="bg-gray-50 py-16 md:py-24 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6" style={{ color: content.theme.secondaryColor }}>
            About Terra Vision Consult
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Delivering innovative, data-driven solutions for complex environmental and spatial challenges.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div className="prose prose-lg text-gray-600">
              {content.about.content.split('\n\n').map((paragraph, index) => (
                <p key={index} className="mb-6 leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
            <div>
              <div className="bg-gray-50 rounded-2xl p-8 mb-8 border border-gray-100">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center mr-4 text-white" style={{ backgroundColor: content.theme.primaryColor }}>
                    <Target className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">Our Mission</h3>
                </div>
                <p className="text-gray-700 text-lg">{content.about.mission}</p>
              </div>

              <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center mr-4 text-white" style={{ backgroundColor: content.theme.secondaryColor }}>
                    <Eye className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">Our Vision</h3>
                </div>
                <p className="text-gray-700 text-lg">{content.about.vision}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20" style={{ backgroundColor: content.theme.secondaryColor, color: content.theme.onSecondaryColor }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Our Core Values</h2>
            <p className="opacity-80 max-w-2xl mx-auto">The principles that guide our work and relationships.</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
            {(content.about.coreValues || []).map((value, index) => (
              <div key={index} className="text-center p-6 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-colors">
                <div className="w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4" style={{ backgroundColor: content.theme.primaryColor }}>
                  {valueIcons[value] || <Shield className="w-8 h-8" />}
                </div>
                <h3 className="text-lg font-bold">{value}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4" style={{ color: content.theme.secondaryColor }}>Our Leadership</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">A multidisciplinary team of experts in GIS, remote sensing, and environmental science.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {(content.about.team || []).map((member) => (
              <div key={member.id} className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 text-center">
                <div className="h-64 bg-gray-200 w-full">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
                  <p className="text-sm font-medium mb-4" style={{ color: content.theme.primaryColor }}>{member.role}</p>
                  <p className="text-gray-600 text-sm">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
