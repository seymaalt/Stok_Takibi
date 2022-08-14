import React, { Component } from 'react'
import {Modal,Button, Row, Col, Form} from 'react-bootstrap';
export default class AddCategory extends Component {
    constructor(props){
        super(props);
        this.handleSubmit=this.handleSubmit.bind(this);
    }
    handleSubmit(event){ 
    try{  
        event.preventDefault();
        fetch(process.env.REACT_APP_API+'Category',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                CategoryId:0,
                CategoryName:event.target.CategoryName.value
            })
        })
        .then(res=>res.json())
        .then((result)=>{
            alert(result);
        })}
        catch(error)  {
             console.log({error});
        } 
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
                    Add Category
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
        
                <Row>
                    <Col sm={6}>
                        <Form onSubmit={this.handleSubmit}>
                            <Form.Group controlId="CategoryName">
                                <Form.Label>Kategori Ekle</Form.Label>
                                <Form.Control type="text" name="CategoryName" required 
                                placeholder="CategoryName"/>
                            </Form.Group>
        
                            <Form.Group>
                                <Button variant="primary" type="submit">
                                    Kategori Ekle
                                </Button>
                            </Form.Group>
                        </Form>
                    </Col>
                </Row>
            </Modal.Body>
            
            <Modal.Footer>
                <Button variant="danger" onClick={this.props.onHide}>Kapat</Button>
            </Modal.Footer>
        
        </Modal>
        </div>
    )
  }
}
