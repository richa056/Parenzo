import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  description: string;
}

export default function AuthLayout({
  children,
  title,
  description,
}: AuthLayoutProps) {
  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
      <div className="hidden md:flex flex-col bg-muted p-10 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/90 to-primary/40 z-10" />
        
        <div className="relative z-20">
          <Link href="/" className="flex items-center mb-12">
            <span className="font-bold text-2xl text-white">Parenzo</span>
          </Link>
          
          <div className="mt-auto">
            <blockquote className="space-y-2">
              <p className="text-lg">
                "Parenzo has transformed our experience as new parents. The support and resources have been invaluable."
              </p>
              <footer className="text-sm">Sofia & James, Parents of twins</footer>
            </blockquote>
          </div>
        </div>
        
        <div className="absolute right-4 top-4">
          <ThemeToggle />
        </div>
      </div>
      
      <div className="flex flex-col p-4 sm:p-8 md:p-10">
        <div className="md:hidden flex items-center justify-between mb-10">
          <Link href="/" className="flex items-center">
            <span className="font-bold text-2xl">Parenzo</span>
          </Link>
          <ThemeToggle />
        </div>
        
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
            <p className="text-sm text-muted-foreground">{description}</p>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}