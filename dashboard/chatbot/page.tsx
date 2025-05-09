"use client";

import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Icons } from "../../../components/icons";

interface Message {
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  source?: string;
  model?: string;
}

const mockResponses = {
  "baby feeding": "Based on your baby's age, here are some feeding recommendations:\n\n1. Breastfeeding: Every 2-3 hours\n2. Formula: 2-3 ounces per feeding\n3. Solid foods: Start with single-grain cereals\n\nWould you like more specific advice?",
  "sleep schedule": "Here's a suggested sleep schedule for your baby:\n\n1. Newborn: 14-17 hours total\n2. 3-6 months: 12-15 hours total\n3. 6-12 months: 11-14 hours total\n\nWould you like tips for establishing a bedtime routine?",
  "development milestones": "Your baby should be reaching these milestones:\n\n1. 2 months: Smiling, cooing\n2. 4 months: Rolling over, grasping objects\n3. 6 months: Sitting up, babbling\n\nWould you like to track specific milestones?",
  "postpartum care": "Here are some important postpartum care tips:\n\n1. Rest and recovery\n2. Nutrition and hydration\n3. Emotional support\n4. Physical activity\n\nWould you like more details about any of these?",
  "parenting tips": "Here are some general parenting tips:\n\n1. Create a routine\n2. Practice self-care\n3. Connect with other parents\n4. Trust your instincts\n\nWould you like specific advice for your situation?",
};

export default function ChatbotPage() {
  const { data: session } = useSession();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      role: "user",
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      // Convert messages to the format expected by the API
      const messageHistory = messages.map(msg => ({
        role: msg.role,
        content: msg.content
      }));

      const response = await fetch("/api/ai/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: input,
          history: messageHistory // Include conversation history
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      if (data.error) {
        throw new Error(data.error);
      }

      const assistantMessage: Message = {
        role: "assistant",
        content: data.content,
        timestamp: new Date(),
        source: data.source,
        model: data.model
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Error getting AI response:", error);
      const errorMessage: Message = {
        role: "assistant",
        content: "I'm having trouble connecting right now. Please try again later.",
        timestamp: new Date(),
        source: "error",
        model: "error"
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!session) {
    return <div>Please sign in to use the chatbot.</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Parenting Assistant</h1>
        <Button variant="outline" onClick={() => setMessages([])}>
          <Icons.spinner className="mr-2 h-4 w-4" />
          Clear Chat
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Chat with AI Assistant</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="h-[400px] overflow-y-auto space-y-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${
                    message.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg p-4 ${
                      message.role === "user"
                        ? "bg-blue-500 text-white"
                        : "bg-gray-100"
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                    <div className="flex items-center justify-between mt-2">
                      <p className="text-xs opacity-70">
                        {message.timestamp.toLocaleTimeString()}
                      </p>
                      {message.source && message.source !== 'error' && (
                        <p className="text-xs opacity-70">
                          {message.source} ({message.model})
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 rounded-lg p-4">
                    <Icons.spinner className="h-5 w-5 animate-spin text-gray-500" />
                  </div>
                </div>
              )}
            </div>

            <div className="flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask me anything about parenting..."
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSend();
                  }
                }}
              />
              <Button onClick={handleSend} disabled={isLoading || !input.trim()}>
                <Icons.send className="mr-2 h-4 w-4" />
                Send
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 