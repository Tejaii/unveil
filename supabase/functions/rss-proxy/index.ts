const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
}

interface RSSItem {
  title: string
  link: string
  pubDate: string
  creator?: string
  contentSnippet?: string
  content?: string
  enclosure?: {
    url: string
  }
}

// Simple XML parser for RSS feeds
function parseRSSFeed(xmlText: string): RSSItem[] {
  const items: RSSItem[] = []
  
  try {
    // Extract items using regex patterns (more reliable than DOM parsing for RSS)
    const itemMatches = xmlText.match(/<item[^>]*>[\s\S]*?<\/item>/gi)
    
    if (!itemMatches) {
      return items
    }

    itemMatches.forEach((itemXml) => {
      const item: RSSItem = {
        title: '',
        link: '',
        pubDate: ''
      }

      // Extract title
      const titleMatch = itemXml.match(/<title[^>]*><!\[CDATA\[(.*?)\]\]><\/title>|<title[^>]*>(.*?)<\/title>/i)
      if (titleMatch) {
        item.title = (titleMatch[1] || titleMatch[2] || '').trim()
      }

      // Extract link
      const linkMatch = itemXml.match(/<link[^>]*><!\[CDATA\[(.*?)\]\]><\/link>|<link[^>]*>(.*?)<\/link>/i)
      if (linkMatch) {
        item.link = (linkMatch[1] || linkMatch[2] || '').trim()
      }

      // Extract pubDate
      const pubDateMatch = itemXml.match(/<pubDate[^>]*>(.*?)<\/pubDate>/i)
      if (pubDateMatch) {
        item.pubDate = pubDateMatch[1].trim()
      }

      // Extract creator/author
      const creatorMatch = itemXml.match(/<dc:creator[^>]*><!\[CDATA\[(.*?)\]\]><\/dc:creator>|<dc:creator[^>]*>(.*?)<\/dc:creator>|<author[^>]*>(.*?)<\/author>/i)
      if (creatorMatch) {
        item.creator = (creatorMatch[1] || creatorMatch[2] || creatorMatch[3] || '').trim()
      }

      // Extract description/content
      const descMatch = itemXml.match(/<description[^>]*><!\[CDATA\[(.*?)\]\]><\/description>|<description[^>]*>(.*?)<\/description>/i)
      if (descMatch) {
        const desc = (descMatch[1] || descMatch[2] || '').trim()
        // Strip HTML tags for snippet
        item.contentSnippet = desc.replace(/<[^>]*>/g, '').substring(0, 200)
        item.content = desc
      }

      // Extract content:encoded if available
      const contentMatch = itemXml.match(/<content:encoded[^>]*><!\[CDATA\[(.*?)\]\]><\/content:encoded>/i)
      if (contentMatch) {
        item.content = contentMatch[1].trim()
        if (!item.contentSnippet) {
          item.contentSnippet = item.content.replace(/<[^>]*>/g, '').substring(0, 200)
        }
      }

      // Extract enclosure
      const enclosureMatch = itemXml.match(/<enclosure[^>]*url=["']([^"']*)["'][^>]*>/i)
      if (enclosureMatch) {
        item.enclosure = { url: enclosureMatch[1] }
      }

      // Only add items with at least title and link
      if (item.title && item.link) {
        items.push(item)
      }
    })

  } catch (error) {
    console.error('Error parsing RSS feed:', error)
  }

  return items
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    })
  }

  try {
    const url = new URL(req.url)
    const feedUrl = url.searchParams.get('url')

    if (!feedUrl) {
      return new Response(
        JSON.stringify({ error: 'Missing RSS feed URL' }),
        {
          status: 400,
          headers: {
            'Content-Type': 'application/json',
            ...corsHeaders,
          },
        }
      )
    }

    console.log(`Fetching RSS feed: ${feedUrl}`)

    // Fetch the RSS feed with proper headers
    const response = await fetch(feedUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; RSS-Proxy/1.0)',
        'Accept': 'application/rss+xml, application/xml, text/xml, */*',
      }
    })

    if (!response.ok) {
      console.error(`Failed to fetch RSS feed: ${response.status} ${response.statusText}`)
      throw new Error(`Failed to fetch RSS feed: ${response.status}`)
    }

    const xmlText = await response.text()
    console.log(`Fetched ${xmlText.length} characters of XML`)

    // Parse the RSS feed
    const items = parseRSSFeed(xmlText)
    console.log(`Parsed ${items.length} items from RSS feed`)

    return new Response(
      JSON.stringify(items),
      {
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders,
        },
      }
    )

  } catch (error) {
    console.error('RSS proxy error:', error)
    return new Response(
      JSON.stringify({ 
        error: 'Failed to parse RSS feed',
        details: error.message 
      }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders,
        },
      }
    )
  }
})