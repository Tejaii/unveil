import React, { useState, useContext } from 'react';
import { supabase } from '../lib/supabase';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../components/auth/AuthProvider'; // Assuming AuthProvider provides user session
import { topicFeeds } from '../constants/topicFeeds'; // Import topicFeeds

const Onboarding: React.FC = () => {
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const navigate = useNavigate();
  const { user } = useContext(AuthContext); // Get user from AuthContext

  const handleTopicSelect = (topic: string) => {
    setSelectedTopics(prev =>
      prev.includes(topic) ? prev.filter(t => t !== topic) : [...prev, topic]
    );
  };

  const handleSavePreferences = async () => {
    if (user) {
      // Save to Supabase for logged-in users
      const { error } = await supabase
        .from('user_profiles')
        .upsert(
          { user_id: user.id, topics: selectedTopics },
          { onConflict: 'user_id' }
        );

      if (error) {
        console.error('Error saving preferences to Supabase:', error);
        // Handle error (e.g., show a toast notification)
      } else {
        console.log('Preferences saved to Supabase');
      }
    } else {
      // Save to localStorage for guest users
      localStorage.setItem('unveil_guest_topics', JSON.stringify(selectedTopics));
      console.log('Preferences saved to localStorage');
    }

    // Navigate to the main app page
    navigate('/');
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Choose Your Interests (3-8)</h1>
      <div className="flex flex-wrap gap-2 mb-4">
        {Object.keys(topicFeeds).map(topic => (
          <button
            key={topic}
            className={`px-4 py-2 rounded ${
              selectedTopics.includes(topic)
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-800'
            }`}
            onClick={() => handleTopicSelect(topic)}
          >
            {topic}
          </button>
        ))}
      </div>
      <button
        className="bg-green-500 text-white px-6 py-3 rounded disabled:opacity-50"
        disabled={selectedTopics.length < 3 || selectedTopics.length > 8}
        onClick={handleSavePreferences}
      >
        Save Preferences and Continue
      </button>
    </div>
  );
};

export default Onboarding;