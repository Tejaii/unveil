import { topicFeeds } from '@/components/constants/topicFeeds';
import { NewsCard } from './NewsCard';
import Parser from 'rss-parser'; // install with: npm i rss-parser

const parser = new Parser();

export const NewsFeed = ({ userProfile }) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load selected topics from userProfile or localStorage
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

      // Gather all RSS URLs from selected topics
      selectedTopics.forEach(topic => {
        if (topicFeeds[topic]) {
          rssUrls.push(...topicFeeds[topic]);
        }
      });

      // Pick 4–6 random URLs to avoid over-fetching
      const randomFeeds = rssUrls.sort(() => 0.5 - Math.random()).slice(0, 5);
      
      const allArticles = [];
      for (const feedUrl of randomFeeds) {
        try {
          const feed = await parser.parseURL(`/api/rss-proxy?url=${encodeURIComponent(feedUrl)}`);
          feed.items.slice(0, 3).forEach(item => {
            allArticles.push({
              title: item.title,
              summary: item.contentSnippet || item.content || '',
              url: item.link,
              date: item.pubDate,
              source: feed.title,
              image: item.enclosure?.url || '', // optional
              category: topicFeeds[feed.title] || 'General',
              sentiment: 'neutral', // default for now
            });
          });
        } catch (err) {
          console.error('Error fetching RSS feed:', feedUrl, err);
        }
      }

      // Shuffle and store
      setArticles(allArticles.sort(() => 0.5 - Math.random()));
      setLoading(false);
    };

    fetchArticles();
  }, []);

  return (
    <div className="space-y-4">
      {loading ? (
        <div className="text-center py-10 text-gray-500">Loading personalized news...</div>
      ) : (
        articles.map((article, index) => (
          <NewsCard key={index} article={article} />
        ))
      )}
    </div>
  );
};
