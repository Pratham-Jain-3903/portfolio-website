import { describe, expect, it } from 'vitest';

import {
  featuredProjects,
  getPrimaryProjectLink,
  getProjectById,
  getProjectDescription,
  projectIds,
  projects,
} from '@/data/projects';

describe('project content', () => {
  it('has unique stable IDs', () => {
    expect(projectIds.size).toBe(projects.length);
    expect(projects.every(({ id }) => /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(id))).toBe(true);
  });

  it('exposes the approved contiguous featured order', () => {
    expect(featuredProjects.map(({ id, featuredRank }) => ({ id, featuredRank }))).toEqual([
      { id: 'project-mercury', featuredRank: 1 },
      { id: 'pydorky', featuredRank: 2 },
      { id: 'fin-stream-dashboard', featuredRank: 3 },
      { id: 'solarwise', featuredRank: 4 },
    ]);
  });

  it('contains only valid HTTP project links', () => {
    for (const project of projects) {
      for (const link of Object.values(project.links)) {
        expect(new URL(link).protocol).toMatch(/^https?:$/);
      }
    }
  });

  it('reconstructs existing project detail copy', () => {
    const project = getProjectById('project-mercury');

    expect(project).toBeDefined();
    expect(getProjectDescription(project!)).toContain('• Engineered a backtesting engine');
    expect(getPrimaryProjectLink(project!)).toBe(
      'https://github.com/Pratham-Jain-3903/streamprocessing-kafka-finlight-news-dashboard'
    );
  });
});