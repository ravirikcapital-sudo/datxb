import { ReactNode } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface AuthLayoutProps {
  children: ReactNode;
  title: string;
  description: string;
}

export const AuthLayout = ({ children, title, description }: AuthLayoutProps) => {
  return (
    <div className="min-h-screen bg-gradient-subtle flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            datXB
          </h1>
          <p className="text-muted-foreground mt-2">
            Professional Data Management Platform
          </p>
          <a 
            href="https://data-x-tawny.vercel.app/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-xs text-primary hover:text-primary-glow transition-colors mt-1 block hover:underline"
          >
            data-x-tawny.vercel.app
          </a>
        </div>
        
        <Card className="shadow-elegant">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {children}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};