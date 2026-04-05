import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { useData } from '../context/DataContext';
import { Calendar, User, Tag, ArrowLeft, Share2, Twitter, Linkedin, Facebook } from 'lucide-react';

export default function BlogPost() {
  const { id } = useParams<{ id: string }>();
  const { content } = useData();
  
  const post = content.blog.find(p => p.id === id && p.published);

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  return (
    <article className="pb-20">
      {/* Hero Header */}
      <div className="relative bg-gray-900 text-white py-24 md:py-32">
        <div className="absolute inset-0 overflow-hidden">
          <img
            src={`https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2000&auto=format&fit=crop&sig=${post.id}`}
            alt={post.title}
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>
        </div>
        
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span 
            className="inline-block px-3 py-1 rounded-full text-sm font-medium mb-6"
            style={{ backgroundColor: content.theme.primaryColor }}
          >
            {post.category}
          </span>
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-8 leading-tight">
            {post.title}
          </h1>
          <div className="flex items-center justify-center space-x-6 text-gray-300 text-sm">
            <span className="flex items-center"><Calendar className="w-4 h-4 mr-2" /> {new Date(post.date).toLocaleDateString()}</span>
            <span className="flex items-center"><User className="w-4 h-4 mr-2" /> {post.author}</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Link to="/blog" className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 mb-10 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to all articles
        </Link>
        
        <div className="prose prose-lg max-w-none text-gray-700">
          {/* Mock rendering of content. In a real app, use a markdown parser or dangerouslySetInnerHTML if trusted */}
          {post.content.split('\n\n').map((paragraph, idx) => (
            <p key={idx} className="mb-6 leading-relaxed">{paragraph}</p>
          ))}
          
          {/* Placeholder for long content */}
          {post.content === 'Full content here...' && (
            <>
              <p className="mb-6 leading-relaxed">
                Geographic Information Systems (GIS) have revolutionized the way we approach sustainable agriculture. By integrating spatial data with traditional farming practices, we can optimize resource use, minimize environmental impact, and increase overall yield.
              </p>
              <h3 className="text-2xl font-bold text-gray-900 mt-10 mb-4">Precision Farming and Resource Optimization</h3>
              <p className="mb-6 leading-relaxed">
                One of the key benefits of GIS in agriculture is precision farming. By analyzing soil types, moisture levels, and topography, farmers can apply water, fertilizers, and pesticides only where needed. This targeted approach reduces waste and prevents harmful runoff into nearby water bodies.
              </p>
              <blockquote className="border-l-4 pl-6 italic text-gray-600 my-8" style={{ borderColor: content.theme.primaryColor }}>
                "The integration of spatial intelligence into daily farming operations is no longer a luxury; it is a necessity for sustainable food production in the 21st century."
              </blockquote>
              <p className="mb-6 leading-relaxed">
                Furthermore, remote sensing technologies allow for real-time monitoring of crop health. Early detection of disease or stress enables rapid intervention, saving entire harvests that might otherwise be lost.
              </p>
            </>
          )}
        </div>

        {/* Share Section */}
        <div className="mt-16 pt-8 border-t border-gray-200 flex items-center justify-between">
          <div className="flex items-center text-gray-900 font-medium">
            <Share2 className="w-5 h-5 mr-3 text-gray-500" /> Share this article
          </div>
          <div className="flex space-x-4">
            <button className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-[#1DA1F2] hover:text-white transition-colors">
              <Twitter className="w-5 h-5" />
            </button>
            <button className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-[#0A66C2] hover:text-white transition-colors">
              <Linkedin className="w-5 h-5" />
            </button>
            <button className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-[#1877F2] hover:text-white transition-colors">
              <Facebook className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
