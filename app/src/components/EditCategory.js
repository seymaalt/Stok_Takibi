import React, { Component } from 'react'
import {Modal,Button, Row, Col, Form} from 'react-bootstrap';
export default class EditCategory extends Component {
    constructor(props){
        super(props);
        this.handleSubmit=this.handleSubmit.bind(this);
        
    }

    handleSubmit(event){
        event.preventDefault();
        fetch(process.env.REACT_APP_API+'Category',{
            method:'PUT',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                CategoryId:event.target.CategoryId.value,
                CategoryName:event.target.CategoryName.value
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
                    Edit Department
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
        
                <Row>
                    <Col sm={6}>
                        <Form onSubmit={this.handleSubmit}>
                        <Form.Group controlId="CategoryId">
                                <Form.Label>Kategori ID</Form.Label>
                                <Form.Control type="text" name="CategoryId" required
                                disabled
                                defaultValue={this.props.catid} 
                                placeholder="CategoryName"/>
                            </Form.Group>
        
                            <Form.Group controlId="CategoryName">
                                <Form.Label>Kategori Adı</Form.Label>
                                <Form.Control type="text" name="CategoryName" required 
                                defaultValue={this.props.catname}
                                placeholder="CategoryName"/>
                            </Form.Group>
        
                            <Form.Group>
                                <Button variant="primary" type="submit">
                                    Güncelle
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
