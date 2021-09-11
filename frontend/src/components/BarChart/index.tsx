import axios from "axios";
import { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { SaleSuccess } from "types/sale";
import { round } from "utils/format";
import { BASE_URL } from "utils/requests";

type SeriesData = {
  name: string,
  data: number[]
};

type ChartData = {
  labels: {
    categories: string[]
  },
  series: SeriesData[]
};


// const mockData = {
//   labels: {
//     categories: ['Anakin', 'Barry Allen', 'Kal-El', 'Logan', 'Padmé']
//   },
//   series: [
//     {
//       name: "% Sucesso",
//       data: [43.6, 67.1, 67.7, 45.6, 71.1]
//     }
//   ]
// }

function BarChart() {

  const [chartData, setChartData] = useState<ChartData>(
    {
        labels: {
          categories: []
        },
        series: [
          {
            name: "",
            data: []
          }
        ]
      }
    );

    useEffect(
      () => {
        axios.get(`${BASE_URL}/sales/success-by-seller`)
          .then(
            (res) => {
              const data = res.data as SaleSuccess[];
              const tags = data.map(x => x.sellerName);
              //const visits = data.map(x => x.visited);
              //const deals = data.map(x => x.deals);
              const  values = data.map(
                x => round(100 * x.deals / x.visited, 1)
              );

              setChartData(
                {
                  labels: {
                    categories: tags
                  },
                  series: [
                    {
                      name: "% Sucess",
                      data: values
                    }
                  ]
                }
              );
            }
          );
      },
      []
    );
  
  const options = {
    plotOptions: {
      bar: {
        horizontal: true,
      }
    },
  };

  return (
    <Chart options={{ ...options, xaxis: chartData.labels }}
      series={chartData.series} 
      type="bar"
      height="240"
      />
  );
}

export default BarChart;

