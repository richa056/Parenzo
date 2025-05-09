import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MessageCircle, Heart, Eye, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function CommunityHighlights() {
  const posts = [
    {
      title: "Any tips for managing sleep regression?",
      author: "Anonymous Mom",
      category: "Sleep",
      timeAgo: "2 hours ago",
      likes: 15,
      comments: 8,
      views: 124,
    },
    {
      title: "Feeling overwhelmed as a new dad",
      author: "Anonymous Dad",
      category: "Mental Health",
      timeAgo: "5 hours ago",
      likes: 32,
      comments: 17,
      views: 203,
    },
    {
      title: "Best bottle brands for breastfed babies?",
      author: "Anonymous Mom",
      category: "Feeding",
      timeAgo: "12 hours ago",
      likes: 8,
      comments: 21,
      views: 187,
    },
    {
      title: "Local playgroup meetups in Seattle",
      author: "AnonymousMom",
      category: "Community",
      timeAgo: "1 day ago",
      likes: 24,
      comments: 7,
      views: 134,
    },
  ];

  const categoryColors: Record<string, string> = {
    "Sleep": "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
    "Mental Health": "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
    "Feeding": "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
    "Community": "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Community Highlights</span>
          <Link href="/dashboard/community">
            <Button variant="ghost" size="sm" className="gap-1">
              View All <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </CardTitle>
        <CardDescription>
          Recent discussions from the parenting community
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {posts.map((post, index) => (
            <Card key={index} className="border-0 shadow-none hover:bg-muted/50 transition-colors">
              <CardContent className="p-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Badge 
                      className={`font-normal ${categoryColors[post.category] || "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"}`}
                      variant="outline"
                    >
                      {post.category}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {post.timeAgo}
                    </span>
                  </div>
                  <Link href="/dashboard/community/post/123">
                    <h4 className="font-semibold hover:text-primary transition-colors">
                      {post.title}
                    </h4>
                  </Link>
                  <div className="flex items-center text-xs text-muted-foreground">
                    <span>By {post.author}</span>
                  </div>
                  <div className="flex items-center text-xs text-muted-foreground pt-2 border-t space-x-4">
                    <div className="flex items-center">
                      <Heart className="h-3 w-3 mr-1" />
                      <span>{post.likes}</span>
                    </div>
                    <div className="flex items-center">
                      <MessageCircle className="h-3 w-3 mr-1" />
                      <span>{post.comments}</span>
                    </div>
                    <div className="flex items-center">
                      <Eye className="h-3 w-3 mr-1" />
                      <span>{post.views}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}