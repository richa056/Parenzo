import Image from "next/image";
import { CheckCircle2 } from "lucide-react";

export default function ParentingSupportSection() {
  const supportFeatures = [
    "Expert-led parenting classes and workshops",
    "Personalized advice from licensed professionals",
    "24/7 community support from fellow parents",
    "Evidence-based resources and guides",
    "Milestone tracking and development insights",
    "Mental health support for the parenting journey",
  ];

  return (
    <section className="py-20 bg-muted/50">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold tracking-tight mb-6">
              Support at every stage of your parenting journey
            </h2>
            <p className="text-muted-foreground mb-8">
              From pregnancy to toddlerhood and beyond, Parenzo provides the
              tools, community, and expert guidance you need to navigate
              parenthood with confidence.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {supportFeatures.map((feature, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="aspect-square rounded-lg overflow-hidden shadow-xl">
              <div className="absolute inset-0 flex items-center justify-center bg-muted text-muted-foreground">
                Parent and Baby Image
              </div>
            </div>
            <div className="absolute -z-10 -bottom-6 -right-6 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
          </div>
        </div>
      </div>
    </section>
  );
}