// @i-know-the-amp-plugin-api-is-wip-and-very-experimental-right-now
import type { PluginAPI } from '@ampcode/plugin'

let ampPath: string | null = null

async function initAmpPath() {
  const env = { ...process.env }
  delete env.BUN_BE_BUN
  
  const which = Bun.spawn(['which', 'amp'], { stdout: 'pipe', env })
  ampPath = (await new Response(which.stdout).text()).trim() || null
  await which.exited
}

await initAmpPath()

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
        parts.push(`Individual: ${paidMatch[1]}$${paidMatch[2]}`)
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

  void refreshUsage()

  amp.on('agent.end', async (_event, ctx) => {
    await refreshUsage((text) => ctx.ui.notify(text))
  })
}
