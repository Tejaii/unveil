import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Sparkles, Brain, TrendingUp, Globe, Zap, ArrowRight, Users, BookOpen, Target } from 'lucide-react';
import { AuthModal } from '@/components/auth/AuthModal';
import { useAuth } from '@/components/auth/AuthProvider';
import { useNavigate } from 'react-router-dom';
import { MainApp } from '@/components/MainApp';

const Index = () => {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false);
  const [userProfile, setUserProfile] = useState(null);
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // If user is authenticated, check for onboarding completion
    if (user && !loading) {
      const profile = localStorage.getItem('unveil-user-profile');
      if (profile) {
        setUserProfile(JSON.parse(profile));
        setHasCompletedOnboarding(true);
      } else {
        // User is authenticated but hasn't completed onboarding
        // You could redirect to onboarding here or show it inline
        setHasCompletedOnboarding(true); // For now, skip onboarding
      }
    }
  }, [user, loading]);

  // If user is authenticated and has completed onboarding, show main app
  if (user && hasCompletedOnboarding) {
    return <MainApp userProfile={userProfile} />;
  }

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center space-y-4">
          <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center mx-auto">
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
          </div>
          <p className="text-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  const features = [
    {
      icon: Brain,
      title: "AI-Powered Curation",
      description: "Smart algorithms learn your preferences to deliver personalized news"
    },
    {
      icon: TrendingUp,
      title: "Real-time Insights",
      description: "Stay ahead with trending topics and breaking news analysis"
    },
    {
      icon: Globe,
      title: "Global Coverage",
      description: "Access news from trusted sources worldwide in one place"
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Get your daily briefing in minutes, not hours"
    }
  ];

  const stats = [
    { icon: Users, value: "10K+", label: "Active Readers" },
    { icon: BookOpen, value: "50K+", label: "Articles Curated" },
    { icon: Target, value: "95%", label: "Accuracy Rate" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/20">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-r from-accent/5 via-transparent to-accent/5" />
        
        <div className="relative max-w-6xl mx-auto px-6 pt-20 pb-16">
          {/* Header */}
          <div className="flex items-center justify-between mb-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center shadow-floating">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-foreground">Unveil</h1>
            </div>
            
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                onClick={() => setShowAuthModal(true)}
                className="text-muted-foreground hover:text-foreground rounded-xl border-0"
              >
                Sign In
              </Button>
              <Button
                onClick={() => setShowAuthModal(true)}
                className="btn-primary border-0"
              >
                Get Started
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>

          {/* Hero Content */}
          <div className="text-center space-y-8 mb-20">
            <div className="space-y-6">
              <Badge className="pill-badge border-0">
                🚀 AI-Powered News Intelligence
              </Badge>
              
              <h2 className="text-5xl md:text-6xl font-bold text-foreground leading-tight">
                Smart News for
                <span className="block bg-gradient-to-r from-accent to-accent/80 bg-clip-text text-transparent">
                  Smart Minds
                </span>
              </h2>
              
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Cut through the noise with AI-curated news that matters to you. 
                Get personalized insights, trending analysis, and global coverage in one intelligent feed.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                onClick={() => setShowAuthModal(true)}
                className="btn-primary text-lg px-8 py-4 border-0"
              >
                <Sparkles className="w-5 h-5 mr-2" />
                Start Reading Smart
              </Button>
              
              <Button
                variant="outline"
                className="btn-secondary text-lg px-8 py-4 border-0"
              >
                <Globe className="w-5 h-5 mr-2" />
                Explore Demo
              </Button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            {stats.map((stat, index) => (
              <Card key={index} className="bg-card/50 backdrop-blur-sm rounded-xl card-shadow border-0">
                <CardContent className="p-6 text-center">
                  <div className="flex items-center justify-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                      <stat.icon className="w-5 h-5 text-accent" />
                    </div>
                    <span className="text-3xl font-bold text-foreground">{stat.value}</span>
                  </div>
                  <p className="text-muted-foreground font-medium">{stat.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-6xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h3 className="text-3xl font-bold text-foreground mb-4">
            Why Choose Unveil?
          </h3>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Experience the future of news consumption with our intelligent platform
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="bg-card/50 backdrop-blur-sm rounded-xl card-shadow hover:card-shadow-hover transition-all duration-300 border-0">
              <CardContent className="p-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0">
                    <feature.icon className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-foreground mb-3">
                      {feature.title}
                    </h4>
                    <p className="text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-accent/5 via-accent/10 to-accent/5 py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h3 className="text-3xl font-bold text-foreground mb-6">
            Ready to Transform Your News Experience?
          </h3>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of readers who've already discovered smarter news consumption
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              onClick={() => setShowAuthModal(true)}
              className="btn-primary text-lg px-8 py-4 border-0"
            >
              <Sparkles className="w-5 h-5 mr-2" />
              Get Started Free
            </Button>
            
            <p className="text-sm text-muted-foreground">
              No credit card required • Free forever
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-background py-12 border-t border-border/50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <span className="font-semibold text-foreground">Unveil</span>
            </div>
            
            <p className="text-muted-foreground text-sm">
              © 2024 Unveil. Smart News for Smart Minds.
            </p>
          </div>
        </div>
      </footer>

      {/* Auth Modal */}
      <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
    </div>
  );
};

export default Index;