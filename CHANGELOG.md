# Changelog

English | [中文](./CHANGELOG.zh.md)

## 0.0.5 - 2026-06-06

### Changed (usage-monitor)
- Aligned installation and reload instructions with the current Amp plugin manual.
- Documented the current project, system, and Windows plugin locations.
- Runs the initial usage refresh from `session.start` instead of plugin load.

### Fixed (usage-monitor)
- Detect the `amp` binary on Windows with `where.exe` instead of the Unix-only `which`.

## 0.0.4 - 2026-05-19

### Changed (usage-monitor)
- Renamed the paid balance label from `Individual` to `Credits` in the persistent status item.

## 0.0.3 - 2026-05-18

### Changed (usage-monitor)
- Migrated from `ctx.ui.notify` to the experimental `amp.experimental.createStatusItem` API.
- The plugin now creates a persistent status item in the Amp CLI. Upon initialization, it displays `Amp Free: loading...` and immediately fetches the current usage.
- Updates silently after every `agent.end` event instead of triggering a notification, providing a cleaner and non-intrusive user experience.

## 0.0.2 - 2026-04-04

### Fixed (usage-monitor)
- Fix negative balance not displayed: when paid credits go negative (e.g. `-$0.05`), the regex now matches the `-$` prefix correctly.

## 0.0.1 - 2026-03-31

### Added (usage-monitor)
- Initial release: displays Amp usage balance after each agent turn via `ctx.ui.notify`.
- Parses both free credits (`Amp Free: $x/$y remaining`) and paid balance (`Individual credits: $x remaining`).
- Auto-detects `amp` binary from `PATH` (no hardcoded paths).
