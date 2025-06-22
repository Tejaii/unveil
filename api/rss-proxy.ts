// File: /api/rss-proxy.ts
import type { VercelRequest, VercelResponse } from '@vercel/node';
import fetch from 'node-fetch';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const feedUrl = req.query.url as string;

  if (!feedUrl) {
    return res.status(400).json({ error: 'Missing URL parameter' });
  }

  try {
    const response = await fetch(feedUrl);
    const xml = await response.text();

    res.setHeader('Content-Type', 'application/xml');
    return res.status(200).send(xml);
  } catch (err) {
    return res.status(500).json({ error: 'Failed to fetch RSS feed' });
  }
}
