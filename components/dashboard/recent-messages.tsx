"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { SendHorizonal, Plus } from "lucide-react";

export default function RecentMessages() {
  const [newMessage, setNewMessage] = useState("");

  const conversations = [
    {
      name: "Emily (Partner)",
      avatar: "EP",
      online: true,
      lastMessage: "Did you record the last feeding?",
      time: "5m",
      unread: 2,
    },
    {
      name: "Dr. Sarah Johnson",
      avatar: "SJ",
      online: false,
      lastMessage: "Schedule your next check-up",
      time: "2h",
      unread: 0,
    },
  ];

  return (
    <Card className="w-full h-full flex flex-col">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Recent Messages</span>
          <Button variant="ghost" size="icon">
            <Plus className="h-4 w-4" />
          </Button>
        </CardTitle>
        <CardDescription>
          Quick access to your conversations
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1">
        <div className="space-y-4">
          {conversations.map((convo, index) => (
            <div
              key={index}
              className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted cursor-pointer"
            >
              <div className="relative">
                <Avatar>
                  <AvatarFallback>{convo.avatar}</AvatarFallback>
                  <AvatarImage src="" />
                </Avatar>
                {convo.online && (
                  <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-green-500 border-2 border-background"></span>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium text-sm truncate">{convo.name}</h4>
                  <span className="text-xs text-muted-foreground">
                    {convo.time}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground truncate">
                  {convo.lastMessage}
                </p>
              </div>
              {convo.unread > 0 && (
                <Badge variant="default" className="rounded-full h-5 w-5 p-0 flex items-center justify-center">
                  {convo.unread}
                </Badge>
              )}
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter className="border-t pt-4">
        <div className="flex items-center gap-2 w-full">
          <Input
            placeholder="Type a message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="flex-1"
          />
          <Button size="icon" variant="secondary">
            <SendHorizonal className="h-4 w-4" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}