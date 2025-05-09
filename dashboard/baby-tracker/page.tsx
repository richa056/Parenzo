"use client";

import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Icons } from "@/components/icons";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { format } from 'date-fns';

interface BabyData {
  id: string;
  name: string;
  birthDate: string;
  weight: number;
  height: number;
  milestones: Milestone[];
  feedings: Feeding[];
  sleep: Sleep[];
  diapers: Diaper[];
}

interface Milestone {
  id: string;
  type: string;
  date: string;
  description: string;
  aiInsights?: string;
}

interface Feeding {
  id: string;
  type: 'breast' | 'formula' | 'solid';
  time: string;
  amount: string;
  duration?: string;
  notes?: string;
}

interface Sleep {
  id: string;
  startTime: string;
  endTime: string;
  duration: string;
  quality: 'good' | 'fair' | 'poor';
  notes?: string;
}

interface Diaper {
  id: string;
  time: string;
  type: 'wet' | 'dirty' | 'both';
  notes?: string;
}

const mockBabyData: BabyData = {
  id: '1',
  name: 'Emma',
  birthDate: '2024-01-15',
  weight: 3.2,
  height: 50,
  milestones: [
    {
      id: '1',
      type: 'motor',
      date: '2024-02-15',
      description: 'First smile',
      aiInsights: 'This is a great early social milestone! Emma is developing good social awareness.'
    },
    {
      id: '2',
      type: 'cognitive',
      date: '2024-03-01',
      description: 'Recognizes parents',
      aiInsights: 'Emma is showing strong attachment development, which is important for emotional security.'
    }
  ],
  feedings: [
    {
      id: '1',
      type: 'breast',
      time: '2024-03-15T08:00:00',
      amount: '120ml',
      duration: '15 minutes',
      notes: 'Good latch'
    }
  ],
  sleep: [
    {
      id: '1',
      startTime: '2024-03-15T20:00:00',
      endTime: '2024-03-16T06:00:00',
      duration: '10 hours',
      quality: 'good',
      notes: 'Slept through the night'
    }
  ],
  diapers: [
    {
      id: '1',
      time: '2024-03-15T08:30:00',
      type: 'wet',
      notes: 'Normal amount'
    }
  ]
};

