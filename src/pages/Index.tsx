
import React, { useState, useEffect } from 'react';
import { Onboarding } from '../components/Onboarding';
import { MainApp } from '../components/MainApp';

const Index = () => {
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false);
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    // Check if user has completed onboarding
    const profile = localStorage.getItem('unveil-user-profile');
    if (profile) {
      setUserProfile(JSON.parse(profile));
      setHasCompletedOnboarding(true);
    }
  }, []);

  const handleOnboardingComplete = (profile) => {
    setUserProfile(profile);
    setHasCompletedOnboarding(true);
    localStorage.setItem('unveil-user-profile', JSON.stringify(profile));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {!hasCompletedOnboarding ? (
        <Onboarding onComplete={handleOnboardingComplete} />
      ) : (
        <MainApp userProfile={userProfile} />
      )}
    </div>
  );
};

export default Index;
