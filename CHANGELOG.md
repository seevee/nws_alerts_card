# Changelog

All notable changes to this project will be documented in this file.

## [v1.4.0] - 2026-02-17

### Added

- `sortOrder` config option to control alert display order: `'default'` (integration order), `'onset'` (soonest first), or `'severity'` (most severe first)
- Sort order dropdown in the visual configuration editor
- Documented `layout` config option in README

## [v1.3.1] - 2026-02-17

### Added

- Compact layout toggle in the visual configuration editor

## [v1.3.0] - 2026-02-17

### Added

- `layout: compact` config option for space-constrained dashboards — renders each alert as a single slim row (icon + event name) that expands on tap to reveal badges, progress bar, and details

## [v1.2.0] - 2026-02-16

### Added

- `animations` config option (default `true`) to toggle animated borders, progress bar animations, and ongoing-pulse effects
- Animations toggle in the visual configuration editor

## [v1.1.1] - 2026-02-16

### Fixed

- Respect HA date format setting for timestamps

## [v1.1.0] - 2026-02-16

### Fixed

- Vertically center badge text
- Respect HA time format setting for timestamps

## [v1.0.0] - 2026-02-15

### Added

- Initial release — standalone Lovelace card for NWS weather alerts
- Severity-based color coding with animated borders for extreme/severe alerts
- Progress bars showing elapsed/remaining time for each alert
- Expandable details with description, instructions, and NWS source link
- Zone-based alert filtering
- Visual configuration editor
- Card picker integration
- Shadow DOM with full HA theme support

[v1.4.0]: https://github.com/seevee/nws_alerts_card/releases/tag/v1.4.0
[v1.3.1]: https://github.com/seevee/nws_alerts_card/releases/tag/v1.3.1
[v1.3.0]: https://github.com/seevee/nws_alerts_card/releases/tag/v1.3.0
[v1.2.0]: https://github.com/seevee/nws_alerts_card/releases/tag/v1.2.0
[v1.1.1]: https://github.com/seevee/nws_alerts_card/releases/tag/v1.1.1
[v1.1.0]: https://github.com/seevee/nws_alerts_card/releases/tag/v1.1.0
[v1.0.0]: https://github.com/seevee/nws_alerts_card/releases/tag/v1.0.0
