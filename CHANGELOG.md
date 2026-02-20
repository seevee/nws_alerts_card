# Changelog

All notable changes to this project will be documented in this file.

## [v1.7.0] - 2026-02-19

### Added

- Relative time ("in 2h 30m", "in 45m") displayed beneath absolute timestamps for Onset and Expires in alert details
- Timezone abbreviation (e.g. "MST", "EST") appended to all displayed timestamps

### Changed

- Timestamps now display in the Home Assistant user's configured timezone (`hass.config.time_zone`) instead of the browser's local timezone — eliminates confusion when the browser and HA server are in different zones
- Progress bar center label now shows relative time to onset/expiry ("starts in 45m", "expires in 2h") instead of percentage elapsed

### Fixed

- Alert description and instruction HTML is now sanitized with DOMPurify before rendering, preventing potential XSS from malformed NWS alert content

## [v1.6.0] - 2026-02-18

### Changed

- `animations` config option now respects the OS `prefers-reduced-motion` accessibility setting when unset (omitted). Setting `animations: true` overrides OS preference and always animates; `animations: false` always disables animations. Users who have not set this option will now have animations automatically suppressed when their OS accessibility settings request reduced motion.

## [v1.5.0] - 2026-02-18

### Added

- `colorTheme` config option to choose between `'severity'` (default — HA theme colors mapped to severity brackets) and `'nws'` (NWS official hazard-map colors keyed by event type, e.g. Tornado Warning → red, Flash Flood Warning → dark red)
- Color theme dropdown in the visual configuration editor

## [v1.4.1] - 2026-02-18

### Fixed

- Show a clean in-card message when the NWS Alerts sensor is `unavailable` or `unknown` instead of rendering a broken card

### Changed

- Internal refactor: icon lookups, timestamp formatting, and repeated template blocks consolidated into shared helpers (no behavior change)

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

[v1.7.0]: https://github.com/seevee/nws_alerts_card/releases/tag/v1.7.0
[v1.6.0]: https://github.com/seevee/nws_alerts_card/releases/tag/v1.6.0
[v1.5.0]: https://github.com/seevee/nws_alerts_card/releases/tag/v1.5.0
[v1.4.1]: https://github.com/seevee/nws_alerts_card/releases/tag/v1.4.1
[v1.4.0]: https://github.com/seevee/nws_alerts_card/releases/tag/v1.4.0
[v1.3.1]: https://github.com/seevee/nws_alerts_card/releases/tag/v1.3.1
[v1.3.0]: https://github.com/seevee/nws_alerts_card/releases/tag/v1.3.0
[v1.2.0]: https://github.com/seevee/nws_alerts_card/releases/tag/v1.2.0
[v1.1.1]: https://github.com/seevee/nws_alerts_card/releases/tag/v1.1.1
[v1.1.0]: https://github.com/seevee/nws_alerts_card/releases/tag/v1.1.0
[v1.0.0]: https://github.com/seevee/nws_alerts_card/releases/tag/v1.0.0
