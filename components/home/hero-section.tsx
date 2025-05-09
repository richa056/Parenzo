import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative py-20 md:py-28 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary-foreground/10 to-background pointer-events-none" />
      <div className="container relative">
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 animate-fade-up">
            Parenting is better{" "}
            <span className="text-primary">together</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 animate-fade-up animation-delay-100">
            Connect with other parents, track your baby's development, and get
            expert help when you need it most. Parenzo is your complete wellness
            platform for the parenting journey.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 animate-fade-up animation-delay-200">
            <Link href="/signup">
              <Button size="lg">
                Join now
              </Button>
            </Link>
            <Link href="/features">
              <Button variant="outline" size="lg" className="gap-2">
                Learn more <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
        <div className="mt-16 md:mt-24 max-w-4xl mx-auto relative animate-fade-up animation-delay-300">
          <div className="aspect-video bg-card rounded-lg shadow-xl overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center text-muted-foreground text-lg font-medium">
              App Preview Image
            </div>
          </div>
          <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute -top-6 -left-6 w-24 h-24 bg-primary/10 rounded-full blur-3xl" />
        </div>
      </div>
    </section>
  );
}