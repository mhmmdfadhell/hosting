import Sidebar from "../../components/molecules/Sidebar";
import TableToppings from "../../components/molecules/Table/Toppings";

export default function Toppings() {
  return (
    <>
      <div className="d-flex gap-2" style={{marginTop:'170px'}}>
      <Sidebar/>
      <div className="container p-5" style={{marginTop:'-250px'}}>
      <TableToppings/>
        </div>
    </div>
    </>
  )
}
