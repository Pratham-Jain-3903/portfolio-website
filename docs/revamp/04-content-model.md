# Shared Content Model

Both portfolio modes must consume the same exports from `src/data`. Presentation components cannot define their own project, experience, or profile records.

## Project

```ts
type Project = {
  id: string;
  title: string;
  shortTitle: string;
  duration: string;
  outcome: string;
  problem: string;
  impact: string[];
  architecture?: string[];
  stack: string[];
  metrics: string[];
  links: { github?: string; live?: string; package?: string };
  collaborators: string[];
  award?: string;
  featuredRank?: number;
};
```

V1 featured order is:

1. Project Mercury
2. Pydorky
3. Financial Streaming Dashboard
4. SolarWise

The proposed Market Data Infrastructure project is not public content until its copy and metrics are approved. Agentic Call Handler remains in the full index because its current wording references client work.

## Other Types

- `ExperienceEntry`: role, company, start/end dates, display duration, location, responsibilities, skills, parent company, and logo reference.
- `SkillGroup`: id, label, and ordered skills.
- `EducationEntry`: institution, qualification, dates, result, and optional links.
- `Certification`: issuer, title, date, credential URL, and skills.
- `Recommendation`: author, relationship, quote, and source URL.
- `Profile`: public contact details, social links, objective, and resume URL.
- `WritingEntry`: id, title, date, excerpt, URL, and publication status.

Existing LinkedIn URLs migrate with `status: 'needs-copy'`. Public selectors exclude incomplete entries so the implementation never invents titles or summaries.

## Validation

Data is trusted static TypeScript. Runtime schema validation is unnecessary until a CMS or external API owns content. Unit tests enforce:

- unique stable IDs
- contiguous featured ranks 1 through 4
- valid URL shapes
- deterministic experience sorting and grouping
- no public writing entries without approved copy

See [Unit tests](../testing/unit.md).
