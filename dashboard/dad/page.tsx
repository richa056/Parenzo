"use client";

import React, { useState } from 'react';
import { useSession } from 'next-auth/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Icons from '@/components/icons';

interface PartnerSupportTask {
  id: string;
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  completed: boolean;
  aiSuggestions?: string;
  aiSource?: string;
  aiModel?: string;
}


interface EmotionalCheckIn {
  id: string;
  date: string;
  mood: 'great' | 'good' | 'okay' | 'challenging' | 'difficult';
  notes: string;
  aiInsights?: string;
}

interface SupportResource {
  id: string;
  title: string;
  type: 'article' | 'video' | 'podcast';
  url: string;
  description: string;
}

const mockSupportTasks: PartnerSupportTask[] = [
  {
    id: '1',
    title: 'Morning Routine Support',
    description: 'Help with breakfast and getting ready for the day',
    priority: 'high',
    completed: false,
    aiSuggestions: 'Consider preparing breakfast the night before to make mornings smoother.'
  },
  {
    id: '2',
    title: 'Emotional Check-in',
    description: 'Have a meaningful conversation about feelings and needs',
    priority: 'high',
    completed: false,
    aiSuggestions: 'Choose a quiet moment and use open-ended questions to encourage sharing.'
  },
  {
    id: '3',
    title: 'Household Chores',
    description: 'Take care of laundry and cleaning',
    priority: 'medium',
    completed: true,
    aiSuggestions: 'Create a shared chore schedule to distribute responsibilities fairly.'
  }
];

const mockEmotionalCheckIns: EmotionalCheckIn[] = [
  {
    id: '1',
    date: '2024-03-15',
    mood: 'good',
    notes: 'Had a good day supporting my partner. We managed to get some rest.',
    aiInsights: 'Your consistent support is making a positive impact. Consider scheduling regular breaks for yourself too.'
  },
  {
    id: '2',
    date: '2024-03-14',
    mood: 'challenging',
    notes: 'Partner was feeling overwhelmed. Tried to help but felt unsure about what to do.',
    aiInsights: "It's normal to feel uncertain. Focus on active listening and offering practical help."
  }
];

const mockResources: SupportResource[] = [
  {
    id: '1',
    title: 'Understanding Postpartum Depression',
    type: 'article',
    url: '#',
    description: 'Learn about signs, symptoms, and how to support your partner'
  },
  {
    id: '2',
    title: 'Fatherhood Support Podcast',
    type: 'podcast',
    url: '#',
    description: 'Weekly discussions about fatherhood challenges and solutions'
  },
  {
    id: '3',
    title: 'Partner Support Techniques',
    type: 'video',
    url: '#',
    description: 'Practical ways to support your partner during the postpartum period'
  }
];

const mockAiAdvice = "Here's a mock analysis: You're doing a great job supporting your partner! Remember to take breaks, communicate openly, and seek support when needed.";
const mockAiSuggestions = "Mock suggestion: Try scheduling a regular check-in with your partner to discuss needs and feelings.";
const mockSupportScore = 85;

