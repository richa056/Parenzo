"use client";

import { useState } from "react";
import DashboardLayout from "@/components/dashboard/dashboard-layout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Search, SendHorizonal, Paperclip, Image, Smile } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/components/auth-provider";

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

interface ChatContact {
  id: string;
  name: string;
  avatar: string;
  status: "online" | "offline";
  lastSeen?: string;
  unreadCount: number;
  lastMessage: string;
  time: string;
}

export default function ChatPage() {
  const { user } = useAuth();
  const [activeContact, setActiveContact] = useState<string>("1");
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  const contacts: ChatContact[] = [
    {
      id: "1",
      name: "Emily (Partner)",
      avatar: "EP",
      status: "online",
      unreadCount: 3,
      lastMessage: "Did you record the last feeding?",
      time: "5m",
    },
    {
      id: "2",
      name: "Dr. Sarah Johnson",
      avatar: "SJ",
      status: "offline",
      lastSeen: "2h ago",
      unreadCount: 0,
      lastMessage: "Schedule your next check-up",
      time: "2h",
    },
    {
      id: "3",
      name: "Tom (Dad Support Group)",
      avatar: "TG",
      status: "online",
      unreadCount: 0,
      lastMessage: "Thanks for sharing the article",
      time: "1d",
    },
    {
      id: "4",
      name: "Lactation Consultant",
      avatar: "LC",
      status: "offline",
      lastSeen: "1d ago",
      unreadCount: 0,
      lastMessage: "How's the new position working?",
      time: "3d",
    },
  ];

  const handleSendMessage = async () => {
    if (input.trim() === "") return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date().toLocaleTimeString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      console.log('Sending message to API...');
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [
            ...messages.map(msg => ({
              role: msg.role,
              content: msg.content
            })),
            {
              role: 'user',
              content: input
            }
          ],
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('API response:', data);

      if (data.error) {
        throw new Error(data.error);
      }

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.message,
        timestamp: new Date().toLocaleTimeString(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try again later.',
        timestamp: new Date().toLocaleTimeString(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const currentContact = contacts.find(contact => contact.id === activeContact);

  return (
    <DashboardLayout>
      <div className="flex h-[calc(100vh-4rem)] overflow-hidden">
        <div className="w-80 border-r flex flex-col">
          <div className="p-4 border-b">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search conversations..."
                className="pl-8"
              />
            </div>
          </div>
          
          <ScrollArea className="flex-1">
            <div className="p-2">
              {contacts.map((contact) => (
                <div
                  key={contact.id}
                  className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer ${
                    activeContact === contact.id ? "bg-muted" : "hover:bg-muted/50"
                  }`}
                  onClick={() => setActiveContact(contact.id)}
                >
                  <div className="relative">
                    <Avatar>
                      <AvatarFallback>{contact.avatar}</AvatarFallback>
                      <AvatarImage src="" />
                    </Avatar>
                    {contact.status === "online" && (
                      <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-green-500 border-2 border-background"></span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium text-sm truncate">{contact.name}</h4>
                      <span className="text-xs text-muted-foreground">
                        {contact.time}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground truncate">
                      {contact.lastMessage}
                    </p>
                  </div>
                  {contact.unreadCount > 0 && (
                    <Badge className="rounded-full h-5 w-5 p-0 flex items-center justify-center">
                      {contact.unreadCount}
                    </Badge>
                  )}
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>
        
        <div className="flex-1 flex flex-col">
          {currentContact ? (
            <>
              <div className="p-4 border-b flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarFallback>{currentContact.avatar}</AvatarFallback>
                    <AvatarImage src="" />
                  </Avatar>
                  <div>
                    <h3 className="font-medium">{currentContact.name}</h3>
                    <p className="text-xs text-muted-foreground">
                      {currentContact.status === "online" 
                        ? "Online" 
                        : `Last seen ${currentContact.lastSeen}`}
                    </p>
                  </div>
                </div>
              </div>
              
              <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${
                        message.role === 'user' ? 'justify-end' : 'justify-start'
                      }`}
                    >
                      <div
                        className={`flex items-start gap-2 max-w-[80%] ${
                          message.role === 'user' ? 'flex-row-reverse' : 'flex-row'
                        }`}
                      >
                        <Avatar>
                          <AvatarFallback>
                            {message.role === 'user' ? user?.name?.[0] : 'AI'}
                          </AvatarFallback>
                          <AvatarImage src="" />
                        </Avatar>
                        <div
                          className={`rounded-lg p-3 ${
                            message.role === 'user'
                              ? 'bg-primary text-primary-foreground'
                              : 'bg-muted'
                          }`}
                        >
                          <p className="text-sm">{message.content}</p>
                          <span className="text-xs opacity-70 mt-1 block">
                            {message.timestamp}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="h-4"></div> {/* Spacing at bottom of chat */}
              </ScrollArea>
              
              <div className="p-4 border-t">
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon">
                    <Paperclip className="h-5 w-5" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Image className="h-5 w-5" />
                  </Button>
                  <Input
                    placeholder="Type a message..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="flex-1"
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        handleSendMessage();
                      }
                    }}
                  />
                  <Button variant="ghost" size="icon">
                    <Smile className="h-5 w-5" />
                  </Button>
                  <Button
                    onClick={handleSendMessage}
                    disabled={isLoading || input.trim() === ''}
                  >
                    <SendHorizonal className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <h3 className="font-medium mb-2">Select a conversation</h3>
                <p className="text-muted-foreground text-sm">
                  Choose a contact to start messaging
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}