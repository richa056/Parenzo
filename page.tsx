"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Baby, Heart, Shield, Users, Calendar, MessageSquare, BookOpen, Star, CheckCircle2, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import Image from "next/image";

export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % 3);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const features = [
    {
      icon: <Baby className="h-8 w-8" />,
      title: "Baby Tracker",
      description: "Track your baby's growth, feeding, sleep patterns, and milestones with our intuitive tracking system."
    },
    {
      icon: <Heart className="h-8 w-8" />,
      title: "Health Monitoring",
      description: "Monitor your baby's health metrics, vaccinations, and development with personalized insights."
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Safety & Security",
      description: "Keep your baby's data secure with our advanced encryption and privacy features."
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Parent Community",
      description: "Connect with other parents, share experiences, and get support from our growing community."
    }
  ];

  const reviews = [
    {
      name: "Sarah Johnson",
      role: "New Mom",
      rating: 5,
      quote: "Parenzo has been a lifesaver! The tracking features help me stay organized and the community support is amazing."
    },
    {
      name: "Michael Chen",
      role: "Working Dad",
      rating: 5,
      quote: "As a busy working parent, Parenzo helps me stay connected with my baby's development even when I'm away."
    },
    {
      name: "Emma Davis",
      role: "First-time Mom",
      rating: 5,
      quote: "The expert advice and resources have been invaluable in my journey as a new mother."
    }
  ];

  const carouselImages = [
    "https://www.istockphoto.com/photos/new-parents",
    "https://positivelypresent.com/2018/05/new-parents.html"
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-stone-50 via-stone-100 to-stone-50 text-stone-800">
      {/* Header with Login/Signup */}
      <header className="fixed top-0 left-0 right-0 bg-stone-50/90 backdrop-blur-sm z-50 border-b border-stone-200">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-stone-800">
            Parenzo
          </Link>
          <div className="flex gap-4">
            <Link href="/login">
              <Button variant="outline" className="border-stone-300 text-stone-800 hover:bg-stone-100">
                Login
              </Button>
            </Link>
            <Link href="/register">
              <Button className="bg-stone-800 text-stone-50 hover:bg-stone-700">
                Sign Up
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-32 pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-stone-50/50 to-transparent" />
        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-6 animate-fade-in text-stone-800">
              Welcome to Parenzo
            </h1>
            <p className="text-xl mb-8 text-stone-600 animate-fade-in animation-delay-200">
              Your trusted companion in the beautiful journey of parenthood. Track, learn, and connect with confidence.
            </p>
            <div className="flex justify-center gap-4 animate-fade-in animation-delay-400">
              <Link href="/features">
                <Button size="lg" variant="outline" className="border-stone-300 text-stone-800 hover:bg-stone-100">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Carousel Section */}
      <section className="py-16 relative">
        <div className="container mx-auto px-4">
          <div className="relative h-[400px] overflow-hidden rounded-lg">
            {carouselImages.map((image, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-opacity duration-500 ${
                  index === currentSlide ? "opacity-100" : "opacity-0"
                }`}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-stone-50/80 to-transparent" />
                <Image
                  src={image}
                  alt={`Family ${index + 1}`}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-stone-800 p-8">
                    <h2 className="text-3xl font-bold mb-4">Create Beautiful Memories</h2>
                    <p className="text-xl text-stone-600">Capture and cherish every moment of your parenting journey</p>
                  </div>
                </div>
              </div>
            ))}
            <button
              onClick={() => setCurrentSlide((prev) => (prev - 1 + 3) % 3)}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-stone-50/50 p-2 rounded-full hover:bg-stone-50/70"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              onClick={() => setCurrentSlide((prev) => (prev + 1) % 3)}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-stone-50/50 p-2 rounded-full hover:bg-stone-50/70"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>
        </div>
      </section>

      {/* Key Features Section */}
      <section className="py-16 bg-gradient-to-b from-stone-100 to-stone-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4 text-stone-800">Key Features</h2>
            <p className="text-xl text-stone-600 max-w-2xl mx-auto">
              Everything you need to make your parenting journey easier and more enjoyable.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="bg-stone-50/50 border-stone-200 hover:bg-stone-100 transition-all duration-300">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-stone-200 rounded-lg text-stone-800">
                      {feature.icon}
                    </div>
                    <CardTitle className="text-stone-800">{feature.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-stone-600">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="py-16 bg-stone-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4 text-stone-800">What Parents Say</h2>
            <p className="text-xl text-stone-600 max-w-2xl mx-auto">
              Join thousands of parents who trust Parenzo to help them navigate the beautiful journey of parenthood.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {reviews.map((review, index) => (
              <Card key={index} className="bg-stone-50/50 border-stone-200 hover:bg-stone-100 transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex gap-1 mb-4">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-amber-400 fill-amber-400" />
                    ))}
                  </div>
                  <p className="text-stone-600 italic mb-4">"{review.quote}"</p>
                  <div>
                    <p className="font-semibold text-stone-800">{review.name}</p>
                    <p className="text-sm text-stone-500">{review.role}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Features Section */}
      <section className="py-16 bg-gradient-to-b from-stone-50 to-stone-100">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="animate-fade-in">
              <h2 className="text-3xl font-bold mb-6 text-stone-800">Expert Guidance</h2>
              <p className="text-xl text-stone-600 mb-6">
                Get access to expert advice and resources curated by pediatric specialists and child development experts.
              </p>
              <ul className="space-y-4">
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="h-6 w-6 text-emerald-500" />
                  <span className="text-stone-600">Personalized recommendations</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="h-6 w-6 text-emerald-500" />
                  <span className="text-stone-600">24/7 expert support</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="h-6 w-6 text-emerald-500" />
                  <span className="text-stone-600">Evidence-based resources</span>
                </li>
              </ul>
            </div>
            <div className="animate-fade-in animation-delay-200">
              <h2 className="text-3xl font-bold mb-6 text-stone-800">Community Support</h2>
              <p className="text-xl text-stone-600 mb-6">
                Connect with other parents, share experiences, and get support from our growing community.
              </p>
              <ul className="space-y-4">
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="h-6 w-6 text-emerald-500" />
                  <span className="text-stone-600">Parent groups and forums</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="h-6 w-6 text-emerald-500" />
                  <span className="text-stone-600">Local meetups and events</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="h-6 w-6 text-emerald-500" />
                  <span className="text-stone-600">Success stories and tips</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-stone-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4 text-stone-800">Ready to Start Your Journey?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-stone-600">
            Join thousands of parents who trust Parenzo to help them navigate the beautiful journey of parenthood.
          </p>
          <Link href="/register">
            <Button size="lg" className="bg-stone-800 text-stone-50 hover:bg-stone-700">
              Sign Up Now
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}