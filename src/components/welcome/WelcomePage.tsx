import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Mail, Shield, Users, Database } from "lucide-react";

export const WelcomePage = ({ onGetStarted }: { onGetStarted: () => void }) => {
  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-4xl mx-auto space-y-8">
          <div>
            <h1 className="text-5xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-4">
              Welcome to datXB
            </h1>
            <p className="text-xl text-muted-foreground mb-6">
              Professional Data Management Platform
            </p>
            <div className="flex items-center justify-center space-x-2 mb-8">
              <ExternalLink className="h-4 w-4 text-primary" />
              <a 
                href="https://data-x-tawny.vercel.app/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary hover:text-primary-glow transition-colors hover:underline font-medium"
              >
                data-x-tawny.vercel.app
              </a>
            </div>
          </div>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <Card className="shadow-elegant">
              <CardHeader>
                <Shield className="h-8 w-8 text-primary mx-auto mb-2" />
                <CardTitle>Secure Authentication</CardTitle>
                <CardDescription>
                  Multi-step verification with admin approval workflow
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="shadow-elegant">
              <CardHeader>
                <Users className="h-8 w-8 text-primary mx-auto mb-2" />
                <CardTitle>Role-Based Access</CardTitle>
                <CardDescription>
                  Different access levels for Admin, Manager, Analyst, and Viewer roles
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="shadow-elegant">
              <CardHeader>
                <Database className="h-8 w-8 text-primary mx-auto mb-2" />
                <CardTitle>Data Management</CardTitle>
                <CardDescription>
                  Comprehensive tools for professional data handling and analytics
                </CardDescription>
              </CardHeader>
            </Card>
          </div>

          {/* Call to Action */}
          <div className="space-y-4">
            <Button 
              onClick={onGetStarted}
              variant="gradient"
              size="lg"
              className="text-lg px-8 py-3"
            >
              Get Started
            </Button>
            <p className="text-sm text-muted-foreground">
              Sign up for an account or sign in if you already have one
            </p>
          </div>

          {/* Admin Contact */}
          <Card className="bg-muted max-w-md mx-auto">
            <CardContent className="pt-6">
              <div className="flex items-center justify-center space-x-2 text-sm">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">Admin approval required:</span>
                <a 
                  href="mailto:raviraushan1313@gmail.com"
                  className="text-primary hover:underline"
                >
                  raviraushan1313@gmail.com
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};