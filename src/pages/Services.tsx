import React from 'react';
import { useData } from '../context/DataContext';
import { CheckCircle, ArrowRight, Globe, Map, Layers, BarChart, BookOpen, Code, Monitor } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Services() {
  const { content } = useData();

  const iconMap: Record<string, React.ReactNode> = {
    Globe: <Globe className="w-8 h-8" />,
    Map: <Map className="w-8 h-8" />,
    Layers: <Layers className="w-8 h-8" />,
    BarChart: <BarChart className="w-8 h-8" />,
    BookOpen: <BookOpen className="w-8 h-8" />,
    Code: <Code className="w-8 h-8" />,
    Monitor: <Monitor className="w-8 h-8" />
  };

  const defaultImages = [
    'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1000&auto=format&fit=crop', // Satellite/Earth
    'https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1000&auto=format&fit=crop', // Field/Nature
    'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop'  // Dashboard/Data
  ];

  return (
    <div>
      {/* Page Header */}
      <div className="bg-gray-50 py-16 md:py-24 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6" style={{ color: content.theme.secondaryColor }}>
            Our Services
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive spatial intelligence and environmental consulting services tailored to your needs.
          </p>
        </div>
      </div>

      {/* Services List */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-16">
            {content.services.map((service, index) => (
              <div 
                key={service.id} 
                className={`flex flex-col lg:flex-row gap-12 items-center ${index % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}
              >
                <div className="w-full lg:w-1/2">
                  <div className="bg-gray-100 rounded-2xl aspect-w-16 aspect-h-10 overflow-hidden shadow-lg">
                    <img 
                      src={service.image || defaultImages[index % defaultImages.length]} 
                      alt={service.title}
                      className="object-cover w-full h-full"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </div>
                <div className="w-full lg:w-1/2">
                  <div 
                    className="w-16 h-16 rounded-xl flex items-center justify-center mb-6 text-white shadow-md"
                    style={{ backgroundColor: content.theme.primaryColor }}
                  >
                    {iconMap[service.icon] || <Globe className="w-8 h-8" />}
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">{service.title}</h2>
                  <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                    {service.description}
                  </p>
                  
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Key Features & Use Cases:</h4>
                  <ul className="space-y-3 mb-8">
                    {service.features.map((feature, i) => (
                      <li key={i} className="flex items-start">
                        <CheckCircle className="w-6 h-6 mr-3 flex-shrink-0 mt-0.5" style={{ color: content.theme.primaryColor }} />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Link 
                    to="/contact" 
                    className="inline-flex items-center font-medium hover:underline text-lg"
                    style={{ color: content.theme.primaryColor }}
                  >
                    Request this service <ArrowRight className="ml-2 w-5 h-5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Accessible Deliverables Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6" style={{ color: content.theme.secondaryColor }}>Accessible, Interactive Deliverables</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We don't just provide data; we provide tools that empower your decision-making process.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="w-14 h-14 rounded-lg flex items-center justify-center mb-6 text-white" style={{ backgroundColor: content.theme.primaryColor }}>
                <Map className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-900">Web Maps & Dashboards</h3>
              <p className="text-gray-600">Interactive spatial data visualization platforms tailored to your specific project requirements.</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="w-14 h-14 rounded-lg flex items-center justify-center mb-6 text-white" style={{ backgroundColor: content.theme.primaryColor }}>
                <Monitor className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-900">Web Applications</h3>
              <p className="text-gray-600">Custom-built spatial applications and Decision Support Systems (DSS) for complex analysis.</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="w-14 h-14 rounded-lg flex items-center justify-center mb-6 text-white" style={{ backgroundColor: content.theme.primaryColor }}>
                <BookOpen className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-900">Comprehensive Reporting</h3>
              <p className="text-gray-600">Detailed, actionable reports integrating spatial findings with environmental and social context.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
