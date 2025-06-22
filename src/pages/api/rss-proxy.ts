// /src/pages/api/rss-proxy.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import Parser from 'rss-parser';

const parser = new Parser();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const feedUrl = req.query.url as string;

  if (!feedUrl) {
    return res.status(400).json({ error: 'Missing RSS feed URL' });
  }

  try {
    const feed = await parser.parseURL(feedUrl);
    res.status(200).json(feed);
  } catch (error) {
    console.error('Failed to parse RSS:', error);
    res.status(500).json({ error: 'Failed to parse RSS feed' });
  }
}
