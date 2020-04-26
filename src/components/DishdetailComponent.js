import React from 'react';

import { Card, CardImg, CardText, CardBody,
    CardTitle, Breadcrumb, BreadcrumbItem,Button,ModalHeader,Modal,ModalBody,Row,Label,Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Component } from 'react';
import { Control, LocalForm, Errors } from 'react-redux-form';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);  


class CommentForm extends Component{


    constructor(props) {
        super(props);
    
        
        this.state = {
         
          isModalopen: false
        };
        
        this.toggleModal = this.toggleModal.bind(this);
        this.handleLogin = this.handleSubmit.bind(this); 
        
   
   
   
    }  
    
    
    toggleModal() {
        this.setState({
          isModalOpen: !this.state.isModalOpen
        });
    }
    handleSubmit(values) {
        console.log('Current State is: ' + JSON.stringify(values));
        alert('Current State is: ' + JSON.stringify(values));
        // event.preventDefault();
    }
    
    render(){

        return(

            <div >
            <Button outline onClick={this.toggleModal}>
              <span className="fa fa-pencil" /> Submit Comment
            </Button>
            <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
            <ModalHeader toggle={this.toggleModal}>Comment Form</ModalHeader>
            <ModalBody>
                </ModalBody>
                <div className="container">
                <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                <Row className="form-group">
                   
                <Label htmlFor="rating" md={12}>
                  Rating
                </Label> 
                <Col md={12}>

                 <Control.select model="rating" name="rating" className="form-control" >
                 <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                   </Control.select>
                    </Col>
                    </Row>
                    <Row className="form-group">
                    <Label htmlFor="yourname" md={12}>Your Name</Label>
                    <Col md={12}>
                    <Control.text model=".yourname" id="yourname" name="yourname"placeholder="Your Name"
                     className="form-control"  validators={{
                        required, minLength: minLength(3), maxLength: maxLength(15)
                    }}/>
                    <Errors
                                        className="text-danger"
                                        model=".yourname"
                                        show="touched"
                                        messages={{
                                            required: 'Required',
                                            minLength: 'Must be greater than 2 characters',
                                            maxLength: 'Must be 15 characters or less'
                                        }}
                                     />
                    </Col>
                    </Row>
                    <Row className="form-group">
                                <Label htmlFor="comments" md={12}>Comments</Label>
                                <Col md={10}>
                                    <Control.textarea model=".comments" id="comments" name="comments"
                                        rows="6"
                                        className="form-control" />
                                </Col>
                            </Row>
                                 <Button type="submit" value="submit" color="primary">
                                             Submit
                                 </Button>

                </LocalForm>
                </div>
                </Modal>
                </div>
            );
      }

  }
    
function RenderDish({dish}) {
   

        if(dish != null) {
            return(
                <div>
                    <Card>
                        <CardImg width="100%" src={dish.image}></CardImg>
                        <CardBody>
                        <CardTitle>{dish.name}</CardTitle>
                        <CardText>{dish.description}</CardText>
                        </CardBody>
                    </Card>
                </div>
            );
        }
        else {
            return(<div></div>);
        }
    }

     function RenderComments({commentsArray}) {
        let options = { year: "numeric", month: "short", day: "numeric"};
        if(commentsArray != null) {
            commentsArray = commentsArray.map((value) => {
                return(
                    <div className="container">
                        <ul className="list-unstyled">
                            <li className="mt-3">{value.comment}</li>
                            <li className="mt-3">{"-- "}{value.author}{", "}{new Date(value.date).toLocaleDateString("en-US",options)}</li>
                        </ul>
                    </div>
                );
            });
        }
        else{
            return(
                <div></div>
            );
        }
        return(
            <div>
                {commentsArray}
            </div>
        );
    }

    const  DishDetail = (props) =>  {
    
           
    
        
        const DISH = props.selectedDish;
        if(DISH != null) {
            
            const commentsArray = props.comments;
            return(
            <div className="container">
                <div className="row">
                    <Breadcrumb>

                        <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props.selectedDish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{props.selectedDish.name}</h3>
                        <hr />
                    </div>                
                </div>
            

                <div className="row">
                    <div className="col-12 col-md-5 m-1">
                    <RenderDish dish= {DISH} />
                    </div>
                    <div className="col-12 col-md-5 m-1">
                        <h4>Comments</h4>
                        <RenderComments commentsArray={commentsArray}/>
                       <CommentForm/>
                    </div>
                </div>
                </div>
            );
        }
        else {
            return(
                <div></div>
            );
        }
    }


    export default DishDetail;