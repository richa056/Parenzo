'use client';

import { format } from 'date-fns';
import { ForumPost, ForumReply } from '@/lib/mockData';
import { UserRole } from '@/lib/auth';
import { useState } from 'react';

const getRoleColor = (role: UserRole) => {
  switch (role) {
    case 'medical_monitor':
      return 'bg-blue-100 border-blue-200';
    case 'mom':
      return 'bg-pink-100 border-pink-200';
    case 'dad':
      return 'bg-green-100 border-green-200';
    default:
      return 'bg-gray-100 border-gray-200';
  }
};

const getRoleBadge = (role: UserRole) => {
  switch (role) {
    case 'medical_monitor':
      return 'Medical Monitor';
    case 'mom':
      return 'Mom';
    case 'dad':
      return 'Dad';
    default:
      return role;
  }
};

interface ForumPostProps {
  post: ForumPost;
}

export default function ForumPostComponent({ post }: ForumPostProps) {
  const [replyContent, setReplyContent] = useState('');

  const handleReply = () => {
    if (!replyContent.trim()) return;
    
    // Here you would typically make an API call to post the reply
    console.log('Posting reply:', replyContent);
    setReplyContent('');
  };

  return (
    <div className="bg-white rounded-lg shadow p-6 mb-6">
      <div className={`p-4 rounded-lg border ${getRoleColor(post.author.role)}`}>
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-xl font-semibold">{post.title}</h3>
            <p className="text-sm text-gray-500">
              {post.author.name} • {getRoleBadge(post.author.role)}
            </p>
          </div>
          <span className="text-sm text-gray-500">
            {format(new Date(post.createdAt), 'MMM d, yyyy h:mm a')}
          </span>
        </div>
        <p className="text-gray-700">{post.content}</p>
      </div>

      <div className="mt-6 space-y-4">
        <h4 className="font-semibold">Replies ({post.replies.length})</h4>
        {post.replies.map((reply) => (
          <div
            key={reply._id}
            className={`p-4 rounded-lg border ${getRoleColor(reply.author.role)}`}
          >
            <div className="flex justify-between items-start mb-2">
              <div>
                <p className="font-medium">{reply.author.name}</p>
                <p className="text-sm text-gray-500">{getRoleBadge(reply.author.role)}</p>
              </div>
              <span className="text-sm text-gray-500">
                {format(new Date(reply.createdAt), 'MMM d, yyyy h:mm a')}
              </span>
            </div>
            <p className="text-gray-700">{reply.content}</p>
          </div>
        ))}

        <div className="mt-4">
          <textarea
            className="w-full p-2 border rounded-lg"
            placeholder="Write a reply..."
            rows={3}
            value={replyContent}
            onChange={(e) => setReplyContent(e.target.value)}
          />
          <button 
            onClick={handleReply}
            className="mt-2 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            Post Reply
          </button>
        </div>
      </div>
    </div>
  );
} 