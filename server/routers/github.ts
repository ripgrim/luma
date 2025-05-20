import { z } from 'zod';
import { router, publicProcedure } from '../trpc';

export const githubRouter = router({
  getGithubData: publicProcedure.query(async () => {
    const res = await fetch('https://api.github.com/repos/ripgrim/luma?page=1&per_page=100');
    if (!res.ok) throw new Error('Failed to fetch GitHub data');
    const data = await res.json();
    // Validate and pick only the fields we want
    const schema = z.object({
      forks: z.number(),
      stargazers_count: z.number(),
      open_issues_count: z.number(),
      watchers: z.number(),
    });
    const { forks, stargazers_count, open_issues_count, watchers } = schema.parse(data);
    return {
      forks,
      stars: stargazers_count,
      issues: open_issues_count,
      watchers,
    };
  })
}); 