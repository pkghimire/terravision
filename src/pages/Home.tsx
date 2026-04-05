import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Globe, Map, Layers, CheckCircle } from 'lucide-react';
import { useData } from '../context/DataContext';

export default function Home() {
  const { content } = useData();

  const iconMap: Record<string, React.ReactNode> = {
    Globe: <Globe className="w-8 h-8" />,
    Map: <Map className="w-8 h-8" />,
    Layers: <Layers className="w-8 h-8" />
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gray-900 text-white">
        <div className="absolute inset-0 overflow-hidden">
          <img
            src={content.home.heroImage}
            alt="Environmental Landscape"
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/80 to-transparent"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 md:py-48">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 leading-tight">
              {content.home.heroHeadline}
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-10 max-w-2xl">
              {content.home.heroSubheading}
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <Link
                to="/services"
                className="px-8 py-4 rounded-md text-white font-medium text-lg text-center transition-transform hover:-translate-y-1"
                style={{ backgroundColor: content.theme.primaryColor }}
              >
                Explore Services
              </Link>
              <Link
                to="/contact"
                className="px-8 py-4 rounded-md bg-white text-gray-900 font-medium text-lg text-center transition-transform hover:-translate-y-1"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4" style={{ color: content.theme.secondaryColor }}>Our Core Services</h2>
            <p className="text-lg text-gray-600">
              We integrate advanced Geographic Information Systems (GIS), remote sensing technologies, and analytical modeling to provide accurate insights.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {content.services.slice(0, 3).map((service) => (
              <div key={service.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 hover:shadow-md transition-shadow">
                <div 
                  className="w-16 h-16 rounded-lg flex items-center justify-center mb-6 text-white"
                  style={{ backgroundColor: content.theme.primaryColor }}
                >
                  {iconMap[service.icon] || <Globe className="w-8 h-8" />}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{service.title}</h3>
                <p className="text-gray-600 mb-6 line-clamp-3">{service.description}</p>
                <Link 
                  to="/services" 
                  className="inline-flex items-center font-medium hover:underline"
                  style={{ color: content.theme.primaryColor }}
                >
                  Learn more <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Preview */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-6" style={{ color: content.theme.secondaryColor }}>
              Bridging the gap between data and actionable strategies
            </h2>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              {content.home.aboutPreview}
            </p>
            <ul className="space-y-4 mb-10 inline-block text-left">
              {['Environmental modeling', 'Conservation planning', 'Sustainable land use planning'].map((item, i) => (
                <li key={i} className="flex items-center text-gray-700">
                  <CheckCircle className="w-6 h-6 mr-3 flex-shrink-0" style={{ color: content.theme.primaryColor }} />
                  <span className="font-medium">{item}</span>
                </li>
              ))}
            </ul>
            <div className="mt-4">
              <Link
                to="/about"
                className="inline-flex items-center px-8 py-3 rounded-md text-white font-medium transition-opacity hover:opacity-90"
                style={{ backgroundColor: content.theme.secondaryColor }}
              >
                Read Our Story
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Key Sectors */}
      <section className="py-24" style={{ backgroundColor: content.theme.secondaryColor, color: content.theme.onSecondaryColor }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Key Sectors We Serve</h2>
            <p className="opacity-80 max-w-2xl mx-auto">Providing specialized spatial intelligence across critical industries.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="p-6">
              <div className="w-20 h-20 mx-auto bg-white/10 rounded-full flex items-center justify-center mb-6">
                <Globe className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-bold mb-3">Environment</h3>
              <p className="opacity-80">Conservation planning, natural hazard assessment, and ecological baselines.</p>
            </div>
            <div className="p-6">
              <div className="w-20 h-20 mx-auto bg-white/10 rounded-full flex items-center justify-center mb-6">
                <Map className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-bold mb-3">Agriculture</h3>
              <p className="opacity-80">Precision farming insights, crop monitoring, and sustainable land use planning.</p>
            </div>
            <div className="p-6">
              <div className="w-20 h-20 mx-auto bg-white/10 rounded-full flex items-center justify-center mb-6">
                <Layers className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-bold mb-3">Infrastructure</h3>
              <p className="opacity-80">GIS-based infrastructure planning, site selection, and impact assessments.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24" style={{ backgroundColor: content.theme.primaryColor }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to leverage spatial intelligence?</h2>
          <p className="text-xl text-white/90 mb-10">
            Contact us today to discuss how our data-driven solutions can support your next project.
          </p>
          <Link
            to="/contact"
            className="inline-block px-8 py-4 rounded-md bg-white font-bold text-lg transition-transform hover:-translate-y-1 shadow-lg"
            style={{ color: content.theme.primaryColor }}
          >
            Get in Touch
          </Link>
        </div>
      </section>
    </div>
  );
}
