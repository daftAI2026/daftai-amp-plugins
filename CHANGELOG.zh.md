# Changelog

[English](./CHANGELOG.md) | 中文

## 0.0.2 - 2026-04-04

### 修复 (usage-monitor)
- 修复付费余额为负数时不显示的问题：当余额为负（如 `-$0.05`）时，正则现在能正确匹配 `-$` 前缀。

## 0.0.1 - 2026-03-31

### 新增 (usage-monitor)
- 首次发布：每次 agent 回合结束后通过 `ctx.ui.notify` 显示 Amp 使用额度。
- 解析免费额度（`Amp Free: $x/$y remaining`）和付费余额（`Individual credits: $x remaining`）。
- 自动从 `PATH` 检测 `amp` 二进制路径（无硬编码路径）。
