export async function fetchNewsFromAPI(category = "technology") {
  const API_KEY = import.meta.env.VITE_NEWS_API_KEY;

  const response = await fetch(
    `https://newsdata.io/api/1/news?apikey=${API_KEY}&category=${category}&language=en`
  );
  const data = await response.json();

  return data.results.map((item) => ({
    title: item.title,
    source: item.source_id || "Unknown",
    date: item.pubDate,
    readTime: "2 min read",
    category: item.category?.[0] || "General",
    sentiment: "neutral",
    summary: item.description,
    image: item.image_url,
    url: item.link,
  }));
}
 
