'use client';

import * as React from 'react';
import { useState, useEffect } from "react";
import { useAuth } from '@/components/auth-provider';
import DashboardLayout from "@/components/dashboard/dashboard-layout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MessageCircle, Heart, Eye, Search, Plus, Loader2 } from "lucide-react";
import Link from "next/link";

interface Post {
  _id: string;
  title: string;
  content: string;
  category: string;
  author: string;
  createdAt: string;
  likes: number;
  comments: number;
  views: number;
  role: 'mom' | 'dad';
  timeAgo: string;
  analysis?: string;
}

interface Category {
  name: string;
  count: number;
}

const mockPosts: Post[] = [
  {
    _id: "1",
    title: "Sleep Training Tips for 6-Month Old",
    content: "Looking for advice on gentle sleep training methods. Our baby is 6 months old and still waking up multiple times at night. Any success stories or tips would be greatly appreciated!",
    category: "Sleep",
    author: "Sarah M.",
    createdAt: new Date(Date.now() - 3600000).toISOString(),
    likes: 12,
    comments: 8,
    views: 45,
    role: "mom",
    timeAgo: "1 hour ago"
  },
  {
    _id: "2",
    title: "First-Time Dad Support Group",
    content: "Hey fellow dads! Just wanted to create a space where we can share our experiences and support each other. Being a new dad is amazing but also challenging. Let's connect!",
    category: "Community",
    author: "Mike R.",
    createdAt: new Date(Date.now() - 7200000).toISOString(),
    likes: 25,
    comments: 15,
    views: 78,
    role: "dad",
    timeAgo: "2 hours ago"
  },
  {
    _id: "3",
    title: "Postpartum Depression - You're Not Alone",
    content: "I've been struggling with postpartum depression and wanted to share my story. It's been a tough journey but I'm getting better with therapy and support. If anyone needs to talk, I'm here.",
    category: "Mental Health",
    author: "Emily T.",
    createdAt: new Date(Date.now() - 10800000).toISOString(),
    likes: 45,
    comments: 23,
    views: 120,
    role: "mom",
    timeAgo: "3 hours ago"
  },
  {
    _id: "4",
    title: "Best Baby Food Recipes",
    content: "Share your favorite homemade baby food recipes! Looking for nutritious and easy-to-make options for my 8-month-old who's just starting solids.",
    category: "Feeding",
    author: "Lisa K.",
    createdAt: new Date(Date.now() - 14400000).toISOString(),
    likes: 18,
    comments: 12,
    views: 65,
    role: "mom",
    timeAgo: "4 hours ago"
  }
];

export default function CommunityPage() {
  const { user } = useAuth();
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [analyzingPost, setAnalyzingPost] = useState<string | null>(null);

  const categories: Category[] = [
    { name: "All Topics", count: 124 },
    { name: "Sleep", count: 28 },
    { name: "Feeding", count: 36 },
    { name: "Mental Health", count: 42 },
    { name: "Development", count: 19 },
    { name: "Dad Tips", count: 24 },
  ];

  const categoryColors: Record<string, string> = {
    "Sleep": "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
    "Mental Health": "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
    "Feeding": "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
    "Community": "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
    "Development": "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-300",
    "Dad Tips": "bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300",
  };

  const fetchPosts = async () => {
    try {
      const response = await fetch("/api/community/posts");
      if (!response.ok) throw new Error("Failed to fetch posts");
      const data = await response.json();
      setPosts(data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const analyzePost = async (postId: string) => {
    setAnalyzingPost(postId);
    try {
      const post = posts.find(p => p._id === postId);
      if (!post) return;

      const response = await fetch('/api/analyze-forum-post', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: post.title,
          content: post.content,
          category: post.category
        }),
      });

      if (!response.ok) throw new Error('Failed to analyze post');

      const { analysis } = await response.json();
      setPosts(posts.map(p => 
        p._id === postId ? { ...p, analysis } : p
      ));
    } catch (error) {
      console.error('Error analyzing post:', error);
    } finally {
      setAnalyzingPost(null);
    }
  };

  useEffect(() => {
    // Simulate API call with mock data
    const timer = setTimeout(() => {
      setPosts(mockPosts);
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="p-6">
          <div className="flex items-center justify-center h-[60vh]">
            <div className="flex flex-col items-center gap-4">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <p className="text-muted-foreground">Loading community posts...</p>
            </div>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Community Forum</h1>
            <p className="text-muted-foreground">
              Connect with other parents and share your experiences
            </p>
          </div>
          <div className="flex gap-4">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search discussions..."
                className="w-full md:w-[300px] pl-8"
              />
            </div>
            <Link href="/dashboard/community/new">
              <Button className="gap-1">
                <Plus className="h-4 w-4" /> New Post
              </Button>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="md:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Categories</CardTitle>
                <CardDescription>
                  Browse by topic
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {categories.map((category, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between rounded-md px-3 py-2 text-sm hover:bg-muted cursor-pointer"
                    >
                      <span>{category.name}</span>
                      <Badge variant="secondary">{category.count}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="md:col-span-3">
            <Tabs defaultValue="latest">
              <div className="flex items-center justify-between mb-4">
                <TabsList>
                  <TabsTrigger value="latest">Latest</TabsTrigger>
                  <TabsTrigger value="popular">Popular</TabsTrigger>
                  <TabsTrigger value="unanswered">Unanswered</TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="latest" className="space-y-4">
                {posts.map((post) => (
                  <Card key={post._id} className="overflow-hidden">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback>{post.role === "mom" ? "M" : "D"}</AvatarFallback>
                            <AvatarImage src="" />
                          </Avatar>
                          <div>
                            <span className="text-sm font-medium">{post.author}</span>
                            <span className="text-xs text-muted-foreground ml-2">
                              {post.timeAgo}
                            </span>
                          </div>
                        </div>
                        <Badge 
                          className={`font-normal ${categoryColors[post.category] || "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"}`}
                          variant="outline"
                        >
                          {post.category}
                        </Badge>
                      </div>
                      <Link href={`/dashboard/community/post/${post._id}`}>
                        <h3 className="text-xl font-semibold mb-2 hover:text-primary transition-colors">
                          {post.title}
                        </h3>
                      </Link>
                      <p className="text-muted-foreground mb-4 line-clamp-2">
                        {post.content}
                      </p>

                      {!post.analysis && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => analyzePost(post._id)}
                          disabled={!!analyzingPost}
                          className="mb-4"
                        >
                          {analyzingPost === post._id ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Analyzing...
                            </>
                          ) : (
                            'Get AI Analysis'
                          )}
                        </Button>
                      )}

                      {post.analysis && (
                        <div className="mt-4 p-4 bg-muted/50 rounded-lg">
                          <h4 className="font-semibold mb-2">AI Analysis</h4>
                          <p className="text-sm text-muted-foreground whitespace-pre-line">
                            {post.analysis}
                          </p>
                        </div>
                      )}

                      <div className="flex items-center gap-6 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Heart className="h-4 w-4" />
                          <span>{post.likes}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MessageCircle className="h-4 w-4" />
                          <span>{post.comments}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Eye className="h-4 w-4" />
                          <span>{post.views}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="popular">
                <div className="flex items-center justify-center py-12">
                  <p className="text-muted-foreground">Popular posts will be displayed here</p>
                </div>
              </TabsContent>

              <TabsContent value="unanswered">
                <div className="flex items-center justify-center py-12">
                  <p className="text-muted-foreground">Unanswered posts will be displayed here</p>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}