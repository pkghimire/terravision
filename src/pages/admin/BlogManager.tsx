import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { Plus, Edit2, Trash2, Eye, EyeOff, X, Save } from 'lucide-react';

export default function BlogManager() {
  const { content, updateContent } = useData();
  const [posts, setPosts] = useState(content.blog);
  const [isEditing, setIsEditing] = useState(false);
  const [currentPost, setCurrentPost] = useState<any>(null);

  const togglePublish = (id: string) => {
    const updatedPosts = posts.map(post => 
      post.id === id ? { ...post, published: !post.published } : post
    );
    setPosts(updatedPosts);
    updateContent('blog', updatedPosts);
  };

  const deletePost = (id: string) => {
    if (confirm('Are you sure you want to delete this post?')) {
      const updatedPosts = posts.filter(post => post.id !== id);
      setPosts(updatedPosts);
      updateContent('blog', updatedPosts);
    }
  };

  const handleEdit = (post: any) => {
    setCurrentPost(post);
    setIsEditing(true);
  };

  const handleAddNew = () => {
    setCurrentPost({
      id: `post-${Date.now()}`,
      title: '',
      excerpt: '',
      content: '',
      author: 'Admin',
      date: new Date().toISOString().split('T')[0],
      category: 'General',
      published: false
    });
    setIsEditing(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    let updatedPosts;
    if (posts.find(p => p.id === currentPost.id)) {
      updatedPosts = posts.map(p => p.id === currentPost.id ? currentPost : p);
    } else {
      updatedPosts = [currentPost, ...posts];
    }
    setPosts(updatedPosts);
    updateContent('blog', updatedPosts);
    setIsEditing(false);
    setCurrentPost(null);
  };

  return (
    <div className="bg-white shadow rounded-lg">
      <div className="border-b border-gray-200 px-6 py-4 flex justify-between items-center">
        <h3 className="text-lg font-medium text-gray-900">Blog Posts</h3>
        <button 
          onClick={handleAddNew}
          className="flex items-center px-4 py-2 bg-slate-900 text-white text-sm font-medium rounded-md hover:bg-slate-800"
        >
          <Plus className="w-4 h-4 mr-2" />
          New Post
        </button>
      </div>
      
      {!isEditing ? (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {posts.map((post) => (
                <tr key={post.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{post.title}</div>
                    <div className="text-sm text-gray-500">{post.author}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                      {post.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(post.date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button 
                      onClick={() => togglePublish(post.id)}
                      className={`inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded ${
                        post.published ? 'text-green-700 bg-green-100 hover:bg-green-200' : 'text-yellow-700 bg-yellow-100 hover:bg-yellow-200'
                      }`}
                    >
                      {post.published ? <Eye className="w-3 h-3 mr-1" /> : <EyeOff className="w-3 h-3 mr-1" />}
                      {post.published ? 'Published' : 'Draft'}
                    </button>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button 
                      onClick={() => handleEdit(post)}
                      className="text-indigo-600 hover:text-indigo-900 mr-4"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button onClick={() => deletePost(post.id)} className="text-red-600 hover:text-red-900">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
              {posts.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                    No blog posts found. Create your first post!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="p-6">
          <form onSubmit={handleSave} className="space-y-6 max-w-4xl">
            <div className="flex justify-between items-center mb-4">
              <h4 className="text-md font-medium text-gray-900">{currentPost.id.startsWith('post-') ? 'New Post' : 'Edit Post'}</h4>
              <button 
                type="button"
                onClick={() => setIsEditing(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                  <input
                    type="text"
                    required
                    value={currentPost.title}
                    onChange={(e) => setCurrentPost({...currentPost, title: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-slate-500 focus:border-slate-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                  <input
                    type="text"
                    required
                    value={currentPost.category}
                    onChange={(e) => setCurrentPost({...currentPost, category: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-slate-500 focus:border-slate-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Author</label>
                  <input
                    type="text"
                    required
                    value={currentPost.author}
                    onChange={(e) => setCurrentPost({...currentPost, author: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-slate-500 focus:border-slate-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                  <input
                    type="date"
                    required
                    value={currentPost.date}
                    onChange={(e) => setCurrentPost({...currentPost, date: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-slate-500 focus:border-slate-500"
                  />
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Excerpt</label>
                  <textarea
                    rows={3}
                    required
                    value={currentPost.excerpt}
                    onChange={(e) => setCurrentPost({...currentPost, excerpt: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-slate-500 focus:border-slate-500"
                  />
                </div>
                <div className="flex items-center pt-4">
                  <input
                    type="checkbox"
                    id="published"
                    checked={currentPost.published}
                    onChange={(e) => setCurrentPost({...currentPost, published: e.target.checked})}
                    className="h-4 w-4 text-slate-600 focus:ring-slate-500 border-gray-300 rounded"
                  />
                  <label htmlFor="published" className="ml-2 block text-sm text-gray-900">
                    Published
                  </label>
                </div>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Content (Markdown supported)</label>
              <textarea
                rows={12}
                required
                value={currentPost.content}
                onChange={(e) => setCurrentPost({...currentPost, content: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-slate-500 focus:border-slate-500 font-mono text-sm"
              />
            </div>
            
            <div className="pt-4 flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex items-center px-4 py-2 bg-slate-900 text-white text-sm font-medium rounded-md hover:bg-slate-800"
              >
                <Save className="w-4 h-4 mr-2" />
                Save Post
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
