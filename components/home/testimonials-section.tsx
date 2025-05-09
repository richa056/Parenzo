import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { QuoteIcon } from "lucide-react";

export default function TestimonialsSection() {
  const testimonials = [
    {
      quote:
        "Parenzo helped me connect with other moms going through the same challenges. The tracking features have been a lifesaver for managing our baby's schedule.",
      author: "Sarah J.",
      role: "Mom of 2",
      avatar: "SJ",
    },
    {
      quote:
        "As a new dad, I felt lost until I found this community. The dad-specific resources and ability to track everything with my partner has made a huge difference.",
      author: "Michael T.",
      role: "First-time Dad",
      avatar: "MT",
    },
    {
      quote:
        "The expert sessions helped me navigate postpartum anxiety. I'm so grateful for this platform and the support it provides.",
      author: "Emily R.",
      role: "Mom of 1",
      avatar: "ER",
    },
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight mb-4">
            Trusted by parents everywhere
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Hear from parents who have found community, support, and confidence
            through Parenzo.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="border shadow-sm">
              <CardContent className="p-6">
                <QuoteIcon className="h-8 w-8 text-primary/20 mb-4" />
                <p className="mb-6">{testimonial.quote}</p>
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarFallback>{testimonial.avatar}</AvatarFallback>
                    <AvatarImage src="" />
                  </Avatar>
                  <div>
                    <p className="font-medium">{testimonial.author}</p>
                    <p className="text-sm text-muted-foreground">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}