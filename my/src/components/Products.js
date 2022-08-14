import React, { useState, useEffect } from "react";
import { Table} from "react-bootstrap";

import "bootstrap/dist/css/bootstrap.min.css";

function Products() {
  const [Products, setProducts] = useState([]);

  useEffect(() => {
    fetch(process.env.REACT_APP_API +"Products")
      .then((response) => response.json())
      .then((response) =>  setProducts(response));
  }, []);
 
  return (
    <div>
      <div>
      <h3>Kategoriler</h3>
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>#</th>
            <th>Ürün Adı</th>
            <th>Kategori Adı</th>
            <th>Tarih</th>

          </tr>
        </thead>
        <tbody>
          {Products.map((pro) => (
            <tr key={pro.ProductId}>
              <td>{pro.ProductId}</td>
              <td>{pro.ProductName}</td>
              <td>{pro.Category}</td>
              <td>{pro.dateOfJoining}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
    </div>
  )
}

export default Products