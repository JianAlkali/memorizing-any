const http = require('http')
const fs = require('fs')
const path = require('path')
const { exec } = require('child_process')

const root = __dirname
const preferredPort = Number(process.env.PORT || 8765)

const mime = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.txt': 'text/plain; charset=utf-8',
}

function openBrowser(url) {
  const command = process.platform === 'win32' ? `start "" "${url}"` : process.platform === 'darwin' ? `open "${url}"` : `xdg-open "${url}"`
  exec(command)
}

function makeServer() {
  return http.createServer((req, res) => {
    try {
      const requestUrl = new URL(req.url || '/', 'http://127.0.0.1')
      let pathname = decodeURIComponent(requestUrl.pathname)
      if (pathname === '/') pathname = '/index.html'
      let filePath = path.resolve(root, `.${pathname}`)
      if (!filePath.startsWith(root)) filePath = path.join(root, 'index.html')
      if (!fs.existsSync(filePath) || !fs.statSync(filePath).isFile()) filePath = path.join(root, 'index.html')
      const ext = path.extname(filePath).toLowerCase()
      res.writeHead(200, {
        'Content-Type': mime[ext] || 'application/octet-stream',
        'Cache-Control': 'no-cache',
      })
      fs.createReadStream(filePath).pipe(res)
    } catch (error) {
      res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' })
      res.end('Server Error')
    }
  })
}

function listen(port) {
  const server = makeServer()
  server.on('error', (error) => {
    if (error.code === 'EADDRINUSE' && port === preferredPort) listen(8766)
    else {
      console.error(error)
      process.exit(1)
    }
  })
  server.listen(port, '127.0.0.1', () => {
    const url = `http://127.0.0.1:${port}/`
    console.log(`Zizhuj started: ${url}`)
    console.log('Close this window to stop the local server.')
    openBrowser(url)
  })
}

listen(preferredPort)
