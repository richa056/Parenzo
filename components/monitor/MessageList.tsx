import { useState } from 'react';
import { format } from 'date-fns';

interface Message {
  _id: string;
  content: string;
  createdAt: Date;
  status: string;
  sender: {
    name: string;
    email: string;
  };
}

interface MessageListProps {
  messages: Message[];
}

export default function MessageList({ messages }: MessageListProps) {
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [response, setResponse] = useState('');

  const handleRespond = async (messageId: string) => {
    try {
      const res = await fetch('/api/messages/respond', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messageId,
          content: response,
        }),
      });

      if (res.ok) {
        // Refresh the messages list
        window.location.reload();
      }
    } catch (error) {
      console.error('Error responding to message:', error);
    }
  };

  return (
    <div className="space-y-4">
      {messages.length === 0 ? (
        <p className="text-gray-500">No pending messages</p>
      ) : (
        messages.map((message) => (
          <div
            key={message._id}
            className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer"
            onClick={() => setSelectedMessage(message)}
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="font-semibold">{message.sender.name}</p>
                <p className="text-sm text-gray-500">{message.sender.email}</p>
              </div>
              <span className="text-sm text-gray-500">
                {format(new Date(message.createdAt), 'MMM d, yyyy h:mm a')}
              </span>
            </div>
            <p className="mt-2">{message.content}</p>
          </div>
        ))
      )}

      {selectedMessage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full">
            <h3 className="text-xl font-semibold mb-4">Respond to Message</h3>
            <div className="mb-4">
              <p className="font-semibold">{selectedMessage.sender.name}</p>
              <p className="text-sm text-gray-500">{selectedMessage.sender.email}</p>
              <p className="mt-2">{selectedMessage.content}</p>
            </div>
            <textarea
              className="w-full h-32 p-2 border rounded"
              placeholder="Type your response..."
              value={response}
              onChange={(e) => setResponse(e.target.value)}
            />
            <div className="mt-4 flex justify-end space-x-2">
              <button
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                onClick={() => setSelectedMessage(null)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                onClick={() => handleRespond(selectedMessage._id)}
              >
                Send Response
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 