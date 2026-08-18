# Changelog

English | [中文](./CHANGELOG.zh.md)

## 0.0.8 - 2026-08-18

### Changed (usage-monitor)
- Added support for subscription-based `amp usage` output with separate Other and Orb usage pools.
- The status item now includes the detected plan name, for example `Megawatt · Other: 95% · Orb: 100%`.
- Retained compatibility with older Amp Free and paid credit output formats.

## 0.0.7 - 2026-07-12

### Changed (usage-monitor)
- Adapted to the new `amp usage` output format where Amp Free is reported as a daily percentage (e.g. `57% remaining today`) instead of a dollar amount (`$x/$y remaining`).
- The status item now displays `Free: 57%` for the new format while retaining backward compatibility with the older `$x/$y` format.
- Trailing settings URLs appended by newer Amp versions are gracefully ignored.

## 0.0.6 - 2026-06-15

### Fixed (usage-monitor)
- Avoid blocking plugin startup while resolving the `amp` binary path; the first usage refresh now runs after registration so slow local PATH lookup or network/API errors cannot prevent the plugin from becoming ready.
- Ignore failed `amp usage` subprocess exits instead of parsing incomplete output.

## 0.0.5 - 2026-06-06

### Changed (usage-monitor)
- Aligned installation and reload instructions with the current Amp plugin manual.
- Documented the current project, system, and Windows plugin locations.
- Added a Windows PowerShell installation example.
- Defers the first Windows usage refresh until after plugin startup so the status item can load before `amp usage` runs.

### Fixed (usage-monitor)
- Detect the `amp` binary on Windows with `where.exe` instead of the Unix-only `which`.
- Runs child `amp usage` calls with `PLUGINS=none` to avoid recursively loading the usage-monitor plugin.

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
