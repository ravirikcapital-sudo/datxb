import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { LogOut, User, Database, BarChart3, Settings } from "lucide-react";

interface DashboardProps {
  user: {
    username: string;
    email: string;
    userType: string;
  };
  onLogout: () => void;
}

export const Dashboard = ({ user, onLogout }: DashboardProps) => {
  const { toast } = useToast();

  const handleLogout = () => {
    // Reasoning: System clears user session and redirects to login
    toast({
      title: "Logged out successfully",
      description: "You have been signed out of datXB.",
    });
    onLogout();
  };

  const handleFeatureClick = (feature: string) => {
    toast({
      title: `${feature} Selected`,
      description: `${feature} functionality will be implemented based on your user type: ${user.userType}`,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Header */}
      <header className="border-b bg-card shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <div>
              <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                datXB
              </h1>
              <p className="text-sm text-muted-foreground">
                Professional Data Management Platform
              </p>
            </div>
            <div className="hidden md:block">
              <a 
                href="https://data-x-tawny.vercel.app/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-sm text-primary hover:text-primary-glow transition-colors hover:underline"
              >
                🌐 data-x-tawny.vercel.app
              </a>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <p className="font-medium">{user.username}</p>
              <p className="text-sm text-muted-foreground capitalize">{user.userType}</p>
            </div>
            <Button 
              onClick={handleLogout}
              variant="outline"
              size="sm"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">Welcome back, {user.username}!</h2>
          <p className="text-muted-foreground">
            You are logged in as a <span className="font-medium capitalize">{user.userType}</span>. 
            Access your data management tools below.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="shadow-elegant hover:shadow-glow transition-all cursor-pointer" onClick={() => handleFeatureClick("User Management")}>
            <CardHeader>
              <User className="h-8 w-8 text-primary mb-2" />
              <CardTitle>User Management</CardTitle>
              <CardDescription>
                Manage user accounts, permissions, and access levels
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Available for: Admin, Manager
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-elegant hover:shadow-glow transition-all cursor-pointer" onClick={() => handleFeatureClick("Data Analytics")}>
            <CardHeader>
              <BarChart3 className="h-8 w-8 text-primary mb-2" />
              <CardTitle>Data Analytics</CardTitle>
              <CardDescription>
                View reports, charts, and analytical insights
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Available for: All user types
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-elegant hover:shadow-glow transition-all cursor-pointer" onClick={() => handleFeatureClick("Database Management")}>
            <CardHeader>
              <Database className="h-8 w-8 text-primary mb-2" />
              <CardTitle>Database Management</CardTitle>
              <CardDescription>
                Manage data sources, tables, and relationships
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Available for: Admin, Analyst
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-elegant hover:shadow-glow transition-all cursor-pointer" onClick={() => handleFeatureClick("System Settings")}>
            <CardHeader>
              <Settings className="h-8 w-8 text-primary mb-2" />
              <CardTitle>System Settings</CardTitle>
              <CardDescription>
                Configure platform settings and preferences
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Available for: Admin only
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Status Information */}
        <Card className="mt-8 bg-gradient-accent text-white">
          <CardHeader>
            <CardTitle>Platform Status</CardTitle>
            <CardDescription className="text-white/80">
              Your account is fully verified and approved
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <p className="font-medium">Account Status</p>
                <p className="text-white/80">Active & Verified</p>
              </div>
              <div>
                <p className="font-medium">User Type</p>
                <p className="text-white/80 capitalize">{user.userType}</p>
              </div>
              <div>
                <p className="font-medium">Site Access</p>
                <a 
                  href="https://data-x-tawny.vercel.app/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-white/80 hover:text-white transition-colors hover:underline"
                >
                  https://data-x-tawny.vercel.app/
                </a>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};