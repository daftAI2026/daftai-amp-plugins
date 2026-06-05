// @i-know-the-amp-plugin-api-is-wip-and-very-experimental-right-now
import type { PluginAPI } from '@ampcode/plugin'

let ampPath: string | null = null
let ampPathInit: Promise<void> | null = null

async function initAmpPath() {
  const env = { ...process.env }
  delete env.BUN_BE_BUN

  const finder = process.platform === 'win32' ? ['where.exe', 'amp'] : ['which', 'amp']
  const proc = Bun.spawn(finder, { stdout: 'pipe', stderr: 'pipe', env })
  const output = await new Response(proc.stdout).text()
  await proc.exited

  ampPath = output.split(/\r?\n/).map((line) => line.trim()).find(Boolean) || null
}

function ensureAmpPath() {
  ampPathInit ??= initAmpPath()
  return ampPathInit
}

export default function (amp: PluginAPI) {
  let usageStatus: { update(value: { text: string }): void } | undefined

  function getUsageStatus() {
    if (usageStatus) return usageStatus

    try {
      if (amp.system.executor.kind === 'unknown') return undefined
      usageStatus = amp.experimental?.createStatusItem({ text: 'Amp Free: loading...' })
    } catch {
      return undefined
    }

    return usageStatus
  }

  async function refreshUsage(notify?: (text: string) => Promise<void>) {
    try {
      await ensureAmpPath()
      if (!ampPath) return

      const env = { ...process.env }
      delete env.BUN_BE_BUN

      const proc = Bun.spawn([ampPath, 'usage'], {
        stdout: 'pipe',
        stderr: 'pipe',
        env,
      })
      const output = await new Response(proc.stdout).text()
      await proc.exited

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
        const status = getUsageStatus()

        if (status) {
          status.update({ text })
        } else if (notify) {
          await notify(text)
        }
      }
    } catch {
      // silently ignore
    }
  }

  amp.on('session.start', async () => {
    await refreshUsage()
  })

  amp.on('agent.end', async (_event, ctx) => {
    await refreshUsage((text) => ctx.ui.notify(text))
  })
}
