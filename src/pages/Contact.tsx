import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { MapPin, Phone, Mail, Send, CheckCircle } from 'lucide-react';

export default function Contact() {
  const { content } = useData();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      
      // Reset success message after 5 seconds
      setTimeout(() => setIsSuccess(false), 5000);
    }, 1500);
  };

  return (
    <div>
      {/* Page Header */}
      <div className="bg-gray-50 py-16 md:py-24 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6" style={{ color: content.theme.secondaryColor }}>
            Contact Us
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Get in touch to discuss how our spatial intelligence solutions can support your project.
          </p>
        </div>
      </div>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            
            {/* Contact Info */}
            <div className="lg:col-span-1 space-y-8">
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Get in Touch</h3>
                
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center mr-4 flex-shrink-0">
                      <MapPin className="w-6 h-6" style={{ color: content.theme.primaryColor }} />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-1">Office Location</h4>
                      <p className="text-gray-600">Level 4, 123 Innovation Way<br />Sydney NSW 2000<br />Australia</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center mr-4 flex-shrink-0">
                      <Phone className="w-6 h-6" style={{ color: content.theme.primaryColor }} />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-1">Phone</h4>
                      <p className="text-gray-600">+61 2 1234 5678</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center mr-4 flex-shrink-0">
                      <Mail className="w-6 h-6" style={{ color: content.theme.primaryColor }} />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-1">Email</h4>
                      <p className="text-gray-600">info@terravisionconsult.com.au</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Map Placeholder */}
              <div className="bg-gray-200 rounded-2xl h-64 w-full overflow-hidden relative">
                <img 
                  src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=1000&auto=format&fit=crop" 
                  alt="Map of Sydney" 
                  className="w-full h-full object-cover opacity-80"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-white px-4 py-2 rounded-md shadow-lg font-medium text-sm flex items-center">
                    <MapPin className="w-4 h-4 mr-2" style={{ color: content.theme.primaryColor }} />
                    Terra Vision Consult
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-gray-100">
                <h3 className="text-2xl font-bold text-gray-900 mb-8">Send us a message</h3>
                
                {isSuccess ? (
                  <div className="rounded-xl p-8 text-center border" style={{ backgroundColor: `${content.theme.primaryColor}10`, borderColor: `${content.theme.primaryColor}30` }}>
                    <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: `${content.theme.primaryColor}20` }}>
                      <CheckCircle className="w-8 h-8" style={{ color: content.theme.primaryColor }} />
                    </div>
                    <h4 className="text-xl font-bold text-gray-900 mb-2">Message Sent Successfully!</h4>
                    <p className="text-gray-600">Thank you for reaching out. One of our consultants will get back to you shortly.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:border-transparent transition-shadow"
                          style={{ focusRingColor: content.theme.primaryColor }}
                          placeholder="John Doe"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:border-transparent transition-shadow"
                          style={{ focusRingColor: content.theme.primaryColor }}
                          placeholder="john@example.com"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">Subject *</label>
                      <select
                        id="subject"
                        name="subject"
                        required
                        value={formData.subject}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:border-transparent transition-shadow bg-white"
                        style={{ focusRingColor: content.theme.primaryColor }}
                      >
                        <option value="">Select a subject...</option>
                        <option value="General Inquiry">General Inquiry</option>
                        <option value="Project Proposal">Project Proposal</option>
                        <option value="Consulting Services">Consulting Services</option>
                        <option value="Partnership">Partnership</option>
                      </select>
                    </div>
                    
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">Message *</label>
                      <textarea
                        id="message"
                        name="message"
                        required
                        rows={6}
                        value={formData.message}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:border-transparent transition-shadow resize-none"
                        style={{ focusRingColor: content.theme.primaryColor }}
                        placeholder="How can we help you?"
                      ></textarea>
                    </div>
                    
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full md:w-auto px-8 py-4 rounded-md text-white font-medium text-lg flex items-center justify-center transition-opacity hover:opacity-90 disabled:opacity-70"
                      style={{ backgroundColor: content.theme.primaryColor }}
                    >
                      {isSubmitting ? (
                        <span className="flex items-center">Sending...</span>
                      ) : (
                        <span className="flex items-center">Send Message <Send className="ml-2 w-5 h-5" /></span>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
