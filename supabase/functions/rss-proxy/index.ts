import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

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

serve(async (req: Request) => {
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

    // Fetch the RSS feed
    const response = await fetch(feedUrl)
    if (!response.ok) {
      throw new Error(`Failed to fetch RSS feed: ${response.status}`)
    }

    const xmlText = await response.text()
    
    // Parse XML using DOMParser
    const parser = new DOMParser()
    const xmlDoc = parser.parseFromString(xmlText, "application/xml")

    // Check for parsing errors
    const parserError = xmlDoc.querySelector("parsererror")
    if (parserError) {
      throw new Error("Failed to parse XML")
    }

    // Extract items from RSS feed
    const items: RSSItem[] = []
    const rssItems = xmlDoc.querySelectorAll("item")

    rssItems.forEach((item) => {
      const title = item.querySelector("title")?.textContent || ""
      const link = item.querySelector("link")?.textContent || ""
      const pubDate = item.querySelector("pubDate")?.textContent || ""
      const creator = item.querySelector("creator")?.textContent || 
                     item.querySelector("author")?.textContent || ""
      const description = item.querySelector("description")?.textContent || ""
      const content = item.querySelector("content\\:encoded")?.textContent || 
                     item.querySelector("content")?.textContent || ""
      
      // Extract enclosure URL if present
      const enclosure = item.querySelector("enclosure")
      const enclosureUrl = enclosure?.getAttribute("url") || ""

      items.push({
        title,
        link,
        pubDate,
        creator,
        contentSnippet: description,
        content: content || description,
        ...(enclosureUrl && { enclosure: { url: enclosureUrl } })
      })
    })

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
      JSON.stringify({ error: 'Failed to parse RSS feed' }),
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