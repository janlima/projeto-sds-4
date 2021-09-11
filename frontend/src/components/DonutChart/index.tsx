import axios from "axios";
import { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { SaleSum } from "types/sale";
import { BASE_URL } from "utils/requests";


type ChartData = {
  labels: string[],
  series: number[]
};

// const mockData = {
//   series: [477138, 499928, 444867, 220426, 473088],
//   labels: ['Anakin', 'Barry Allen', 'Kal-El', 'Logan', 'Padmé']
// }


function DonutChart() {

  //  [varName, function] = useState<type>(default_value)
  const [chartData, setChartData] = useState<ChartData>({ labels: [], series: [] });

  useEffect(
    () => {
      axios.get(`${BASE_URL}/sales/total-sales-by-seller`)
        .then(
          (res) => {
            const data = res.data as SaleSum[];
            const tags = data.map(x => x.sellerName);
            const values = data.map(x => x.sum);

            setChartData({ labels: tags, series: values });
          }
        );
    },
    []
  );

  const options = {
    legend: {
      show: true
    }
  }


  return (
    <Chart options={{ ...options, labels: chartData.labels }}
      series={chartData.series}
      type="donut"
      height="240"
    />
  );
}

export default DonutChart;

