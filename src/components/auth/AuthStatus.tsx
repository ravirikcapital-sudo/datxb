import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Clock, Mail, AlertCircle } from "lucide-react";

interface AuthStatusProps {
  type: "verification" | "pending" | "approved" | "error";
  onBackToLogin: () => void;
}

export const AuthStatus = ({ type, onBackToLogin }: AuthStatusProps) => {
  const getStatusConfig = () => {
    switch (type) {
        case "verification":
        return {
          icon: <Mail className="h-12 w-12 text-primary" />,
          title: "Check Your Email",
          description: "We've sent a verification link to your email address. Please check your inbox and click the link to verify your account.",
          details: "An approval request with your details and site link (https://data-x-tawny.vercel.app/) has been sent to raviraushan1313@gmail.com for administrative review.",
          variant: "default" as const
        };
      case "pending":
        return {
          icon: <Clock className="h-12 w-12 text-warning" />,
          title: "Account Pending Approval",
          description: "Your account is waiting for administrator approval. You'll receive an email notification once approved.",
          details: "This process typically takes 24-48 hours during business days.",
          variant: "default" as const
        };
      case "approved":
        return {
          icon: <CheckCircle className="h-12 w-12 text-success" />,
          title: "Account Approved!",
          description: "Your account has been approved by the administrator. You can now sign in to access datXB.",
          details: "Welcome to the datXB platform. You can now access all features based on your user type.",
          variant: "default" as const
        };
      case "error":
        return {
          icon: <AlertCircle className="h-12 w-12 text-destructive" />,
          title: "Account Issue",
          description: "There was an issue with your account verification or approval process.",
          details: "Please contact the administrator at raviraushan1313@gmail.com for assistance.",
          variant: "destructive" as const
        };
    }
  };

  const config = getStatusConfig();

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
        
        <Card className="shadow-elegant text-center">
          <CardHeader className="pb-4">
            <div className="flex justify-center mb-4">
              {config.icon}
            </div>
            <CardTitle className="text-2xl">{config.title}</CardTitle>
            <CardDescription className="text-base">
              {config.description}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground bg-muted p-4 rounded-lg">
              {config.details}
            </p>
            
            <div className="space-y-2">
              <Button 
                onClick={onBackToLogin}
                variant={type === "approved" ? "gradient" : "outline"}
                className="w-full"
              >
                {type === "approved" ? "Sign In Now" : "Back to Sign In"}
              </Button>
              
              {(type === "verification" || type === "pending") && (
                <p className="text-xs text-muted-foreground">
                  Didn't receive an email? Check your spam folder or contact support.
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};