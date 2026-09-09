# Documentation Checks

Run `npm run lint:md` for Markdown structure and `npm run lint:links` for repository-local links.

Pull requests do not block on third-party URL availability. External links should be checked in a scheduled workflow because rate limits and remote downtime are nondeterministic.

Rules intentionally allow long lines for tables, URLs, and prose (`MD013` disabled), sibling heading names (`MD024`), and inline HTML when a document genuinely needs it (`MD033`). Prefer normal Markdown and relative repository links.

The historical root README, `blueprint.md`, and `IMPLEMENTATION_PROGRESS.md` predate this documentation set and are excluded from structural linting. They remain available for context until archival cleanup is scheduled.
