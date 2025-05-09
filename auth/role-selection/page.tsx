"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UserRole } from "@/lib/auth";
import { User, Stethoscope, Baby } from "lucide-react";

const roles = [
  {
    id: "mom",
    title: "Mom",
    description: "Track your baby's development, connect with other moms, and access parenting resources.",
    icon: <Baby className="h-8 w-8" />,
    color: "bg-pink-100 text-pink-800"
  },
  {
    id: "dad",
    title: "Dad",
    description: "Join dad-specific groups, share experiences, and get support from other fathers.",
    icon: <User className="h-8 w-8" />,
    color: "bg-blue-100 text-blue-800"
  },
  {
    id: "medical_monitor",
    title: "Medical Monitor",
    description: "Access medical records, track patient progress, and provide professional support.",
    icon: <Stethoscope className="h-8 w-8" />,
    color: "bg-green-100 text-green-800"
  }
];

export default function RoleSelectionPage() {
  const { data: session, update } = useSession();
  const router = useRouter();
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleRoleSelection = async (role: UserRole) => {
    if (!session?.user?.email) return;
    
    setIsLoading(true);
    try {
      const response = await fetch("/api/users/update-role", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: session.user.email,
          role,
        }),
      });

      if (response.ok) {
        await update();
        router.push("/dashboard");
      }
    } catch (error) {
      console.error("Error updating role:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Choose Your Role</h1>
        <p className="text-xl text-muted-foreground">
          Select your role to access the appropriate features and resources
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {roles.map((role) => (
          <Card
            key={role.id}
            className={`cursor-pointer transition-all hover:shadow-lg ${
              selectedRole === role.id ? "ring-2 ring-primary" : ""
            }`}
            onClick={() => setSelectedRole(role.id as UserRole)}
          >
            <CardHeader>
              <div className={`p-2 rounded-lg w-fit ${role.color}`}>
                {role.icon}
              </div>
              <CardTitle>{role.title}</CardTitle>
              <CardDescription>{role.description}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>

      <div className="flex justify-center mt-12">
        <Button
          size="lg"
          disabled={!selectedRole || isLoading}
          onClick={() => selectedRole && handleRoleSelection(selectedRole)}
        >
          {isLoading ? "Setting up your account..." : "Continue"}
        </Button>
      </div>
    </div>
  );
} 