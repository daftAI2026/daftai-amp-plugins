# daftAI-Amp-plugins

[English](./README.md) | 中文

daftAI 分享的 [Amp](https://ampcode.com) CLI 插件，提升 Amp 使用体验。

> ⚠️ Amp 插件 API 目前为实验性质，可能会有破坏性变更。参见 [Plugin API 文档](https://ampcode.com/manual/plugin-api)。

## 环境要求

- 通过二进制方式安装的 [Amp CLI](https://ampcode.com)（非 npm 安装）
- `amp` 命令可在 `PATH` 中找到

**限制：**

- 插件仅在 **Amp CLI** 中生效，不支持编辑器扩展
- 仅支持二进制安装的 Amp，不支持 `npm install` 方式


## 安装

### 方式一：让 Agent 帮你装

直接告诉 Amp：

> Please install plugins from github.com/daftAI2026/daftai-amp-plugins

### 方式二：手动安装

先克隆仓库：

```bash
git clone https://github.com/daftAI2026/daftai-amp-plugins.git
cd daftai-amp-plugins
```

然后将插件复制到一个 Amp 插件目录。

macOS/Linux 系统插件（所有项目）：

```bash
mkdir -p ~/.config/amp/plugins
cp plugins/daftai-usage-monitor/usage-monitor.ts ~/.config/amp/plugins/
```

Windows PowerShell 系统插件（所有项目）：

```powershell
New-Item -ItemType Directory -Force "$env:USERPROFILE\.config\amp\plugins"
Copy-Item plugins/daftai-usage-monitor/usage-monitor.ts "$env:USERPROFILE\.config\amp\plugins\usage-monitor.ts"
```

项目插件（在你的项目根目录下执行）：

```bash
mkdir -p /path/to/your/project/.amp/plugins
cp plugins/daftai-usage-monitor/usage-monitor.ts /path/to/your/project/.amp/plugins/
```

## 开始使用

1. 启动 Amp：
   ```bash
   amp
   ```
2. 发送任意提示词，已安装的插件会自动生效。
3. 查看插件时，按 `Ctrl-o` 选择 `plugins: list`。
4. 修改插件后，按 `Ctrl-o` 选择 `plugins: reload` 重新加载。


## 可用插件

| 插件 | 描述 |
|------|------|
| [usage-monitor](plugins/daftai-usage-monitor/usage-monitor.ts) | 自动显示 Amp 免费额度及付费余额，并在每次 agent 回合结束后刷新。 |

### usage-monitor

支持 macOS、Linux 和 Windows。插件加载后，你的额度信息会自动显示在支持状态项的 Amp 界面中，并在每次 agent 回合结束后保持刷新。如果当前界面不支持状态项，插件会在 agent 回合结束后回退为通知显示。

让你一目了然地追踪免费额度与付费余额。

https://github.com/user-attachments/assets/3f4e72f9-7ec7-4ea9-9626-66b9cc202ede


## 项目结构

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

## 贡献

欢迎提交 Issue 和 Pull Request。

## 许可证

MIT License
