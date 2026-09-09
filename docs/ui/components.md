# Component Inventory

## Retained And Adapted

| Component | Direction |
| --- | --- |
| `HeroSection` | Preserve identity; change CTA, loading, font, and carousel lifecycle |
| `Navbar` | Preserve scroll treatment and resume access; update section targets |
| `ResumeDownloadDialog` | Reuse one download and analytics command |
| `Footer` | Update links to the new information architecture |
| `ScrollToTopButton` | Retain for Classic mode |
| Dialog/Sheet primitives | Use for accessible interaction details |

## New Classic Components

- `ClassicPortfolio`
- `SelectedWork`
- `ExperienceTimeline`
- `ProjectIndex`
- `Writing`
- `Contact`

Classic components read shared selectors and prefer Server Components.

## New Explore Components

- `PortfolioShell.client`
- `ExploreChooser`
- `RobotWorldLoader.client`
- `ExploreWorld`
- `RobotController`
- `WorldStation` and station renderers
- `ExploreHUD`
- `InteractionPanel`
- mobile directional controls

Only the world loader and interactive descendants require Client Component boundaries.

## Retired After Parity

- `FilterBar`
- `FeedbackWidget` from the primary visitor flow
- `SectionCard` wrappers around every section
- bento page orchestration
- LinkedIn embed carousel
- standalone Objective, Skills, Freelance, and Volunteer cards
- `DetailSidebar`, replaced by the shared interaction panel

Deletion happens after Classic content parity and critical tests, not during initial extraction.
