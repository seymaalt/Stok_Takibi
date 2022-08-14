import React,{useEffect} from "react";
import { Modal, Button, Row, Col, Form } from "react-bootstrap";
function addCategory(props) {
      
  function handleSubmit(event){ 
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

  return (
    <div className="container">
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header clooseButton>
          <Modal.Title id="contained-modal-title-vcenter">
           Kategori Ekle
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col sm={6}>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="CategoryName">
                  <Form.Label>Kategori Adı</Form.Label>
                  <Form.Control
                    type="text"
                    name="CategoryName"
                    required
                    placeholder="Kategori Adı"
                  />
                </Form.Group>
<br></br>
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
          <Button variant="danger" onClick={props.onHide}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default addCategory;