export default function DadDashboardPage() {
  const { data: session } = useSession();
  const [supportTasks, setSupportTasks] = useState<PartnerSupportTask[]>(mockSupportTasks);
  const [emotionalCheckIns, setEmotionalCheckIns] = useState<EmotionalCheckIn[]>(mockEmotionalCheckIns);
  const [newTask, setNewTask] = useState<Partial<PartnerSupportTask>>({});
  const [newCheckIn, setNewCheckIn] = useState<Partial<EmotionalCheckIn>>({});
  const [aiResponse, setAiResponse] = useState<{
    content: string;
    source?: string;
    model?: string;
  }>({ content: "" });
  const [isLoading, setIsLoading] = useState(false);

  const handleAddTask = async () => {
    if (newTask.title && newTask.description) {
      const task: PartnerSupportTask = {
        id: Date.now().toString(),
        title: newTask.title,
        description: newTask.description,
        priority: newTask.priority as 'high' | 'medium' | 'low',
        completed: false
      };

      // Set mock AI suggestions
      task.aiSuggestions = mockAiSuggestions;
      task.aiSource = "mock";
      task.aiModel = "mock";

      setSupportTasks(prev => [...prev, task]);
      setNewTask({});
    }
  };

  const handleAddCheckIn = async () => {
    if (newCheckIn.mood && newCheckIn.notes) {
      const checkIn: EmotionalCheckIn = {
        id: Date.now().toString(),
        date: new Date().toISOString(),
        mood: newCheckIn.mood as 'great' | 'good' | 'okay' | 'challenging' | 'difficult',
        notes: newCheckIn.notes
      };

      // Set mock AI insights
      checkIn.aiInsights = "Mock insight: You're attentive to your partner's emotions. Keep up the great work!";

      setEmotionalCheckIns(prev => [...prev, checkIn]);
      setNewCheckIn({});
    }
  };

  const toggleTaskCompletion = (id: string) => {
    setSupportTasks(prev =>
      prev.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const getAiAdvice = async () => {
    setIsLoading(true);
    setTimeout(() => {
      setAiResponse({
        content: mockAiAdvice,
        source: "mock",
        model: "mock"
      });
      setIsLoading(false);
    }, 1000);
  };

  if (!session) {
    return <div>Please sign in to view this page.</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Dad's Support Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Partner Support Tasks */}
        <Card>
          <CardHeader>
            <CardTitle>Partner Support Tasks</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {supportTasks.map(task => (
                <div key={task.id} className="border p-4 rounded-lg">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-semibold">{task.title}</p>
                      <p className="text-sm">{task.description}</p>
                      <p className={`text-sm mt-2 ${
                        task.priority === 'high' ? 'text-red-500' :
                        task.priority === 'medium' ? 'text-yellow-500' :
                        'text-green-500'
                      }`}>
                        Priority: {task.priority}
                      </p>
                    </div>
                    <Button
                      variant={task.completed ? "default" : "outline"}
                      onClick={() => toggleTaskCompletion(task.id)}
                    >
                      {task.completed ? "Completed" : "Mark Complete"}
                    </Button>
                  </div>
                  {task.aiSuggestions && (
                    <div className="mt-2 p-2 bg-blue-50 rounded">
                      <p className="text-sm text-blue-700">{task.aiSuggestions}</p>
                    </div>
                  )}
                </div>
              ))}
              <div className="space-y-2">
                <Input
                  placeholder="Task Title"
                  value={newTask.title || ''}
                  onChange={(e) => setNewTask(prev => ({ ...prev, title: e.target.value }))}
                />
                <Input
                  placeholder="Description"
                  value={newTask.description || ''}
                  onChange={(e) => setNewTask(prev => ({ ...prev, description: e.target.value }))}
                />
                <Select onValueChange={(value) => setNewTask(prev => ({ ...prev, priority: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                  </SelectContent>
                </Select>
                <Button onClick={handleAddTask}>Add Task</Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Emotional Check-ins */}
        <Card>
          <CardHeader>
            <CardTitle>Emotional Check-ins</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {emotionalCheckIns.map(checkIn => (
                <div key={checkIn.id} className="border p-4 rounded-lg">
                  <p className="font-semibold">{new Date(checkIn.date).toLocaleDateString()}</p>
                  <p>Mood: {checkIn.mood}</p>
                  <p className="text-sm mt-2">{checkIn.notes}</p>
                  {checkIn.aiInsights && (
                    <div className="mt-2 p-2 bg-blue-50 rounded">
                      <p className="text-sm text-blue-700">{checkIn.aiInsights}</p>
                    </div>
                  )}
                </div>
              ))}
              <div className="space-y-2">
                <Select onValueChange={(value) => setNewCheckIn(prev => ({ ...prev, mood: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="How are you feeling?" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="great">Great</SelectItem>
                    <SelectItem value="good">Good</SelectItem>
                    <SelectItem value="okay">Okay</SelectItem>
                    <SelectItem value="challenging">Challenging</SelectItem>
                    <SelectItem value="difficult">Difficult</SelectItem>
                  </SelectContent>
                </Select>
                <Input
                  placeholder="Notes"
                  value={newCheckIn.notes || ''}
                  onChange={(e) => setNewCheckIn(prev => ({ ...prev, notes: e.target.value }))}
                />
                <Button onClick={handleAddCheckIn}>Add Check-in</Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Support Resources */}
        <Card>
          <CardHeader>
            <CardTitle>Support Resources</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockResources.map(resource => (
                <div key={resource.id} className="border p-4 rounded-lg">
                  <p className="font-semibold">{resource.title}</p>
                  <p className="text-sm text-gray-500">{resource.type}</p>
                  <p className="text-sm mt-2">{resource.description}</p>
                  <Button variant="link" className="p-0 mt-2">
                    <a href={resource.url} target="_blank" rel="noopener noreferrer">
                      View Resource
                    </a>
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* AI Advice */}
        <Card>
          <CardHeader>
            <CardTitle>AI Support Assistant</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {isLoading ? (
                <div className="flex items-center justify-center h-[200px]">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
                </div>
              ) : aiResponse ? (
                <div className="prose max-w-none">
                  <p>{aiResponse.content}</p>
                  {aiResponse.source && aiResponse.source !== 'error' && (
                    <p className="text-xs text-gray-500 mt-2">
                      Powered by {aiResponse.source} ({aiResponse.model})
                    </p>
                  )}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-[200px]">
                  <p className="text-gray-600 mb-4">Get personalized advice for supporting your partner</p>
                  <Button onClick={getAiAdvice}>
                    <Icons.brain className="mr-2 h-4 w-4" />
                    Get Advice
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 