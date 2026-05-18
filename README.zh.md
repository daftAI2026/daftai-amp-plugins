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

### 方式一：手动安装

```bash
# 1. 克隆仓库
git clone https://github.com/daftAI2026/daftai-amp-plugins.git
cd daftai-amp-plugins

# 2. 复制插件到 Amp 插件目录

# 全局（所有项目）
mkdir -p ~/.config/amp/plugins
cp plugins/daftai-usage-monitor/usage-monitor.ts ~/.config/amp/plugins/

# 或项目级别（在你的项目根目录下）
mkdir -p /path/to/your/project/.amp/plugins
cp plugins/daftai-usage-monitor/usage-monitor.ts /path/to/your/project/.amp/plugins/

# 3. 启用插件运行 Amp
PLUGINS=all amp
```

### 方式二：让 Agent 帮你装

直接告诉 Amp：

> Please install plugins from github.com/daftAI2026/daftai-amp-plugins

## 开始使用

1. 启用插件运行 Amp：
   ```bash
   PLUGINS=all amp
   ```
2. 发送任意提示词，已安装的插件会自动生效。
3. 修改插件后，按 `Ctrl-o` 选择 `plugins: reload` 重新加载。


## 可用插件

| 插件 | 描述 |
|------|------|
| [usage-monitor](plugins/daftai-usage-monitor/usage-monitor.ts) | 自动显示 Amp 免费额度及付费余额，并在每次 agent 回合结束后刷新。 |

### usage-monitor

启动 Amp 后，你的额度信息会自动显示，并在每次 agent 回合结束后保持刷新。

让你一目了然地追踪免费额度与付费余额。

https://github.com/user-attachments/assets/74b5bba6-57a3-4a3d-ad23-2b194b356b6e


## 项目结构

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

## 贡献

欢迎提交 Issue 和 Pull Request。

## 许可证

MIT License
