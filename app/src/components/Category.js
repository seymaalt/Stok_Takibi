import React, { Component } from "react";
import { Table } from "react-bootstrap";
import AddCategory from "./AddCategory";
import EditCategory from "./EditCategory";
import { Button, ButtonToolbar } from "react-bootstrap";
export default class Category extends Component {
  constructor(props) {
    super(props);
    this.state = { categories: [], addModalShow: false, editModalShow: false };
  }
  refreshList() {
    fetch(process.env.REACT_APP_API + "Category")
      .then((response) => response.json())
      .then((data) => {
        this.setState({ categories: data });
      });
  }
  componentDidMount() {
    this.refreshList();
  }

  componentDidUpdate() {
    this.refreshList();
  }

  deleteCat(catid, catename) {
    if (
      window.confirm(
        catename + " Adlı kategoriyi silmek istediğinize emin misiniz ?"
      )
    ) {
      fetch(process.env.REACT_APP_API + "Category/" + catid, {
        method: "DELETE",
        header: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
    }
  }

  render() {
    const { categories,catid,catname } = this.state;
    let addModalClose = () => this.setState({ addModalShow: false });
    let editModalClose = () => this.setState({ editModalShow: false });
    return (
      <div>
        <Table className="mt-4" striped bordered hover size="sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>Kategori Adı</th>
              <th>Sil</th>
              <th>Güncelle</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((cate) => (
              <tr key={cate.CategoryId}>
                <td>{cate.CategoryId}</td>
                <td>{cate.CategoryName}</td>
                <td>
                  <Button
                    className="mr-2"
                    variant="danger"
                    onClick={() =>
                      this.deleteCat(cate.CategoryId, cate.CategoryName)
                    }
                  >
                    Sil
                  </Button>
                </td>
                <td>
                 
                  <Button
                    className="mr-2"
                    variant="primary"
                    onClick={() =>
                      this.setState({
                        editModalShow: true,
                        catid: cate.CategoryId,
                        catname: cate.CategoryName,
                      })
                    }
                  >
                    Edit
                  </Button>
                  <EditCategory
                    show={this.state.editModalShow}
                    onHide={editModalClose}
                    catid={catid}
                    catname={catname}
                  />
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
            Kategori Ekle
          </Button>
          <AddCategory show={this.state.addModalShow} onHide={addModalClose} />
        </ButtonToolbar>
      </div>
    );
  }
}
