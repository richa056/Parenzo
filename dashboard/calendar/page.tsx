"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { format, addDays, isSameDay } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Event {
  _id: string;
  title: string;
  date: string;
  time: string;
  type: string;
  description: string;
  analysis?: string;
  location?: string;
  reminder?: string;
}

// Mock events data
const mockEvents: Event[] = [
  {
    _id: "1",
    title: "Pediatrician Appointment",
    date: format(new Date(), "yyyy-MM-dd"),
    time: "10:00",
    type: "doctor_visit",
    description: "Regular check-up for baby",
    location: "Children's Hospital",
    reminder: "1hour"
  },
  {
    _id: "2",
    title: "Parenting Class",
    date: format(addDays(new Date(), 2), "yyyy-MM-dd"),
    time: "14:00",
    type: "parenting_class",
    description: "Infant CPR and First Aid",
    location: "Community Center",
    reminder: "1day"
  },
  {
    _id: "3",
    title: "Playdate",
    date: format(addDays(new Date(), 5), "yyyy-MM-dd"),
    time: "11:00",
    type: "playdate",
    description: "Playdate with Sarah's baby",
    location: "Local Park",
    reminder: "30min"
  }
];

export default function CalendarPage() {
  const { data: session } = useSession();
  const { toast } = useToast();
  const [events, setEvents] = useState<Event[]>(mockEvents);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [newEvent, setNewEvent] = useState({
    title: "",
    date: format(new Date(), "yyyy-MM-dd"),
    time: format(new Date(), "HH:mm"),
    type: "appointment",
    description: "",
    location: "",
    reminder: "none",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Create a new event with a unique ID
      const newEventWithId = {
        ...newEvent,
        _id: Date.now().toString(),
      };

      // Add the new event to the state
      setEvents([newEventWithId, ...events]);

      // Reset the form
      setNewEvent({
        title: "",
        date: format(new Date(), "yyyy-MM-dd"),
        time: format(new Date(), "HH:mm"),
        type: "appointment",
        description: "",
        location: "",
        reminder: "none",
      });

      toast({
        title: "Success",
        description: "Event added successfully",
      });
    } catch (error) {
      console.error("Error:", error);
      toast({
        title: "Error",
        description: "Failed to add event",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getEventsForDate = (date: Date) => {
    return events.filter((event) =>
      isSameDay(new Date(event.date), date)
    );
  };

  if (!session) {
    return <div>Please sign in to view this page.</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Calendar & Event Planner</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Add New Event</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block mb-2">Title</label>
                  <Input
                    value={newEvent.title}
                    onChange={(e) =>
                      setNewEvent({ ...newEvent, title: e.target.value })
                    }
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block mb-2">Date</label>
                    <Input
                      type="date"
                      value={newEvent.date}
                      onChange={(e) =>
                        setNewEvent({ ...newEvent, date: e.target.value })
                      }
                      required
                    />
                  </div>

                  <div>
                    <label className="block mb-2">Time</label>
                    <Input
                      type="time"
                      value={newEvent.time}
                      onChange={(e) =>
                        setNewEvent({ ...newEvent, time: e.target.value })
                      }
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block mb-2">Type</label>
                  <Select
                    value={newEvent.type}
                    onValueChange={(value) =>
                      setNewEvent({ ...newEvent, type: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select event type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="appointment">Appointment</SelectItem>
                      <SelectItem value="therapy">Therapy Session</SelectItem>
                      <SelectItem value="meeting">Meeting</SelectItem>
                      <SelectItem value="playdate">Playdate</SelectItem>
                      <SelectItem value="parenting_class">Parenting Class</SelectItem>
                      <SelectItem value="doctor_visit">Doctor Visit</SelectItem>
                      <SelectItem value="vaccination">Vaccination</SelectItem>
                      <SelectItem value="milestone">Milestone</SelectItem>
                      <SelectItem value="family_event">Family Event</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block mb-2">Location</label>
                  <Input
                    value={newEvent.location || ''}
                    onChange={(e) =>
                      setNewEvent({ ...newEvent, location: e.target.value })
                    }
                    placeholder="Enter location or video call link"
                  />
                </div>

                <div>
                  <label className="block mb-2">Reminder</label>
                  <Select
                    value={newEvent.reminder || 'none'}
                    onValueChange={(value) =>
                      setNewEvent({ ...newEvent, reminder: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select reminder" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">No Reminder</SelectItem>
                      <SelectItem value="5min">5 minutes before</SelectItem>
                      <SelectItem value="15min">15 minutes before</SelectItem>
                      <SelectItem value="30min">30 minutes before</SelectItem>
                      <SelectItem value="1hour">1 hour before</SelectItem>
                      <SelectItem value="1day">1 day before</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block mb-2">Description</label>
                  <Textarea
                    value={newEvent.description}
                    onChange={(e) =>
                      setNewEvent({ ...newEvent, description: e.target.value })
                    }
                    rows={3}
                  />
                </div>

                <Button type="submit" disabled={isLoading}>
                  {isLoading ? "Saving..." : "Add Event"}
                </Button>
              </form>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Calendar</CardTitle>
            </CardHeader>
            <CardContent>
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                className="rounded-md border"
              />
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Events for {format(selectedDate, "MMMM d, yyyy")}</CardTitle>
            </CardHeader>
            <CardContent>
              {getEventsForDate(selectedDate).length > 0 ? (
                <div className="space-y-4">
                  {getEventsForDate(selectedDate).map((event) => (
                    <div
                      key={event._id}
                      className="border rounded-lg p-4 hover:bg-gray-50"
                    >
                      <h3 className="font-semibold">{event.title}</h3>
                      <p className="text-sm text-gray-500">
                        {event.time} - {event.type}
                      </p>
                      {event.location && (
                        <p className="text-sm text-gray-500">
                          Location: {event.location}
                        </p>
                      )}
                      {event.reminder && event.reminder !== "none" && (
                        <p className="text-sm text-gray-500">
                          Reminder: {event.reminder} before
                        </p>
                      )}
                      {event.description && (
                        <p className="text-sm mt-2">{event.description}</p>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">No events scheduled for this date.</p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
} 