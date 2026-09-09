# Analytics

Analytics is stored in Neon/PostgreSQL through the existing route-handler and schema layer. Documentation describing JSON-file storage is legacy.

## Events

| Event | When |
| --- | --- |
| `portfolio_mode_selected` | Visitor deliberately selects Classic or Robot |
| `robot_control_started` | First valid movement input in a session |
| `station_entered` | Nearest station becomes eligible, deduplicated |
| `station_opened` | Detail panel opens |
| `station_closed` | Detail panel closes |
| `robot_fallback_shown` | Robot cannot initialize and Classic is offered |

Do not emit a `robot_move` event for every key or frame. It creates noisy, expensive telemetry without useful product insight.

## Privacy And Reliability

Events include session ID, timestamp, mode, station ID when relevant, and source control. Do not send robot coordinates, typed keys unrelated to controls, or private project data. Analytics failure never blocks navigation or interaction.

See [Analytics API](../api/analytics.md) and [API testing](../testing/api.md).
