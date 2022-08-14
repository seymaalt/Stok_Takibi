import React, { Component } from "react";
import { Modal, Button, Row, Col, Form } from "react-bootstrap";
export default class AddProduct extends Component {
  constructor(props) {
    super(props);
    this.state={categories:[]};
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  
  componentDidMount(){
    fetch(process.env.REACT_APP_API+'Category')
    .then(response=>response.json())
    .then(data=>{
        this.setState({categories:data});
    });
}

handleSubmit(event){
    event.preventDefault();
    fetch(process.env.REACT_APP_API+'Products',{
        method:'POST',
        headers:{
            'Accept':'application/json',
            'Content-Type':'application/json'
        },
        body:JSON.stringify({
            ProductId:0,
            ProductName:event.target.ProductName.value,
            Category:event.target.Category.value,
            dateOfJoining:event.target.dateOfJoining.value,
          
        })
    })
    .then(res=>res.json())
    .then((result)=>{
        alert(result);
    },
    (error)=>{
        alert('Failed');
    })
}

  render() {
    return (
      <div className="container">
        <Modal
          {...this.props}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header clooseButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Ürün Ekle
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
              <Col sm={6}>
                <Form onSubmit={this.handleSubmit}>
                  <Form.Group controlId="ProductName">
                    <Form.Label>Ürün Adı</Form.Label>
                    <Form.Control
                      type="text"
                      name="ProductName"
                      required
                      placeholder="Ürün Adı"
                    />
                  </Form.Group>

                  <Form.Group controlId="Category">
                    <Form.Label>Kategori</Form.Label>
                    <Form.Control as="select">
                      {this.state.categories.map((cat) => (
                        <option key={cat.CategoryId}>
                          {cat.CategoryName}
                        </option>
                      ))}
                    </Form.Control>
                  </Form.Group>

                  <Form.Group controlId="dateOfJoining">
                    <Form.Label>Tarih</Form.Label>
                    <Form.Control
                      type="date"
                      name="dateOfJoining"
                      required
                      placeholder="Tarih"
                    />
                  </Form.Group>

                  <Form.Group>
                    <Button variant="primary" type="submit">
                      Ürün Ekle
                    </Button>
                  </Form.Group>
                </Form>
              </Col>
            </Row>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="danger" onClick={this.props.onHide}>
              Kapat
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}
