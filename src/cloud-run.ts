
import './config'

import { createServer } from 'node:http'
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import { StreamableHTTPServerTransport } from '@modelcontextprotocol/sdk/server/streamableHttp.js'

import registerTools from './tools'

const port = Number(process.env.PORT || 8080)

const server = createServer(async (req, res) => {
  if (req.url === '/health' && req.method === 'GET') {
    res.writeHead(200, {
      'Content-Type': 'application/json',
    })
    res.end(JSON.stringify({ status: 'ok' }))
    return
  }

  if (req.url !== '/mcp' || req.method !== 'POST') {
    res.writeHead(404)
    res.end('Not Found')
    return
  }

  const mcp = new McpServer({
    name: 'orange-networkapi-mcp',
    version: '1.0.0',
  })

  const transport = new StreamableHTTPServerTransport({
    sessionIdGenerator: undefined,
  })

  try {
    registerTools(mcp)
    await mcp.connect(transport)
    await transport.handleRequest(req, res)
  } catch (error) {
    console.error('MCP request error:', error)

    if (!res.headersSent) {
      res.writeHead(500)
      res.end('Internal Server Error')
    }
  } finally {
    await transport.close()
    await mcp.close()
  }
})

server.listen(port, '0.0.0.0', () => {
  console.log(`Orange MCP HTTP server listening on ${port}`)
})
