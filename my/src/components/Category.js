import React, { useState, useEffect } from "react";
import { Table, Button, ButtonToolbar } from "react-bootstrap";
import AddCategory from './addCategory';
import "bootstrap/dist/css/bootstrap.min.css";

function Category(props) {
  const [Category, setCategory] = useState([]);
  const [addModalShow, setaddModalShow] = useState(false);
 
  useEffect(() => {
    fetch(process.env.REACT_APP_API + "Category")
      .then((response) => response.json())
      .then((response) => setCategory(response));
  }, [Category]);
  
  let addModalClose=()=>setaddModalShow(false);
  return (
    <div>
      <h3>Kategoriler</h3>
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>#</th>
            <th>Kategori Adı</th>
           
            <th>Sil</th>
          </tr>
        </thead>
        <tbody>
          {Category.map((cate) => (
            <tr key={cate.CategoryId}>
              <td>{cate.CategoryId}</td>
              <td>{cate.CategoryName}</td>  
              <td></td>
            </tr>
          ))}
        </tbody>
      </Table>
      <ButtonToolbar>
        <Button variant="primary" onClick={() => setaddModalShow(true)}>
          Kategori Ekle
        </Button>
        <AddCategory show={addModalShow}
                  onHide={addModalClose}  />
      </ButtonToolbar>
    </div>
  );
}

export default Category;
