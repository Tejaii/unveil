
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ArrowRight, Sparkles } from 'lucide-react';

const interests = [
  'AI & Machine Learning', 'Technology', 'Finance', 'Sports', 'Politics',
  'Science', 'Health', 'Entertainment', 'Business', 'World News',
  'Climate', 'Education', 'Culture', 'Gaming', 'Startups'
];

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
    onComplete(profile);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-gray-50/80 to-gray-100/80 backdrop-blur-sm">
      <Card className="w-full max-w-2xl bg-white/70 backdrop-blur-lg border-gray-200/50 shadow-2xl">
        <CardHeader className="text-center space-y-4">
          <div className="flex items-center justify-center gap-2">
            <Sparkles className="w-8 h-8 text-gray-700" />
            <h1 className="text-3xl font-bold text-gray-900">Unveil</h1>
          </div>
          <p className="text-gray-600">Personalize your AI-powered news experience</p>
          <Progress value={progress} className="w-full h-2" />
          <p className="text-sm text-gray-500">Step {step} of 3</p>
        </CardHeader>

        <CardContent className="space-y-6">
          {step === 1 && (
            <div className="space-y-6">
              <div className="text-center">
                <h2 className="text-2xl font-semibold text-gray-900 mb-2">What describes you best?</h2>
                <p className="text-gray-600">This helps us tailor your content zones</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {userTypes.map((type) => (
                  <Card
                    key={type.id}
                    className={`cursor-pointer transition-all duration-200 hover:scale-105 ${
                      selectedType === type.id 
                        ? 'ring-2 ring-gray-400 bg-gray-50/80' 
                        : 'bg-white/50 hover:bg-gray-50/60'
                    }`}
                    onClick={() => setSelectedType(type.id)}
                  >
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-gray-900">{type.label}</h3>
                      <p className="text-sm text-gray-600 mt-1">{type.desc}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="flex justify-end">
                <Button 
                  onClick={() => setStep(2)}
                  disabled={!selectedType}
                  className="bg-gray-900 hover:bg-gray-800 text-white"
                >
                  Next <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <div className="text-center">
                <h2 className="text-2xl font-semibold text-gray-900 mb-2">What interests you?</h2>
                <p className="text-gray-600">Select topics you'd like to follow (choose 3-8)</p>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {interests.map((interest) => (
                  <Badge
                    key={interest}
                    variant={selectedInterests.includes(interest) ? "default" : "outline"}
                    className={`cursor-pointer px-3 py-2 transition-all duration-200 hover:scale-105 ${
                      selectedInterests.includes(interest)
                        ? 'bg-gray-900 text-white'
                        : 'bg-white/70 text-gray-700 hover:bg-gray-100/80'
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
                  className="bg-white/70 border-gray-300"
                >
                  Back
                </Button>
                <Button 
                  onClick={() => setStep(3)}
                  disabled={selectedInterests.length < 3}
                  className="bg-gray-900 hover:bg-gray-800 text-white"
                >
                  Next <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <div className="text-center">
                <h2 className="text-2xl font-semibold text-gray-900 mb-2">Reading Preferences</h2>
                <p className="text-gray-600">How do you prefer to consume news?</p>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium text-gray-900 mb-3">Reading Depth</h3>
                  <div className="space-y-2">
                    {readingDepths.map((depth) => (
                      <Card
                        key={depth.id}
                        className={`cursor-pointer transition-all duration-200 ${
                          selectedDepth === depth.id 
                            ? 'ring-2 ring-gray-400 bg-gray-50/80' 
                            : 'bg-white/50 hover:bg-gray-50/60'
                        }`}
                        onClick={() => setSelectedDepth(depth.id)}
                      >
                        <CardContent className="p-3">
                          <div className="flex justify-between items-center">
                            <div>
                              <h4 className="font-medium text-gray-900">{depth.label}</h4>
                              <p className="text-sm text-gray-600">{depth.desc}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-medium text-gray-900 mb-3">Reading Schedule</h3>
                  <div className="space-y-2">
                    {schedules.map((schedule) => (
                      <Card
                        key={schedule.id}
                        className={`cursor-pointer transition-all duration-200 ${
                          selectedSchedule === schedule.id 
                            ? 'ring-2 ring-gray-400 bg-gray-50/80' 
                            : 'bg-white/50 hover:bg-gray-50/60'
                        }`}
                        onClick={() => setSelectedSchedule(schedule.id)}
                      >
                        <CardContent className="p-3">
                          <div className="flex justify-between items-center">
                            <div>
                              <h4 className="font-medium text-gray-900">{schedule.label}</h4>
                              <p className="text-sm text-gray-600">{schedule.desc}</p>
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
                  className="bg-white/70 border-gray-300"
                >
                  Back
                </Button>
                <Button 
                  onClick={handleComplete}
                  disabled={!selectedDepth || !selectedSchedule}
                  className="bg-gray-900 hover:bg-gray-800 text-white"
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
