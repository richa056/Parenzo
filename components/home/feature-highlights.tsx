import {
  UserRoundPlus,
  MessageSquare,
  Calendar,
  BarChart3,
  Users,
  BrainCircuit,
} from "lucide-react";

export default function FeatureHighlights() {
  const features = [
    {
      icon: <UserRoundPlus className="h-10 w-10 text-primary" />,
      title: "Role-Based Profiles",
      description:
        "Create a personalized experience as a mom or dad, with tailored content and connections.",
    },
    {
      icon: <MessageSquare className="h-10 w-10 text-primary" />,
      title: "Real-Time Chat",
      description:
        "Stay connected with your partner through secure, instant messaging.",
    },
    {
      icon: <BarChart3 className="h-10 w-10 text-primary" />,
      title: "Baby Tracker",
      description:
        "Monitor feedings, diapers, sleep patterns and share data with your partner.",
    },
    {
      icon: <Users className="h-10 w-10 text-primary" />,
      title: "Community Forum",
      description:
        "Share experiences and get advice from other parents in a supportive environment.",
    },
    {
      icon: <Calendar className="h-10 w-10 text-primary" />,
      title: "Professional Support",
      description:
        "Book appointments with therapists and parenting experts when you need guidance.",
    },
    {
      icon: <BrainCircuit className="h-10 w-10 text-primary" />,
      title: "AI Parenting Assistant",
      description:
        "Get immediate answers to common parenting questions from our AI helper.",
    },
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight mb-4">
            Everything you need in one place
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Parenzo combines essential tools for new parents with community
            support and expert guidance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-card rounded-lg p-6 shadow-sm border transition-all duration-200 hover:shadow-md hover:scale-[1.02]"
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}