# Changelog

[English](./CHANGELOG.md) | 中文

## 0.0.8 - 2026-08-18

### 更改 (usage-monitor)
- 新增对订阅版 `amp usage` 输出的支持，可分别显示 Other 与 Orb 两个额度池。
- 状态栏现在会显示识别到的套餐名称，例如 `Megawatt · Other: 95% · Orb: 100%`。
- 保留对旧版 Amp Free 与付费余额输出格式的兼容。

## 0.0.7 - 2026-07-12

### 更改 (usage-monitor)
- 适配 `amp usage` 新输出格式：免费额度从金额（`$x/$y remaining`）改为每日百分比（如 `57% remaining today`）。
- 状态栏对新格式显示 `Free: 57%`，同时保留对旧版 `$x/$y` 格式的向后兼容。
- 新版 Amp 在每行末尾追加的设置页 URL 被优雅忽略，不影响解析。

## 0.0.6 - 2026-06-15

### 修复 (usage-monitor)
- 解析 `amp` 二进制路径时不再阻塞插件启动；首次额度刷新会在插件注册完成后执行，避免本地 PATH 查询慢或网络/API 错误导致插件无法 ready。
- `amp usage` 子进程失败时直接跳过，不再解析不完整输出。

## 0.0.5 - 2026-06-06

### 更改 (usage-monitor)
- 按当前 Amp 插件手册更新安装、查看与重载说明。
- 补充当前项目插件、系统插件与 Windows 插件目录说明。
- 增加 Windows PowerShell 安装示例。
- 在 Windows 上将首次额度刷新延后到插件启动完成后执行，避免状态项加载前运行 `amp usage` 导致启动超时。

### 修复 (usage-monitor)
- 在 Windows 上使用 `where.exe` 检测 `amp` 二进制，替代仅适用于 Unix 的 `which`。
- 子进程执行 `amp usage` 时使用 `PLUGINS=none`，避免递归加载 usage-monitor 插件。

## 0.0.4 - 2026-05-19

### 更改 (usage-monitor)
- 将常驻状态项中的付费余额标签从 `Individual` 改为 `Credits`。

## 0.0.3 - 2026-05-18

### 更改 (usage-monitor)
- 从 `ctx.ui.notify` 迁移至实验性的 `amp.experimental.createStatusItem` API。
- 插件现在会在 Amp CLI 中创建一个常驻状态项。刚加载时显示 `Amp Free: loading...` 并立即拉取最新额度。
- 在每次 `agent.end` 事件后自动静默刷新同一个状态项，不再发送弹窗通知，体验更加无缝。

## 0.0.2 - 2026-04-04

### 修复 (usage-monitor)
- 修复付费余额为负数时不显示的问题：当余额为负（如 `-$0.05`）时，正则现在能正确匹配 `-$` 前缀。

## 0.0.1 - 2026-03-31

### 新增 (usage-monitor)
- 首次发布：每次 agent 回合结束后通过 `ctx.ui.notify` 显示 Amp 使用额度。
- 解析免费额度（`Amp Free: $x/$y remaining`）和付费余额（`Individual credits: $x remaining`）。
- 自动从 `PATH` 检测 `amp` 二进制路径（无硬编码路径）。
