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
    <div className="min-h-screen flex items-center justify-center p-8 bg-lilac-mist">
      <Card className="w-full max-w-3xl card-floating">
        <CardHeader className="text-center space-y-8 pb-10">
          <div className="flex items-center justify-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-bright-periwinkle to-deep-blue-violet flex items-center justify-center shadow-floating">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-deep-blue-violet">Unveil</h1>
          </div>
          <p className="text-dusty-blue-grey text-xl">Personalize your AI-powered news experience</p>
          <div className="space-y-3">
            <Progress value={progress} className="w-full h-3 bg-active-pill" />
            <p className="text-dusty-blue-grey">Step {step} of 3</p>
          </div>
        </CardHeader>

        <CardContent className="space-y-10 pb-10">
          {step === 1 && (
            <div className="space-y-10">
              <div className="text-center">
                <h2 className="text-3xl font-bold text-deep-blue-violet mb-4">What describes you best?</h2>
                <p className="text-dusty-blue-grey text-lg">This helps us tailor your content zones</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {userTypes.map((type) => (
                  <Card
                    key={type.id}
                    className={`cursor-pointer transition-all duration-200 hover:shadow-floating-hover ${
                      selectedType === type.id 
                        ? 'shadow-floating-lg bg-active-pill ring-2 ring-bright-periwinkle' 
                        : 'card-floating hover:bg-active-pill'
                    }`}
                    onClick={() => setSelectedType(type.id)}
                  >
                    <CardContent className="p-8">
                      <h3 className="font-bold text-deep-blue-violet mb-3 text-lg">{type.label}</h3>
                      <p className="text-dusty-blue-grey leading-relaxed">{type.desc}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="flex justify-end">
                <Button 
                  onClick={() => setStep(2)}
                  disabled={!selectedType}
                  className="btn-primary"
                >
                  Next <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-10">
              <div className="text-center">
                <h2 className="text-3xl font-bold text-deep-blue-violet mb-4">What interests you?</h2>
                <p className="text-dusty-blue-grey text-lg">Select topics you'd like to follow (choose 3-8)</p>
              </div>
              
              <div className="flex flex-wrap gap-4">
                {interests.map((interest) => (
                  <Badge
                    key={interest}
                    className={`cursor-pointer px-6 py-4 rounded-full transition-all duration-200 hover:shadow-floating text-base font-medium ${
                      selectedInterests.includes(interest)
                        ? 'bg-bright-periwinkle text-white shadow-floating'
                        : 'bg-active-pill text-deep-blue-violet hover:bg-bright-periwinkle hover:text-white'
                    }`}
                    onClick={() => handleInterestToggle(interest)}
                  >
                    {interest}
                  </Badge>
                ))}
              </div>

              <div className="flex justify-between">
                <Button 
                  variant="ghost" 
                  onClick={() => setStep(1)}
                  className="text-dusty-blue-grey hover:bg-active-pill rounded-2xl px-8"
                >
                  Back
                </Button>
                <Button 
                  onClick={() => setStep(3)}
                  disabled={selectedInterests.length < 3}
                  className="btn-primary"
                >
                  Next <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-10">
              <div className="text-center">
                <h2 className="text-3xl font-bold text-deep-blue-violet mb-4">Reading Preferences</h2>
                <p className="text-dusty-blue-grey text-lg">How do you prefer to consume news?</p>
              </div>
              
              <div className="space-y-8">
                <div>
                  <h3 className="font-semibold text-deep-blue-violet mb-6 text-xl">Reading Depth</h3>
                  <div className="space-y-4">
                    {readingDepths.map((depth) => (
                      <Card
                        key={depth.id}
                        className={`cursor-pointer transition-all duration-200 ${
                          selectedDepth === depth.id 
                            ? 'shadow-floating-lg bg-active-pill ring-2 ring-bright-periwinkle' 
                            : 'card-floating hover:bg-active-pill hover:shadow-floating-hover'
                        }`}
                        onClick={() => setSelectedDepth(depth.id)}
                      >
                        <CardContent className="p-6">
                          <h4 className="font-semibold text-deep-blue-violet mb-2 text-lg">{depth.label}</h4>
                          <p className="text-dusty-blue-grey">{depth.desc}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-deep-blue-violet mb-6 text-xl">Reading Schedule</h3>
                  <div className="space-y-4">
                    {schedules.map((schedule) => (
                      <Card
                        key={schedule.id}
                        className={`cursor-pointer transition-all duration-200 ${
                          selectedSchedule === schedule.id 
                            ? 'shadow-floating-lg bg-active-pill ring-2 ring-bright-periwinkle' 
                            : 'card-floating hover:bg-active-pill hover:shadow-floating-hover'
                        }`}
                        onClick={() => setSelectedSchedule(schedule.id)}
                      >
                        <CardContent className="p-6">
                          <h4 className="font-semibold text-deep-blue-violet mb-2 text-lg">{schedule.label}</h4>
                          <p className="text-dusty-blue-grey">{schedule.desc}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex justify-between">
                <Button 
                  variant="ghost" 
                  onClick={() => setStep(2)}
                  className="text-dusty-blue-grey hover:bg-active-pill rounded-2xl px-8"
                >
                  Back
                </Button>
                <Button 
                  onClick={handleComplete}
                  disabled={!selectedDepth || !selectedSchedule}
                  className="btn-primary"
                >
                  Complete Setup <Sparkles className="ml-2 w-5 h-5" />
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};