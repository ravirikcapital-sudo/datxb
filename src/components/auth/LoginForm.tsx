import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Mail, Lock } from "lucide-react";

interface LoginFormProps {
  onSuccess: () => void;
  onSwitchToSignup: () => void;
}

export const LoginForm = ({ onSuccess, onSwitchToSignup }: LoginFormProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Reasoning: System validates user credentials and account status
    try {
      // Simulated authentication logic
      if (!email || !password) {
        throw new Error("Please fill in all fields");
      }

      // Check if user exists and is approved
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call

      // Result: User is authenticated and redirected
      toast({
        title: "Login successful",
        description: "Welcome back to datXB!",
      });
      onSuccess();
    } catch (error) {
      // Result: Show error message based on validation
      toast({
        title: "Login failed",
        description: error instanceof Error ? error.message : "Invalid credentials or account pending approval",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <div className="relative">
          <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            id="email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="pl-10"
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <div className="relative">
          <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            id="password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="pl-10"
            required
          />
        </div>
      </div>

      <Button 
        type="submit" 
        className="w-full" 
        disabled={isLoading}
        variant="gradient"
      >
        {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
        Sign In
      </Button>

      <div className="text-center">
        <p className="text-sm text-muted-foreground">
          Don't have an account?{" "}
          <button
            type="button"
            onClick={onSwitchToSignup}
            className="text-primary hover:underline font-medium"
          >
            Sign up
          </button>
        </p>
      </div>
    </form>
  );
};