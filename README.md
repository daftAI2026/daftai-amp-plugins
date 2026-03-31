# daftAI-Amp-plugins

English | [中文](./README.zh.md)

Amp plugins shared by daftAI for enhancing the [Amp](https://ampcode.com) CLI experience.

> ⚠️ The Amp Plugin API is experimental and may have breaking changes. See [Plugin API docs](https://ampcode.com/manual/plugin-api).

## Prerequisites

- [Amp CLI](https://ampcode.com) installed via binary method (not npm)
- `amp` binary available in your `PATH`

**Limitations:**

- Plugins only work in the **Amp CLI**, not the editor extension
- Plugins only work with binary-installed Amp, not `npm install`


## Installation

### Option 1: Manual Install

```bash
# 1. Clone the repo
git clone https://github.com/daftAI2026/daftai-amp-plugins.git
cd daftai-amp-plugins

# 2. Copy plugin to Amp plugins directory

# Global (all projects)
mkdir -p ~/.config/amp/plugins
cp plugins/daftai-usage-monitor/usage-monitor.ts ~/.config/amp/plugins/

# Or project-level (in your project root)
mkdir -p /path/to/your/project/.amp/plugins
cp plugins/daftai-usage-monitor/usage-monitor.ts /path/to/your/project/.amp/plugins/

# 3. Run Amp with plugins enabled
PLUGINS=all amp
```

### Option 2: Ask the Agent

Simply tell Amp:

> Please install plugins from github.com/daftAI2026/daftai-amp-plugins

## Getting Started

1. Start Amp with plugins enabled:
   ```bash
   PLUGINS=all amp
   ```
2. Send any prompt — installed plugins will activate automatically.
3. To reload plugins after changes, press `Ctrl-o` and select `plugins: reload`.


## Available Plugins

| Plugin | Description |
|--------|-------------|
| [usage-monitor](plugins/daftai-usage-monitor/usage-monitor.ts) | Displays Amp usage balance (free credits & paid balance) as a notification after each agent turn |

### usage-monitor

Shows a notification after each agent turn:

```
Usage: Free: $6.12/$10.00 · Balance: $0.79
```

![usage-monitor notification](./Screenshots/usage-monitor/notification.webp)


## Project Structure

```
daftAI-amp/
├── README.md
├── README.zh.md
├── CHANGELOG.md
├── CHANGELOG.zh.md
├── LICENSE
├── .gitignore
└── plugins/
    └── daftai-usage-monitor/
        └── usage-monitor.ts
```

## Contributing

Feel free to submit issues and pull requests.

## License

MIT License
