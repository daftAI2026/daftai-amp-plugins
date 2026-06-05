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

# 2. Copy plugin to an Amp plugin directory

# System plugin on macOS/Linux (all projects)
mkdir -p ~/.config/amp/plugins
cp plugins/daftai-usage-monitor/usage-monitor.ts ~/.config/amp/plugins/

# Project plugin (run from your project root)
mkdir -p /path/to/your/project/.amp/plugins
cp plugins/daftai-usage-monitor/usage-monitor.ts /path/to/your/project/.amp/plugins/
```

Windows system plugins live in `%USERPROFILE%\.config\amp\plugins\*.ts`.
Project plugins live in `.amp/plugins/*.ts`.

### Option 2: Ask the Agent

Simply tell Amp:

> Please install plugins from github.com/daftAI2026/daftai-amp-plugins

## Getting Started

1. Start Amp:
   ```bash
   amp
   ```
2. Send any prompt — installed plugins will activate automatically.
3. To inspect plugins, press `Ctrl-o` and select `plugins: list`.
4. To reload plugins after changes, press `Ctrl-o` and select `plugins: reload`.


## Available Plugins

| Plugin | Description |
|--------|-------------|
| [usage-monitor](plugins/daftai-usage-monitor/usage-monitor.ts) | Displays your Amp free credits and paid balance automatically, then refreshes after every agent turn.|

### usage-monitor

When an Amp thread session starts, your usage appears automatically and keeps refreshing after every agent turn.

Track your free credits & paid balance in one glance.

https://github.com/user-attachments/assets/74b5bba6-57a3-4a3d-ad23-2b194b356b6e


## Project Structure

```
daftAI-amp/
├── README.md
├── README.zh.md
├── CHANGELOG.md
├── CHANGELOG.zh.md
├── LICENSE
├── .gitignore
├── assets/
│   └── usage-monitor/
│       └── preview.mp4
└── plugins/
    └── daftai-usage-monitor/
        └── usage-monitor.ts
```

## Contributing

Feel free to submit issues and pull requests.

## License

MIT License
