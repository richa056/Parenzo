import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Users, BookOpen, Video } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function UpcomingEvents() {
  const events = [
    {
      title: "Mommy & Me Yoga",
      date: "Tomorrow, 10:00 AM",
      type: "in-person",
      icon: <Users className="h-4 w-4" />,
      attendees: 12,
    },
    {
      title: "Baby Sleep Workshop",
      date: "Thursday, 2:00 PM",
      type: "online",
      icon: <Video className="h-4 w-4" />,
      attendees: 24,
    },
    {
      title: "Pediatric First Aid",
      date: "Saturday, 11:00 AM",
      type: "in-person",
      icon: <BookOpen className="h-4 w-4" />,
      attendees: 8,
    },
    {
      title: "Therapy Session",
      date: "Monday, 3:00 PM",
      type: "online",
      icon: <Video className="h-4 w-4" />,
      attendees: 1,
    },
  ];

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Upcoming Events</span>
          <Button variant="outline" size="sm">View Calendar</Button>
        </CardTitle>
        <CardDescription>
          Your scheduled classes, appointments and meetups
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-5">
          {events.map((event, index) => (
            <div
              key={index}
              className="flex items-start space-x-4 pb-4 border-b last:border-0 last:pb-0"
            >
              <div className="bg-muted h-10 w-10 rounded-full flex items-center justify-center flex-shrink-0">
                <Calendar className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold">{event.title}</h4>
                  <Badge variant={event.type === "online" ? "outline" : "secondary"} className="text-xs">
                    {event.type === "online" ? "Online" : "In Person"}
                  </Badge>
                </div>
                <div className="text-sm text-muted-foreground">{event.date}</div>
                <div className="flex items-center text-xs text-muted-foreground">
                  {event.icon}
                  <span className="ml-1">
                    {event.attendees} {event.attendees === 1 ? "attendee" : "attendees"}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}