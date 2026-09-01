// @i-know-the-amp-plugin-api-is-wip-and-very-experimental-right-now
import type { PluginAPI } from '@ampcode/plugin'

export const description = 'Shows remaining Amp usage in the status bar'

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
      return amp.experimental?.createStatusItem({ text: 'Usage: loading...' })
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

      const plainOutput = output.replaceAll('**', '')

      // 新订阅格式: "Amp Megawatt Subscription: agent usage $19.59 of $20 remaining (98%), orb usage ... (100%)"
      // 旧订阅格式: "Amp Megawatt Subscription: 95% other usage and 100% orb usage remaining"
      // 免费格式: "Amp Free: 57% remaining today (resets daily) - https://..."
      // 旧格式: "Amp Free: $0.57/$1.00 remaining"
      const subscriptionMatch = plainOutput.match(/Amp\s+(.+?)\s+Subscription:/i)
      const subscriptionUsageMatch = plainOutput.match(
        /agent usage[^\r\n]*?\((\d+)%\),?\s*orb usage[^\r\n]*?\((\d+)%\)/i,
      )
      const legacySubscriptionUsageMatch = plainOutput.match(
        /(\d+)%\s*other usage\s+and\s+(\d+)%\s*orb usage\s+remaining/i,
      )
      const freePercentMatch = plainOutput.match(/Amp Free:\s*(\d+)%\s*remaining\s*today/)
      const freeAmountMatch = !freePercentMatch
        ? plainOutput.match(/Amp Free:\s*\$([\d.]+)\/\$([\d.]+)\s*remaining/)
        : null
      const paidMatch = plainOutput.match(/Individual credits:\s*(-?)\$([\d.]+)\s*remaining/)

      const parts: string[] = []
      const subscriptionUsage = subscriptionUsageMatch || legacySubscriptionUsageMatch
      if (subscriptionMatch && subscriptionUsage) {
        parts.push(subscriptionMatch[1])
        parts.push(`Agent: ${subscriptionUsage[1]}%`)
        parts.push(`Orb: ${subscriptionUsage[2]}%`)
      } else if (freePercentMatch) {
        parts.push(`Free: ${freePercentMatch[1]}%`)
      } else if (freeAmountMatch) {
        parts.push(`Free: $${freeAmountMatch[1]}/$${freeAmountMatch[2].replace(/\.00$/, '')}`)
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
