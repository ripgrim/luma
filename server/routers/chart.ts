import { z } from 'zod';
import { router, publicProcedure } from '../trpc';
import { getChartData } from 'rolimons-fixed/modules/players.js';

export const chartRouter = router({
  getChartData: publicProcedure
    .input(z.object({
      userId: z.number().int().positive(),
    }))
    .query(async ({ input }) => {
      const chartData = await getChartData(input.userId);
      
      if (!chartData || !chartData.chart_data || !chartData.chart_data.num_points) {
        throw new Error('Failed to fetch chart data');
      }

      const { nominal_scan_time, value, rap, num_limiteds } = chartData.chart_data;
      
      return nominal_scan_time.map((ts: number, i: number) => ({
        date: new Date(ts * 1000).toISOString().slice(0, 10),
        value: value[i],
        rap: rap[i],
        num_limiteds: num_limiteds[i],
      }));
    }),
}); 