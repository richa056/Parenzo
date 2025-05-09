"use client";

import { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { Clock, Baby, Utensils, Plus } from "lucide-react";

export default function BabyTracker() {
  const [diaperCount, setDiaperCount] = useState(4);
  const [sleepHours, setSleepHours] = useState(5.5);
  const [feedingCount, setFeedingCount] = useState(7);
  
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Today's Tracking</span>
          <Button variant="outline" size="sm" className="gap-1">
            <Plus className="h-4 w-4" /> Add Entry
          </Button>
        </CardTitle>
        <CardDescription>
          Keep track of your baby's daily activities
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="overview">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="sleep">Sleep</TabsTrigger>
            <TabsTrigger value="feeding">Feeding</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-4 mt-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium flex items-center">
                    <Baby className="h-4 w-4 mr-2" /> 
                    Diapers
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{diaperCount}</div>
                  <p className="text-xs text-muted-foreground">
                    Last change: 2 hours ago
                  </p>
                  <Progress className="mt-2" value={diaperCount * 12.5} />
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium flex items-center">
                    <Clock className="h-4 w-4 mr-2" /> 
                    Sleep
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{sleepHours}h</div>
                  <p className="text-xs text-muted-foreground">
                    Last nap: 3:30pm - 5:00pm
                  </p>
                  <Progress className="mt-2" value={(sleepHours / 12) * 100} />
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium flex items-center">
                    <Utensils className="h-4 w-4 mr-2" /> 
                    Feedings
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{feedingCount}</div>
                  <p className="text-xs text-muted-foreground">
                    Last feed: 30 minutes ago
                  </p>
                  <Progress className="mt-2" value={(feedingCount / 10) * 100} />
                </CardContent>
              </Card>
            </div>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Today's Timeline</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { time: "7:00 AM", type: "Diaper", details: "Wet" },
                    { time: "7:30 AM", type: "Feeding", details: "Breast - 15 min" },
                    { time: "9:00 AM", type: "Sleep", details: "1h 30min" },
                    { time: "11:00 AM", type: "Diaper", details: "Wet & BM" },
                    { time: "11:30 AM", type: "Feeding", details: "Bottle - 4oz" },
                  ].map((event, index) => (
                    <div key={index} className="flex items-start">
                      <div className="w-16 text-xs font-medium">{event.time}</div>
                      <div className="flex-1 ml-4 pb-4 border-l pl-4 border-l-primary/20">
                        <div className="font-medium text-sm">{event.type}</div>
                        <div className="text-xs text-muted-foreground">{event.details}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="sleep" className="space-y-4 mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Sleep Log</CardTitle>
                <CardDescription>
                  Track your baby's sleep patterns
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { start: "3:30 PM", end: "5:00 PM", duration: "1h 30min" },
                    { start: "12:00 PM", end: "1:30 PM", duration: "1h 30min" },
                    { start: "9:00 AM", end: "10:30 AM", duration: "1h 30min" },
                    { start: "1:00 AM", end: "2:00 AM", duration: "1h" },
                  ].map((sleep, index) => (
                    <div key={index} className="flex justify-between items-center border-b pb-2">
                      <div>
                        <div className="font-medium">{sleep.start} - {sleep.end}</div>
                        <div className="text-xs text-muted-foreground">Duration: {sleep.duration}</div>
                      </div>
                      <Button variant="ghost" size="sm">Edit</Button>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full gap-1">
                  <Plus className="h-4 w-4" /> Add Sleep Entry
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="feeding" className="space-y-4 mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Feeding Log</CardTitle>
                <CardDescription>
                  Track your baby's feeding schedule
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { time: "5:30 PM", type: "Bottle", amount: "4 oz", duration: "15 min" },
                    { time: "2:30 PM", type: "Breast", amount: "-", duration: "20 min" },
                    { time: "11:30 AM", type: "Bottle", amount: "4 oz", duration: "15 min" },
                    { time: "8:00 AM", type: "Breast", amount: "-", duration: "25 min" },
                    { time: "5:00 AM", type: "Breast", amount: "-", duration: "15 min" },
                  ].map((feeding, index) => (
                    <div key={index} className="flex justify-between items-center border-b pb-2">
                      <div>
                        <div className="font-medium">{feeding.time} - {feeding.type}</div>
                        <div className="text-xs text-muted-foreground">
                          {feeding.amount !== "-" ? `Amount: ${feeding.amount}` : ""} {feeding.amount !== "-" ? "•" : ""} Duration: {feeding.duration}
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">Edit</Button>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full gap-1">
                  <Plus className="h-4 w-4" /> Add Feeding Entry
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}