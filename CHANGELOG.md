# Changelog

English | [中文](./CHANGELOG.zh.md)

## 0.0.1 - 2026-03-31

### Added (usage-monitor)
- Initial release: displays Amp usage balance after each agent turn via `ctx.ui.notify`.
- Parses both free credits (`Amp Free: $x/$y remaining`) and paid balance (`Individual credits: $x remaining`).
- Auto-detects `amp` binary from `PATH` (no hardcoded paths).
