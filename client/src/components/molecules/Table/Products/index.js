import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { API } from "../../../../config/server";

export default function TableProducts() {
  const router = useHistory();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [wait, setWait] = useState(false);
  // fetch data toppings
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await API.get("/products");
      console.log("respons=>", response);
      setProducts(response.data.data.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  // Fetch data on component mount and when `wait` state changes
  useEffect(() => {
    fetchProducts();
  }, [wait]);

  const addPageProducts = () => {
    router.push("/addproduct");
  };

  return (
    <div>
      <div
        className=" d-flex justify-content-end ms-5"
        style={{ marginBottom: "-160px", marginTop: "170px" }}
        onClick={addPageProducts}
      >
        <Button
          className="btn btn-primary"
          style={{ background: "#A94B00", border: "1px solid #A94B00" }}
        >
          Tambah Product
        </Button>
      </div>
      <div>
        <h3 className="header3">List Product</h3>
        <table
          className="table table-bordered"
          style={{ borderColor: "#000000" }}
        >
          <thead style={{ backgroundColor: "#E5E5E5" }}>
            <tr>
              <th scope="col">No</th>
              <th scope="col">Name</th>
              <th scope="col" width="15%">
                Price
              </th>
              <th scope="col">Image</th>
              <th scope="col">Stock</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={4}>Loading...</td>
              </tr>
            ) : (
              <>
                {products && products.length > 0 ? (
                  products.map((product, index) => (
                    <tr key={product.id}>
                      <td>{index + 1}</td>
                      <td>{product.tittle}</td>
                      <td>{product.price}</td>
                      <td>
                        <img
                          src={product.image}
                          alt={product.name}
                          style={{ width: "100px", height: "100px" }}
                        />
                      </td>
                      <td>{product.stock}</td>
                    </tr>
                  ))
                ) : (
                  <tr
                    style={{ height: "40px", borderRight: "1px solid black" }}
                  >
                    <td colSpan={4}>Tidak Ada Data!</td>
                  </tr>
                )}
              </>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
