declare module 'rolimons-fixed/modules/players.js' {
  export function getChartData(userId: number): Promise<{
    chart_data: {
      num_points: number;
      nominal_scan_time: number[];
      value: number[];
      rap: number[];
      num_limiteds: number[];
    };
  }>;
} 