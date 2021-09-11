import axios from "axios";
import { useEffect, useState } from "react";
import { SalePage } from "types/sale";
import { formatLocalDate } from "utils/format";
import { BASE_URL } from "utils/requests";

function DataTable() {

  const [page, setPage] = useState<SalePage>(
    {
      content: [],
      last: false,
      totalPages: 1,
      totalElements: 0,
      first: true,
      number: 0,
      numberOfElements: 0,
      size: 0,
      empty: true
    }
  );

  useEffect(
    () => {
      axios.get(`${BASE_URL}/sales?page=1&size=10&sort=date,desc`)
        .then(
          (res) => {
            setPage(res.data);
          }
        );
    },
    []
  );

  return (
    <div className="table-responsive">
      <table className="table table-striped table-sm">
        <thead>
          <tr>
            <th>Data</th>
            <th>Vendedor</th>
            <th>Clientes visitados</th>
            <th>Negócios fechados</th>
            <th>Valor</th>
          </tr>
        </thead>
        <tbody>
          {page.content?.map(item => (
            <tr key={item.id}>
              <td>{formatLocalDate(item.date,"dd/MM/yyyy")}</td>
              <td>{item.seller.name}</td>
              <td>{item.visited}</td>
              <td>{item.deals}</td>
              <td>{item.amount.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/*
<tbody>
<tr>
            <td>22/04/2021</td>
            <td>Anakin</td>
            <td>34</td>
            <td>25</td>
            <td>15017.00</td>
          </tr>
          <tr>
            <td>22/04/2021</td>
            <td>Barry Allen</td>
            <td>34</td>
            <td>25</td>
            <td>15017.00</td>
          </tr>
          <tr>
            <td>22/04/2021</td>
            <td>Kal-El</td>
            <td>34</td>
            <td>25</td>
            <td>15017.00</td>
          </tr>
          <tr>
            <td>22/04/2021</td>
            <td>Logan</td>
            <td>34</td>
            <td>25</td>
            <td>15017.00</td>
          </tr>
          <tr>
            <td>22/04/2021</td>
            <td>Padmé</td>
            <td>34</td>
            <td>25</td>
            <td>15017.00</td>
          </tr>
</tbody>
*/

export default DataTable;