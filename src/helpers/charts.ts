export default {
  formatChartData: (data: Array<any>) => {
    const chartData = data.map((item) => {
      return { value: item.value, date: item.date_enqueued };
    });
    return { chartData };
  },
};
