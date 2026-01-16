import { useState } from "react";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { LoginForm } from "@/components/auth/LoginForm";
import { SignupForm } from "@/components/auth/SignupForm";
import { AuthStatus } from "@/components/auth/AuthStatus";
import { Dashboard } from "@/components/dashboard/Dashboard";
import { WelcomePage } from "@/components/welcome/WelcomePage";

type AuthState = "welcome" | "login" | "signup" | "verification" | "pending" | "approved" | "dashboard";

interface User {
  username: string;
  email: string;
  userType: string;
}

const Index = () => {
  const [authState, setAuthState] = useState<AuthState>("welcome");
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const handleLoginSuccess = () => {
    // Reasoning: System checks user verification and approval status
    // For demo purposes, simulating different states
    const demoUser: User = {
      username: "demo_user",
      email: "demo@example.com",
      userType: "analyst"
    };
    setCurrentUser(demoUser);
    setAuthState("dashboard");
  };

  const handleSignupSuccess = () => {
    // Reasoning: After successful signup, show verification status
    setAuthState("verification");
  };

  const handleLogout = () => {
    // Reasoning: System clears user session and returns to welcome page
    setCurrentUser(null);
    setAuthState("welcome");
  };

  // Welcome page for first-time visitors
  if (authState === "welcome") {
    return <WelcomePage onGetStarted={() => setAuthState("login")} />;
  }

  // Dashboard view for authenticated users
  if (authState === "dashboard" && currentUser) {
    return <Dashboard user={currentUser} onLogout={handleLogout} />;
  }

  // Status views
  if (["verification", "pending", "approved"].includes(authState)) {
    return (
      <AuthStatus 
        type={authState as "verification" | "pending" | "approved"} 
        onBackToLogin={() => setAuthState("login")} 
      />
    );
  }

  // Login view
  if (authState === "login") {
    return (
      <AuthLayout 
        title="Sign In" 
        description="Access your datXB account"
      >
        <LoginForm 
          onSuccess={handleLoginSuccess}
          onSwitchToSignup={() => setAuthState("signup")}
        />
      </AuthLayout>
    );
  }

  // Signup view
  return (
    <AuthLayout 
      title="Create Account" 
      description="Join the datXB platform"
    >
      <SignupForm 
        onSuccess={handleSignupSuccess}
        onSwitchToLogin={() => setAuthState("login")}
      />
    </AuthLayout>
  );
};

export default Index;
