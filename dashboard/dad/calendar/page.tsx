"use client";

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { Calendar as CalendarIcon, Plus, Bell, MapPin, Users, Trophy, Briefcase } from 'lucide-react';
import { format } from 'date-fns';

interface Event {
  id: string;
  title: string;
  start: Date;
  end: Date;
  type: 'work' | 'family' | 'sports' | 'appointment' | 'dad-time';
  location?: string;
  participants?: string[];
  reminder?: {
    type: 'email' | 'notification' | 'both';
    time: number; // minutes before
  };
  notes?: string;
  priority?: 'high' | 'medium' | 'low';
}

const mockEvents: Event[] = [
  {
    id: '1',
    title: 'Work Meeting',
    start: new Date(2024, 2, 15, 9, 0),
    end: new Date(2024, 2, 15, 10, 30),
    type: 'work',
    location: 'Office, Conference Room A',
    priority: 'high',
    reminder: {
      type: 'both',
      time: 15
    }
  },
  {
    id: '2',
    title: 'Soccer Practice with Kids',
    start: new Date(2024, 2, 16, 16, 0),
    end: new Date(2024, 2, 16, 17, 30),
    type: 'sports',
    location: 'Community Center Field',
    participants: ['Dad', 'Kids'],
    priority: 'medium',
    reminder: {
      type: 'notification',
      time: 30
    }
  },
  {
    id: '3',
    title: 'Dad\'s Night Out',
    start: new Date(2024, 2, 17, 19, 0),
    end: new Date(2024, 2, 17, 22, 0),
    type: 'dad-time',
    location: 'Local Sports Bar',
    participants: ['Dad Friends'],
    priority: 'low',
    notes: 'Bring sports jersey'
  }
];

export default function DadCalendarPage() {
  const { data: session } = useSession();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [events, setEvents] = useState<Event[]>(mockEvents);
  const [showEventForm, setShowEventForm] = useState(false);
  const [newEvent, setNewEvent] = useState<Partial<Event>>({
    type: 'work',
    priority: 'medium',
    reminder: { type: 'notification', time: 15 }
  });

  const handleAddEvent = () => {
    if (newEvent.title && newEvent.start && newEvent.end) {
      const event: Event = {
        id: Date.now().toString(),
        title: newEvent.title,
        start: newEvent.start,
        end: newEvent.end,
        type: newEvent.type as Event['type'],
        location: newEvent.location,
        participants: newEvent.participants,
        reminder: newEvent.reminder,
        notes: newEvent.notes,
        priority: newEvent.priority
      };
      setEvents([...events, event]);
      setShowEventForm(false);
      setNewEvent({});
    }
  };

  const getPriorityColor = (priority: Event['priority']) => {
    switch (priority) {
      case 'high': return 'text-red-500';
      case 'medium': return 'text-yellow-500';
      case 'low': return 'text-green-500';
      default: return 'text-gray-500';
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Dad's Calendar</h1>
        <button
          onClick={() => setShowEventForm(true)}
          className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
        >
          <Plus className="h-5 w-5" />
          Add Event
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">
                {format(selectedDate, 'MMMM yyyy')}
              </h2>
              <div className="flex gap-2">
                <button className="p-2 hover:bg-gray-100 rounded">
                  Previous
                </button>
                <button className="p-2 hover:bg-gray-100 rounded">
                  Next
                </button>
              </div>
            </div>
            {/* Calendar grid would go here */}
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Today's Schedule</h2>
            {events
              .filter(event => format(event.start, 'yyyy-MM-dd') === format(selectedDate, 'yyyy-MM-dd'))
              .map(event => (
                <div key={event.id} className="border-b pb-4 mb-4 last:border-b-0">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium">{event.title}</h3>
                        {event.priority && (
                          <span className={`text-sm ${getPriorityColor(event.priority)}`}>
                            {event.priority}
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-500">
                        {format(event.start, 'h:mm a')} - {format(event.end, 'h:mm a')}
                      </p>
                      {event.location && (
                        <div className="flex items-center gap-1 text-sm text-gray-600 mt-1">
                          <MapPin className="h-4 w-4" />
                          {event.location}
                        </div>
                      )}
                      {event.participants && (
                        <div className="flex items-center gap-1 text-sm text-gray-600 mt-1">
                          <Users className="h-4 w-4" />
                          {event.participants.join(', ')}
                        </div>
                      )}
                    </div>
                    {event.reminder && (
                      <Bell className="h-5 w-5 text-yellow-500" />
                    )}
                  </div>
                </div>
              ))}
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Upcoming Events</h2>
            {events
              .filter(event => event.start > selectedDate)
              .sort((a, b) => a.start.getTime() - b.start.getTime())
              .slice(0, 3)
              .map(event => (
                <div key={event.id} className="border-b pb-4 mb-4 last:border-b-0">
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium">{event.title}</h3>
                    {event.type === 'sports' && <Trophy className="h-4 w-4 text-yellow-500" />}
                    {event.type === 'work' && <Briefcase className="h-4 w-4 text-blue-500" />}
                  </div>
                  <p className="text-sm text-gray-500">
                    {format(event.start, 'MMM d, h:mm a')}
                  </p>
                </div>
              ))}
          </div>
        </div>
      </div>

      {showEventForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">Add New Event</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Title</label>
                <input
                  type="text"
                  value={newEvent.title || ''}
                  onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Type</label>
                <select
                  value={newEvent.type}
                  onChange={(e) => setNewEvent({ ...newEvent, type: e.target.value as Event['type'] })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="work">Work</option>
                  <option value="family">Family</option>
                  <option value="sports">Sports</option>
                  <option value="appointment">Appointment</option>
                  <option value="dad-time">Dad Time</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Priority</label>
                <select
                  value={newEvent.priority}
                  onChange={(e) => setNewEvent({ ...newEvent, priority: e.target.value as Event['priority'] })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Location</label>
                <input
                  type="text"
                  value={newEvent.location || ''}
                  onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setShowEventForm(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddEvent}
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Add Event
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 