# Analytics API Tests

Analytics routes use Neon/PostgreSQL. Unit tests import route handlers and mock the database module rather than starting a database or using MSW.

## Coverage

- valid payload returns the expected success response
- malformed or missing fields return the documented 4xx response
- database errors return a stable response without leaking credentials
- schema setup is called where required
- session, scroll, engagement, theme, feedback, interaction, performance, and resume events bind expected values
- dashboard aggregation handles empty result sets and database output types

Reset module mocks and global schema state between tests. Assert SQL intent and parameters, not formatting of the entire query string.

Browser portfolio tests intercept `/api/analytics/**`. Provider component tests use fetch spies and an explicit `navigator.sendBeacon` mock.
