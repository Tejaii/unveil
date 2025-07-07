import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ArrowRight, Sparkles } from 'lucide-react';
import { topicFeeds } from '@/components/constants/topicFeeds';

const readingDepths = [
  { id: 'headlines', label: 'Headlines Only', desc: 'Quick overview of events' },
  { id: 'summaries', label: 'AI Summaries', desc: 'Concise AI-generated insights' },
  { id: 'full', label: 'Full Articles', desc: 'Complete in-depth coverage' }
];

const schedules = [
  { id: 'morning', label: 'Morning Briefing', desc: '7-9 AM digest' },
  { id: 'evening', label: 'Evening Wrap-up', desc: '6-8 PM summary' },
  { id: 'realtime', label: 'Real-time Updates', desc: 'Continuous feed' }
];

const userTypes = [
  { id: 'student', label: 'Student', desc: 'Academic focus, research, campus news' },
  { id: 'developer', label: 'Developer', desc: 'Tech trends, GitHub, programming news' },
  { id: 'consumer', label: 'General Consumer', desc: 'Lifestyle, finance, entertainment' },
  { id: 'enthusiast', label: 'News Enthusiast', desc: 'Deep dive, analysis, global coverage' }
];

export const Onboarding = ({ onComplete }) => {
  const [step, setStep] = useState(1);
  const [selectedType, setSelectedType] = useState('');
  const [selectedInterests, setSelectedInterests] = useState([]);
  const [selectedDepth, setSelectedDepth] = useState('');
  const [selectedSchedule, setSelectedSchedule] = useState('');

  const progress = (step / 3) * 100;
  const interests = Object.keys(topicFeeds); // Use actual topic feeds

  const handleInterestToggle = (interest) => {
    setSelectedInterests(prev => 
      prev.includes(interest) 
        ? prev.filter(i => i !== interest)
        : [...prev, interest]
    );
  };

  const handleComplete = () => {
    const profile = {
      userType: selectedType,
      interests: selectedInterests,
      readingDepth: selectedDepth,
      schedule: selectedSchedule,
      completedAt: new Date().toISOString()
    };
    
    // Save to localStorage for immediate use
    localStorage.setItem('unveil_guest_topics', JSON.stringify(selectedInterests));
    
    onComplete(profile);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background">
      <Card className="w-full max-w-2xl bg-tile-background border-container-border shadow-2xl transition-colors">
        <CardHeader className="text-center space-y-4">
          <div className="flex items-center justify-center gap-2">
            <Sparkles className="w-8 h-8 text-container-border" />
            <h1 className="text-3xl font-bold text-tile-text">Unveil</h1>
          </div>
          <p className="text-muted-foreground">Personalize your AI-powered news experience</p>
          <Progress value={progress} className="w-full h-2" />
          <p className="text-sm text-muted-foreground">Step {step} of 3</p>
        </CardHeader>

        <CardContent className="space-y-6">
          {step === 1 && (
            <div className="space-y-6">
              <div className="text-center">
                <h2 className="text-2xl font-semibold text-tile-text mb-2">What describes you best?</h2>
                <p className="text-muted-foreground">This helps us tailor your content zones</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {userTypes.map((type) => (
                  <Card
                    key={type.id}
                    className={`cursor-pointer transition-all duration-200 hover:scale-105 border-container-border ${
                      selectedType === type.id 
                        ? 'ring-2 ring-container-border bg-button-bg' 
                        : 'bg-background hover:bg-tile-background'
                    }`}
                    onClick={() => setSelectedType(type.id)}
                  >
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-tile-text">{type.label}</h3>
                      <p className="text-sm text-muted-foreground mt-1">{type.desc}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="flex justify-end">
                <Button 
                  onClick={() => setStep(2)}
                  disabled={!selectedType}
                  className="bg-container-border hover:bg-blue-600 text-white transition-colors"
                >
                  Next <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <div className="text-center">
                <h2 className="text-2xl font-semibold text-tile-text mb-2">What interests you?</h2>
                <p className="text-muted-foreground">Select topics you'd like to follow (choose 3-8)</p>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {interests.map((interest) => (
                  <Badge
                    key={interest}
                    variant={selectedInterests.includes(interest) ? "default" : "outline"}
                    className={`cursor-pointer px-3 py-2 transition-all duration-200 hover:scale-105 ${
                      selectedInterests.includes(interest)
                        ? 'bg-container-border text-white'
                        : 'bg-button-bg text-button-text border-container-border hover:bg-tile-background'
                    }`}
                    onClick={() => handleInterestToggle(interest)}
                  >
                    {interest}
                  </Badge>
                ))}
              </div>

              <div className="flex justify-between">
                <Button 
                  variant="outline" 
                  onClick={() => setStep(1)}
                  className="bg-button-bg border-container-border text-button-text hover:bg-tile-background transition-colors"
                >
                  Back
                </Button>
                <Button 
                  onClick={() => setStep(3)}
                  disabled={selectedInterests.length < 3}
                  className="bg-container-border hover:bg-blue-600 text-white transition-colors"
                >
                  Next <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <div className="text-center">
                <h2 className="text-2xl font-semibold text-tile-text mb-2">Reading Preferences</h2>
                <p className="text-muted-foreground">How do you prefer to consume news?</p>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium text-tile-text mb-3">Reading Depth</h3>
                  <div className="space-y-2">
                    {readingDepths.map((depth) => (
                      <Card
                        key={depth.id}
                        className={`cursor-pointer transition-all duration-200 border-container-border ${
                          selectedDepth === depth.id 
                            ? 'ring-2 ring-container-border bg-button-bg' 
                            : 'bg-background hover:bg-tile-background'
                        }`}
                        onClick={() => setSelectedDepth(depth.id)}
                      >
                        <CardContent className="p-3">
                          <div className="flex justify-between items-center">
                            <div>
                              <h4 className="font-medium text-tile-text">{depth.label}</h4>
                              <p className="text-sm text-muted-foreground">{depth.desc}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-medium text-tile-text mb-3">Reading Schedule</h3>
                  <div className="space-y-2">
                    {schedules.map((schedule) => (
                      <Card
                        key={schedule.id}
                        className={`cursor-pointer transition-all duration-200 border-container-border ${
                          selectedSchedule === schedule.id 
                            ? 'ring-2 ring-container-border bg-button-bg' 
                            : 'bg-background hover:bg-tile-background'
                        }`}
                        onClick={() => setSelectedSchedule(schedule.id)}
                      >
                        <CardContent className="p-3">
                          <div className="flex justify-between items-center">
                            <div>
                              <h4 className="font-medium text-tile-text">{schedule.label}</h4>
                              <p className="text-sm text-muted-foreground">{schedule.desc}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex justify-between">
                <Button 
                  variant="outline" 
                  onClick={() => setStep(2)}
                  className="bg-button-bg border-container-border text-button-text hover:bg-tile-background transition-colors"
                >
                  Back
                </Button>
                <Button 
                  onClick={handleComplete}
                  disabled={!selectedDepth || !selectedSchedule}
                  className="bg-container-border hover:bg-blue-600 text-white transition-colors"
                >
                  Complete Setup <Sparkles className="ml-2 w-4 h-4" />
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};