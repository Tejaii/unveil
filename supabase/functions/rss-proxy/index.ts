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
    // Validate that we have XML content
    if (!xmlText || typeof xmlText !== 'string') {
      throw new Error('Invalid XML content: empty or non-string input')
    }

    // Check if it's actually XML/RSS
    if (!xmlText.includes('<rss') && !xmlText.includes('<feed')) {
      throw new Error('Content does not appear to be RSS/XML format')
    }
    
    // Extract items using regex patterns (more reliable than DOM parsing for RSS)
    const itemMatches = xmlText.match(/<item[^>]*>[\s\S]*?<\/item>/gi)
    
    if (!itemMatches || itemMatches.length === 0) {
      console.log('No RSS items found in feed')
      return items
    }

    console.log(`Found ${itemMatches.length} potential RSS items`)

    itemMatches.forEach((itemXml, index) => {
      try {
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
        } else {
          console.log(`Skipping item ${index + 1}: missing title or link`)
        }
      } catch (itemError) {
        console.error(`Error parsing RSS item ${index + 1}:`, itemError)
        // Continue processing other items
      }
    })

  } catch (error) {
    console.error('Error parsing RSS feed:', error)
    throw error // Re-throw to be handled by caller
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

    // Fetch the RSS feed with proper headers and timeout
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 10000) // 10 second timeout

    let response: Response
    try {
      response = await fetch(feedUrl, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (compatible; RSS-Proxy/1.0)',
          'Accept': 'application/rss+xml, application/xml, text/xml, */*',
        },
        signal: controller.signal
      })
    } catch (fetchError) {
      clearTimeout(timeoutId)
      const errorMessage = fetchError instanceof Error ? fetchError.message : 'Unknown fetch error'
      console.error(`Network error fetching RSS feed: ${errorMessage}`)
      throw new Error(`Network error: ${errorMessage}`)
    }

    clearTimeout(timeoutId)

    if (!response.ok) {
      const errorMessage = `HTTP ${response.status} ${response.statusText}`
      console.error(`Failed to fetch RSS feed: ${errorMessage}`)
      throw new Error(`Failed to fetch RSS feed: ${errorMessage}`)
    }

    const contentType = response.headers.get('content-type') || ''
    console.log(`Response content-type: ${contentType}`)

    let xmlText: string
    try {
      xmlText = await response.text()
    } catch (textError) {
      const errorMessage = textError instanceof Error ? textError.message : 'Unknown text parsing error'
      console.error(`Error reading response text: ${errorMessage}`)
      throw new Error(`Error reading response: ${errorMessage}`)
    }

    console.log(`Fetched ${xmlText.length} characters of content`)

    if (xmlText.length === 0) {
      throw new Error('Empty response from RSS feed')
    }

    // Parse the RSS feed
    let items: RSSItem[]
    try {
      items = parseRSSFeed(xmlText)
    } catch (parseError) {
      const errorMessage = parseError instanceof Error ? parseError.message : 'Unknown parsing error'
      console.error(`RSS parsing error: ${errorMessage}`)
      throw new Error(`RSS parsing failed: ${errorMessage}`)
    }

    console.log(`Successfully parsed ${items.length} items from RSS feed`)

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
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred'
    const errorStack = error instanceof Error ? error.stack : undefined
    
    console.error('RSS proxy error:', {
      message: errorMessage,
      stack: errorStack,
      error: error
    })
    
    return new Response(
      JSON.stringify({ 
        error: 'Failed to parse RSS feed',
        details: errorMessage,
        timestamp: new Date().toISOString()
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