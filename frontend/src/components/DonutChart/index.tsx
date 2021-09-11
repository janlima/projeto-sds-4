import axios from "axios";
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

const options = {
  legend: {
    show: true
  }
}

let chartData: ChartData = {
  labels: ['Anakin', 'Barry Allen', 'Kal-El', 'Logan', 'Padmé'],
  series: [477138, 499928, 444867, 220426, 473088]
};

axios.get(`${BASE_URL}/sales/total-sales-by-seller`)
  .then(
    (res) => {
      const data = res.data as SaleSum[];
      const tags = data.map(x => x.sellerName);
      const values = data.map(x => x.sum);

      chartData = { labels: tags, series: values };

      console.log(chartData);
    }
  );
function DonutChart() {


  return (
    <Chart options={{ ...options, labels: chartData.labels }}
      series={chartData.series}
      type="donut"
      height="240"
    />
  );
}

export default DonutChart;

