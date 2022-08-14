import React, { Component } from "react";
import AddProduct from "./AddProduct";
import { Table } from "react-bootstrap";
import { Button, ButtonToolbar } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import EditProduct from "./EditProduct";

export default class Product extends Component {
  constructor(props) {
    super(props);
    this.state = { Products: [], addModalShow: false, editModalShow: false };
  }
  refreshList() {
    fetch(process.env.REACT_APP_API + "Products")
      .then((response) => response.json())
      .then((data) => {
        this.setState({ Products: data });
      });
  }
  componentDidMount() {
    this.refreshList();
  }

  componentDidUpdate() {
    this.refreshList();
  }

  deletePro(proid, proname) {
    if (
      window.confirm(proname + " Adlı ürünü silmek istediğinize emin misiniz ?")
    ) {
      fetch(process.env.REACT_APP_API + "/Products" + proid, {
        method: "DELETE",
        header: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
    }
  }

  render() {
    const { proid,proname,promt,doj } = this.state;
    let addModalClose = () => this.setState({ addModalShow: false });
    let editModalClose = () => this.setState({ editModalShow: false });
    return (
      <div>
        <div>
          <h3>Kategoriler</h3>
          <Table striped bordered hover size="sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>Ürün Adı</th>
                <th>Kategori Adı</th>
                <th>Tarih</th>
                <th>Sil</th>
                <th>Güncelle</th>
              </tr>
            </thead>
            <tbody>
              {this.state.Products.map((pro) => (
                <tr key={pro.ProductId}>
                  <td>{pro.ProductId}</td>
                  <td>{pro.ProductName}</td>
                  <td>{pro.Category}</td>
                  <td>{pro.dateOfJoining}</td>
                  <td>
                    {" "}
                    <Button
                      className="mr-2"
                      variant="danger"
                      onClick={() =>
                        this.deletePro(pro.ProductId, pro.ProductName)
                      }
                    >
                      Sil
                    </Button>
                  </td>

                  <td>
                    {" "}
                    <ButtonToolbar>
                      <Button
                        className="mr-2"
                        variant="primary"
                        onClick={() =>
                          this.setState({
                            editModalShow: true,
                            proid: pro.ProductId,
                           proname: pro.ProductName,
                            depmt: pro.Category,
                            doj: pro.dateOfJoining,
                          })
                        }
                      >
                        Güncelle
                      </Button>

                      <EditProduct
                        show={this.state.editModalShow}
                        onHide={editModalClose}
                        proid={proid}
                        proname={proname}
                        promt={promt}
                        doj={doj}
                      />
                    </ButtonToolbar>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <ButtonToolbar>
            <Button
              variant="dark"
              onClick={() => this.setState({ addModalShow: true })}
            >
              Ürün Ekle
            </Button>
            <AddProduct show={this.state.addModalShow} onHide={addModalClose} />
          </ButtonToolbar>
        </div>
      </div>
    );
  }
}
