import NavBar from "components/NavBar";
import Footer from "components/Footer";
import DataTable from "components/DataTable";
import BarChart from "components/BarChart";
import DonutChart from "components/DonutChart";


function Dashboard() {
    return (
      <>
      <NavBar />
      <div className="container" >
        <h1 className="text-primary py-3" >Painel de Vendas</h1>
        <div className="row px-3">
          <div className="col-sm-6">
            <h5 className="text-center text-secondary">Taxa de Sucesso em Vendas (%)</h5>
            <BarChart />
          </div>
          <div className="col-sm-6">
            <h5 className="text-center text-secondary">Todas as Vendas (%)</h5>
            <DonutChart />
          </div>
        </div>
        <div className="py-3">
          <h2
            className="text-primary"
            >Todas as Vendas</h2>
          <DataTable />
        </div>

      </div>
      <Footer />
    </>
    );
  }
  
  export default Dashboard;