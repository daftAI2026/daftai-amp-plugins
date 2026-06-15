// @i-know-the-amp-plugin-api-is-wip-and-very-experimental-right-now
import type { PluginAPI } from '@ampcode/plugin'

let ampPath: string | null = null
let ampPathInit: Promise<string | null> | null = null

async function initAmpPath() {
  const env = { ...process.env }
  delete env.BUN_BE_BUN
  
  const finder = process.platform === 'win32' ? ['where.exe', 'amp'] : ['which', 'amp']
  const which = Bun.spawn(finder, { stdout: 'pipe', stderr: 'ignore', env })
  const output = await new Response(which.stdout).text()
  const exitCode = await which.exited

  if (exitCode !== 0) {
    return null
  }

  ampPath = output.split(/\r?\n/).map((line) => line.trim()).find(Boolean) || null
  return ampPath
}

function ensureAmpPath() {
  if (ampPath) return Promise.resolve(ampPath)
  ampPathInit ??= initAmpPath().finally(() => {
    ampPathInit = null
  })
  return ampPathInit
}

export default function (amp: PluginAPI) {
  const usageStatus = (() => {
    try {
      if (amp.system.executor.kind === 'unknown') return undefined
      return amp.experimental?.createStatusItem({ text: 'Amp Free: loading...' })
    } catch {
      return undefined
    }
  })()

  async function refreshUsage(notify?: (text: string) => Promise<void>) {
    try {
      if (!ampPath) {
        ampPath = await ensureAmpPath()
      }
      if (!ampPath) return

      const env = { ...process.env }
      delete env.BUN_BE_BUN
      env.PLUGINS = 'none'

      const proc = Bun.spawn([ampPath, 'usage'], {
        stdout: 'pipe',
        stderr: 'ignore',
        env,
      })
      const output = await new Response(proc.stdout).text()
      const exitCode = await proc.exited

      if (exitCode !== 0) {
        return
      }

      const freeMatch = output.match(/Amp Free:\s*\$([\d.]+)\/\$([\d.]+)\s*remaining/)
      const paidMatch = output.match(/Individual credits:\s*(-?)\$([\d.]+)\s*remaining/)

      const parts: string[] = []
      if (freeMatch) {
        parts.push(`Amp Free: $${freeMatch[1]}/$${freeMatch[2].replace(/\.00$/, '')}`)
      }
      if (paidMatch) {
        parts.push(`Credits: ${paidMatch[1]}$${paidMatch[2]}`)
      }

      if (parts.length > 0) {
        const text = parts.join(' · ')

        if (usageStatus) {
          usageStatus.update({ text })
        } else if (notify) {
          await notify(text)
        }
      }
    } catch {
      // silently ignore
    }
  }

  amp.on('agent.end', async (_event, ctx) => {
    await refreshUsage((text) => ctx.ui.notify(text))
  })

  setTimeout(() => void refreshUsage(), 0)
}
