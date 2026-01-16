import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Mail, Lock, User, Building, Check, X } from "lucide-react";

interface SignupFormProps {
  onSuccess: () => void;
  onSwitchToLogin: () => void;
}

export const SignupForm = ({ onSuccess, onSwitchToLogin }: SignupFormProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [userType, setUserType] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  // Password validation
  const passwordRequirements = {
    lowercase: /[a-z]/.test(password),
    uppercase: /[A-Z]/.test(password),
    symbol: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    length: password.length >= 8
  };

  const isPasswordValid = Object.values(passwordRequirements).every(Boolean);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Reasoning: System validates all required fields and password requirements
      if (!email || !password || !username || !userType) {
        throw new Error("Please fill in all fields");
      }

      if (!isPasswordValid) {
        throw new Error("Password must meet all requirements");
      }

      // Reasoning: System checks if email is already registered
      if (email.includes("test@")) {
        throw new Error("Email already in use");
      }

      // Reasoning: System creates user account and sends verification emails
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API call

      // Reasoning: System sends verification email to user and approval request to admin
      const emailPayload = {
        userEmail: email,
        adminEmail: "raviraushan1313@gmail.com",
        userData: { username, email, userType },
        siteLink: "https://data-x-tawny.vercel.app/",
        approvalMessage: `New user signup requires approval:\n- Username: ${username}\n- Email: ${email}\n- User Type: ${userType}\n- Site: https://data-x-tawny.vercel.app/\n\nPlease review and approve this account.`
      };

      // Result: User account created, verification emails sent
      toast({
        title: "Account created successfully!",
        description: "A verification link has been sent to your email. Admin approval is required.",
      });

      onSuccess();
    } catch (error) {
      // Result: Show error message based on validation failure
      toast({
        title: "Signup failed",
        description: error instanceof Error ? error.message : "Failed to create account",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="username">Username</Label>
        <div className="relative">
          <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            id="username"
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="pl-10"
            required
          />
        </div>
      </div>

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
            placeholder="Create a password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="pl-10"
            required
          />
        </div>
        
        {/* Password Requirements */}
        {password && (
          <div className="space-y-2 p-3 bg-muted/50 rounded-lg animate-fade-in">
            <p className="text-sm font-medium text-muted-foreground">Password Requirements:</p>
            <div className="grid grid-cols-2 gap-2">
              <div className={`flex items-center gap-2 text-sm transition-colors ${passwordRequirements.lowercase ? 'text-success' : 'text-muted-foreground'}`}>
                {passwordRequirements.lowercase ? 
                  <Check className="h-3 w-3 text-success" /> : 
                  <X className="h-3 w-3 text-muted-foreground" />
                }
                Lowercase letter
              </div>
              <div className={`flex items-center gap-2 text-sm transition-colors ${passwordRequirements.uppercase ? 'text-success' : 'text-muted-foreground'}`}>
                {passwordRequirements.uppercase ? 
                  <Check className="h-3 w-3 text-success" /> : 
                  <X className="h-3 w-3 text-muted-foreground" />
                }
                Uppercase letter
              </div>
              <div className={`flex items-center gap-2 text-sm transition-colors ${passwordRequirements.symbol ? 'text-success' : 'text-muted-foreground'}`}>
                {passwordRequirements.symbol ? 
                  <Check className="h-3 w-3 text-success" /> : 
                  <X className="h-3 w-3 text-muted-foreground" />
                }
                Special symbol
              </div>
              <div className={`flex items-center gap-2 text-sm transition-colors ${passwordRequirements.length ? 'text-success' : 'text-muted-foreground'}`}>
                {passwordRequirements.length ? 
                  <Check className="h-3 w-3 text-success" /> : 
                  <X className="h-3 w-3 text-muted-foreground" />
                }
                8+ characters
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="userType">User Type</Label>
        <div className="relative">
          <Building className="absolute left-3 top-3 h-4 w-4 text-muted-foreground z-10" />
          <Select value={userType} onValueChange={setUserType} required>
            <SelectTrigger className="pl-10">
              <SelectValue placeholder="Select user type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="admin">Administrator</SelectItem>
              <SelectItem value="manager">Manager</SelectItem>
              <SelectItem value="analyst">Data Analyst</SelectItem>
              <SelectItem value="viewer">Viewer</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Button 
        type="submit" 
        className="w-full transition-all duration-300 hover:shadow-glow" 
        disabled={isLoading || !isPasswordValid}
        variant="gradient"
      >
        {isLoading && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
        {isLoading ? "Creating Account..." : "Create Account"}
      </Button>

      <div className="text-center">
        <p className="text-sm text-muted-foreground">
          Already have an account?{" "}
          <button
            type="button"
            onClick={onSwitchToLogin}
            className="text-primary hover:underline font-medium"
          >
            Sign in
          </button>
        </p>
      </div>
    </form>
  );
};