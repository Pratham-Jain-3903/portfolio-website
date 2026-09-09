# Unit Tests

Use Vitest for deterministic functions without rendering the App Router.

## Routing

Test `parsePortfolioQuery` and `serializePortfolioQuery` for:

- absent, Classic, and Robot modes
- invalid mode fallback
- station normalization and malformed station rejection
- optional known-station filtering
- legacy `detail` alias
- repeated query values using the first value
- preservation of unrelated query parameters
- removal of legacy state during serialization

## Content

- unique project and station IDs
- contiguous featured ranks 1 through 4
- approved public links
- hidden incomplete writing entries
- deterministic date sorting and company grouping
- Classic and Robot selectors return the same content object

## Movement And Geometry

- equivalent movement across 30Hz, 60Hz, and 120Hz inputs
- capped frame delta after tab resume
- acceleration, reverse, sprint, turning, and damping to rest
- speed and world bounds
- circle collision response
- proximity tie-breaking and hysteresis
- station configuration references and radius ordering

Avoid snapshotting large content arrays. Assert domain invariants and selected representative records.
