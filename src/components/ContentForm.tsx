'use client';
import { useState } from 'react';

interface ContentFormProps {
  projectId: number;
  onSubmit: (data: { title: string; content: string }) => void;
  initialData?: { title: string; content: string };
  isLoading?: boolean;
}

export default function ContentForm({ projectId, onSubmit, initialData, isLoading = false, }: ContentFormProps) {
  const [title, setTitle] = useState(initialData?.title || '');
  const [content, setContent] = useState(initialData?.content || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ title, content });
  };  

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium">Title</label>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required className="w-full px-4 py-2 border border-gray-300 rounded-lg" placeholder="Letter title or content name" />
      </div>
      <div>
        <label className="block text-sm font-medium">Content</label>
        <textarea value={content} onChange={(e) => setContent(e.target.value)} required className="w-full px-4 py-2 border border-gray-300 rounded-lg" placeholder="Write your letter or message..." rows={8} />
      </div>
      <button type="submit" disabled={isLoading} className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50">
        {isLoading ? 'Saving...' : 'Save Content'}
      </button>
    </form>
  );
}