import React, { useEffect, useState } from 'react';
import { topicFeeds } from '@/components/constants/topicFeeds';
import { NewsCard } from './NewsCard';
import Parser from 'rss-parser'; // npm install rss-parser

const parser = new Parser();

export const NewsFeed = ({ userProfile }) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  // Get selected topics either from userProfile or localStorage for guests
  const getSelectedTopics = () => {
    if (userProfile?.topics?.length) return userProfile.topics;

    const guestTopics = localStorage.getItem('unveil_guest_topics');
    return guestTopics ? JSON.parse(guestTopics) : [];
  };

  useEffect(() => {
    const fetchArticles = async () => {
      setLoading(true);
      const selectedTopics = getSelectedTopics();
      let rssUrls = [];

      // Collect RSS feed URLs for selected topics from topicFeeds
      selectedTopics.forEach(topic => {
        if (topicFeeds[topic]) {
          rssUrls.push(...topicFeeds[topic]);
        }
      });

      // Randomize and limit to 5 feeds
      const randomFeeds = rssUrls.sort(() => 0.5 - Math.random()).slice(0, 5);

      const allArticles = [];

      for (const feedUrl of randomFeeds) {
        try {
          // Fetch through your backend proxy endpoint
          const feed = await parser.parseURL(`/api/rss-proxy?url=${encodeURIComponent(feedUrl)}`);

          feed.items.slice(0, 3).forEach(item => {
            allArticles.push({
              title: item.title,
              summary: item.contentSnippet || item.content || '',
              url: item.link,
              date: item.pubDate,
              source: feed.title,
              image: item.enclosure?.url || '',
              category: selectedTopics.find(topic =>
                topicFeeds[topic]?.includes(feedUrl)
              ) || 'General',
              sentiment: 'neutral',
            });
          });
        } catch (err) {
          console.error('Error fetching RSS feed:', feedUrl, err);
        }
      }

      setArticles(allArticles.sort(() => 0.5 - Math.random()));
      setLoading(false);
    };

    fetchArticles();
  }, [userProfile]);

  return (
    <div className="space-y-4">
      {loading ? (
        <div className="text-center py-10 text-gray-500">
          Loading personalized news...
        </div>
      ) : articles.length ? (
        articles.map((article, index) => (
          <NewsCard key={index} article={article} />
        ))
      ) : (
        <div className="text-center py-10 text-gray-400">
          No articles found for your selected topics.
        </div>
      )}
    </div>
  );
};
