"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, MessageSquare, Heart, Calendar, MapPin, Award } from "lucide-react";

export default function CommunityPage() {
  const communityFeatures = [
    {
      icon: <Users className="h-8 w-8" />,
      title: "Parent Groups",
      description: "Join groups based on your baby's age, location, or specific interests.",
      items: [
        "Newborn Parents",
        "Working Parents",
        "Single Parents",
        "Special Needs Support"
      ]
    },
    {
      icon: <MessageSquare className="h-8 w-8" />,
      title: "Discussion Forums",
      description: "Participate in discussions about parenting topics that matter to you.",
      items: [
        "Sleep Training",
        "Feeding & Nutrition",
        "Development Milestones",
        "Parenting Challenges"
      ]
    },
    {
      icon: <Heart className="h-8 w-8" />,
      title: "Support Network",
      description: "Connect with parents who understand your journey and can offer support.",
      items: [
        "Emotional Support",
        "Practical Advice",
        "Shared Experiences",
        "Friendship Building"
      ]
    },
    {
      icon: <Calendar className="h-8 w-8" />,
      title: "Events & Meetups",
      description: "Join local and virtual events to meet other parents in your area.",
      items: [
        "Playdates",
        "Parent Workshops",
        "Expert Talks",
        "Community Events"
      ]
    },
    {
      icon: <MapPin className="h-8 w-8" />,
      title: "Local Community",
      description: "Find and connect with parents in your local area.",
      items: [
        "Neighborhood Groups",
        "Local Resources",
        "Childcare Sharing",
        "Activity Partners"
      ]
    },
    {
      icon: <Award className="h-8 w-8" />,
      title: "Success Stories",
      description: "Read and share inspiring stories from other parents.",
      items: [
        "Parenting Wins",
        "Overcoming Challenges",
        "Creative Solutions",
        "Family Traditions"
      ]
    }
  ];

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-4">Parenzo Community</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Join our vibrant community of parents supporting each other through the journey of parenthood.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {communityFeatures.map((feature, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center gap-4">
                <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
                  {feature.icon}
                </div>
                <CardTitle>{feature.title}</CardTitle>
              </div>
              <CardDescription className="text-lg">
                {feature.description}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {feature.items.map((item, itemIndex) => (
                  <li key={itemIndex} className="flex items-center gap-2">
                    <span className="text-blue-600">•</span>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-16 text-center">
        <h2 className="text-3xl font-bold mb-4">Why Join Our Community?</h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
          Being a parent is a journey best shared with others who understand. Our community provides a safe, 
          supportive space where you can connect, learn, and grow together with other parents.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-xl font-semibold mb-2">Safe Space</h3>
            <p className="text-gray-600">
              Our community is moderated to ensure a respectful and supportive environment for all members.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-xl font-semibold mb-2">Expert Moderated</h3>
            <p className="text-gray-600">
              Our forums are monitored by parenting experts to ensure accurate and helpful information.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-xl font-semibold mb-2">Always Growing</h3>
            <p className="text-gray-600">
              Join a community that's constantly growing and evolving with new members and features.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 