export default function BabyTrackerPage() {
  const { data: session } = useSession();
  const [babyData, setBabyData] = useState<BabyData>(mockBabyData);
  const [newMilestone, setNewMilestone] = useState<Partial<Milestone>>({});
  const [newFeeding, setNewFeeding] = useState<Partial<Feeding>>({});
  const [newSleep, setNewSleep] = useState<Partial<Sleep>>({});
  const [newDiaper, setNewDiaper] = useState<Partial<Diaper>>({});
  const [growthData, setGrowthData] = useState<GrowthData[]>([]);
  const [aiAnalysis, setAiAnalysis] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  const handleAddMilestone = async () => {
    if (newMilestone.type && newMilestone.description) {
      const milestone: Milestone = {
        id: Date.now().toString(),
        type: newMilestone.type,
        date: new Date().toISOString(),
        description: newMilestone.description,
      };

      // Get AI insights for the milestone
      try {
        const response = await fetch('/api/ai/chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            message: `Provide insights about this baby milestone: ${milestone.description}`,
            context: 'complex'
          }),
        });

        const data = await response.json();
        milestone.aiInsights = data.response;
      } catch (error) {
        console.error('Error getting AI insights:', error);
      }

      setBabyData(prev => ({
        ...prev,
        milestones: [...prev.milestones, milestone]
      }));
      setNewMilestone({});
    }
  };

  const handleAddFeeding = () => {
    if (newFeeding.type && newFeeding.amount) {
      const feeding: Feeding = {
        id: Date.now().toString(),
        type: newFeeding.type as 'breast' | 'formula' | 'solid',
        time: new Date().toISOString(),
        amount: newFeeding.amount,
        duration: newFeeding.duration,
        notes: newFeeding.notes
      };

      setBabyData(prev => ({
        ...prev,
        feedings: [...prev.feedings, feeding]
      }));
      setNewFeeding({});
    }
  };

  const handleAddSleep = () => {
    if (newSleep.startTime && newSleep.endTime) {
      const sleep: Sleep = {
        id: Date.now().toString(),
        startTime: newSleep.startTime,
        endTime: newSleep.endTime,
        duration: newSleep.duration || '',
        quality: newSleep.quality as 'good' | 'fair' | 'poor',
        notes: newSleep.notes
      };

      setBabyData(prev => ({
        ...prev,
        sleep: [...prev.sleep, sleep]
      }));
      setNewSleep({});
    }
  };

  const handleAddDiaper = () => {
    if (newDiaper.type) {
      const diaper: Diaper = {
        id: Date.now().toString(),
        time: new Date().toISOString(),
        type: newDiaper.type as 'wet' | 'dirty' | 'both',
        notes: newDiaper.notes
      };

      setBabyData(prev => ({
        ...prev,
        diapers: [...prev.diapers, diaper]
      }));
      setNewDiaper({});
    }
  };

  const analyzeGrowth = async () => {
    setIsLoading(true);
    try {
      // Simulate AI analysis
      const response = await fetch("/api/ai/analyze-growth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ growthData }),
      });

      const data = await response.json();
      setAiAnalysis(data.analysis);
    } catch (error) {
      console.error("Error analyzing growth:", error);
      setAiAnalysis("Error analyzing growth data. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const addGrowthData = () => {
    const newData: GrowthData = {
      date: format(new Date(), "yyyy-MM-dd"),
      weight: 7.0,
      height: 67,
      headCircumference: 42,
    };
    setGrowthData([...growthData, newData]);
  };

  if (!session) {
    return <div>Please sign in to view this page.</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Baby Tracker</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Baby Info */}
        <Card>
          <CardHeader>
            <CardTitle>Baby Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <Label>Name</Label>
                <p className="font-semibold">{babyData.name}</p>
              </div>
              <div>
                <Label>Birth Date</Label>
                <p className="font-semibold">{new Date(babyData.birthDate).toLocaleDateString()}</p>
              </div>
              <div>
                <Label>Weight</Label>
                <p className="font-semibold">{babyData.weight} kg</p>
              </div>
              <div>
                <Label>Height</Label>
                <p className="font-semibold">{babyData.height} cm</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Milestones */}
        <Card>
          <CardHeader>
            <CardTitle>Milestones</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {babyData.milestones.map(milestone => (
                <div key={milestone.id} className="border p-4 rounded-lg">
                  <p className="font-semibold">{milestone.type}</p>
                  <p>{milestone.description}</p>
                  <p className="text-sm text-gray-500">{new Date(milestone.date).toLocaleDateString()}</p>
                  {milestone.aiInsights && (
                    <div className="mt-2 p-2 bg-blue-50 rounded">
                      <p className="text-sm text-blue-700">{milestone.aiInsights}</p>
                    </div>
                  )}
                </div>
              ))}
              <div className="space-y-2">
                <Select onValueChange={(value) => setNewMilestone(prev => ({ ...prev, type: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select milestone type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="motor">Motor</SelectItem>
                    <SelectItem value="cognitive">Cognitive</SelectItem>
                    <SelectItem value="social">Social</SelectItem>
                    <SelectItem value="language">Language</SelectItem>
                  </SelectContent>
                </Select>
                <Input
                  placeholder="Description"
                  value={newMilestone.description || ''}
                  onChange={(e) => setNewMilestone(prev => ({ ...prev, description: e.target.value }))}
                />
                <Button onClick={handleAddMilestone}>Add Milestone</Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Feedings */}
        <Card>
          <CardHeader>
            <CardTitle>Feedings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {babyData.feedings.map(feeding => (
                <div key={feeding.id} className="border p-4 rounded-lg">
                  <p className="font-semibold">{feeding.type}</p>
                  <p>Amount: {feeding.amount}</p>
                  <p>Duration: {feeding.duration}</p>
                  <p className="text-sm text-gray-500">{new Date(feeding.time).toLocaleTimeString()}</p>
                  {feeding.notes && <p className="text-sm">{feeding.notes}</p>}
                </div>
              ))}
              <div className="space-y-2">
                <Select onValueChange={(value) => setNewFeeding(prev => ({ ...prev, type: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select feeding type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="breast">Breast</SelectItem>
                    <SelectItem value="formula">Formula</SelectItem>
                    <SelectItem value="solid">Solid</SelectItem>
                  </SelectContent>
                </Select>
                <Input
                  placeholder="Amount"
                  value={newFeeding.amount || ''}
                  onChange={(e) => setNewFeeding(prev => ({ ...prev, amount: e.target.value }))}
                />
                <Input
                  placeholder="Duration (minutes)"
                  value={newFeeding.duration || ''}
                  onChange={(e) => setNewFeeding(prev => ({ ...prev, duration: e.target.value }))}
                />
                <Input
                  placeholder="Notes"
                  value={newFeeding.notes || ''}
                  onChange={(e) => setNewFeeding(prev => ({ ...prev, notes: e.target.value }))}
                />
                <Button onClick={handleAddFeeding}>Add Feeding</Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Sleep */}
        <Card>
          <CardHeader>
            <CardTitle>Sleep</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {babyData.sleep.map(sleep => (
                <div key={sleep.id} className="border p-4 rounded-lg">
                  <p>Duration: {sleep.duration}</p>
                  <p>Quality: {sleep.quality}</p>
                  <p className="text-sm text-gray-500">
                    {new Date(sleep.startTime).toLocaleTimeString()} - {new Date(sleep.endTime).toLocaleTimeString()}
                  </p>
                  {sleep.notes && <p className="text-sm">{sleep.notes}</p>}
                </div>
              ))}
              <div className="space-y-2">
                <Input
                  type="datetime-local"
                  onChange={(e) => setNewSleep(prev => ({ ...prev, startTime: e.target.value }))}
                />
                <Input
                  type="datetime-local"
                  onChange={(e) => setNewSleep(prev => ({ ...prev, endTime: e.target.value }))}
                />
                <Select onValueChange={(value) => setNewSleep(prev => ({ ...prev, quality: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select sleep quality" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="good">Good</SelectItem>
                    <SelectItem value="fair">Fair</SelectItem>
                    <SelectItem value="poor">Poor</SelectItem>
                  </SelectContent>
                </Select>
                <Input
                  placeholder="Notes"
                  value={newSleep.notes || ''}
                  onChange={(e) => setNewSleep(prev => ({ ...prev, notes: e.target.value }))}
                />
                <Button onClick={handleAddSleep}>Add Sleep</Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Diapers */}
        <Card>
          <CardHeader>
            <CardTitle>Diapers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {babyData.diapers.map(diaper => (
                <div key={diaper.id} className="border p-4 rounded-lg">
                  <p className="font-semibold">{diaper.type}</p>
                  <p className="text-sm text-gray-500">{new Date(diaper.time).toLocaleTimeString()}</p>
                  {diaper.notes && <p className="text-sm">{diaper.notes}</p>}
                </div>
              ))}
              <div className="space-y-2">
                <Select onValueChange={(value) => setNewDiaper(prev => ({ ...prev, type: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select diaper type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="wet">Wet</SelectItem>
                    <SelectItem value="dirty">Dirty</SelectItem>
                    <SelectItem value="both">Both</SelectItem>
                  </SelectContent>
                </Select>
                <Input
                  placeholder="Notes"
                  value={newDiaper.notes || ''}
                  onChange={(e) => setNewDiaper(prev => ({ ...prev, notes: e.target.value }))}
                />
                <Button onClick={handleAddDiaper}>Add Diaper</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Growth Chart</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <LineChart width={500} height={300} data={growthData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="weight" stroke="#8884d8" name="Weight (kg)" />
                <Line type="monotone" dataKey="height" stroke="#82ca9d" name="Height (cm)" />
                <Line type="monotone" dataKey="headCircumference" stroke="#ffc658" name="Head Circumference (cm)" />
              </LineChart>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>AI Growth Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex items-center justify-center h-[300px]">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
              </div>
            ) : aiAnalysis ? (
              <div className="prose max-w-none">
                <p>{aiAnalysis}</p>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-[300px]">
                <p className="text-gray-600 mb-4">Get AI-powered analysis of your baby's growth</p>
                <Button onClick={analyzeGrowth}>
                  <Icons.brain className="mr-2 h-4 w-4" />
                  Analyze Growth
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 