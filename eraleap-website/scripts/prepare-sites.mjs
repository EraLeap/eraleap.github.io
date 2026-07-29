import { mkdir, writeFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const serverDirectory = resolve(projectRoot, 'dist', 'server')
const workerPath = resolve(serverDirectory, 'index.js')

/*
 * Sites deploys a Cloudflare Worker alongside Vite's static assets. The worker
 * serves normal asset requests directly and falls back to index.html for Vue's
 * client-side routes, so future pages can be added without server-side 404s.
 */
const workerSource = `export default {
  async fetch(request, env) {
    const response = await env.ASSETS.fetch(request)

    if (response.status !== 404 || request.method !== 'GET') {
      return response
    }

    const fallbackUrl = new URL('/index.html', request.url)
    return env.ASSETS.fetch(new Request(fallbackUrl, request))
  },
}
`

await mkdir(serverDirectory, { recursive: true })
await writeFile(workerPath, workerSource, 'utf8')
