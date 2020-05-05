import React from 'react';

import { Card, CardImg, CardText, CardBody,
    CardTitle, Breadcrumb, BreadcrumbItem,Button,ModalHeader,Modal,ModalBody,Row,Label,Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Component } from 'react';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';
import { FadeTransform, Fade, Stagger } from 'react-animation-components';

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
        this.toggleModal();
        this.props.postComment(this.props.dishId, values.rating, values.author, values.comments);
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
                    <Control.text model=".author" id="author" name="author"placeholder="Your Name"
                     className="form-control"  validators={{
                        required, minLength: minLength(3), maxLength: maxLength(15)
                    }}/>
                    <Errors
                                        className="text-danger"
                                        model=".author"
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

            <FadeTransform
                in
                transformProps={{
                    exitTransform: 'scale(0.5) translateY(-50%)'
                }}>

                        <Card>
                        <CardImg top src={baseUrl + dish.image} alt={dish.name} />
                            <CardBody>
                            <CardTitle>{dish.name}</CardTitle>
                            <CardText>{dish.description}</CardText>
                            </CardBody>
                        </Card>
                    </FadeTransform>
                </div>
            );
        }
        else {
            return(<div></div>);
        }
    }

     function RenderComments({commentsArray,postComment,dishId}) {
        let options = { year: "numeric", month: "short", day: "numeric"};
        if(commentsArray != null) {
            
            commentsArray = commentsArray.map((value) => {
               
                return(
                    <div className="container">
                        <ul className="list-unstyled">
                        <Stagger in>
                            <Fade in>
                            <li className="mt-3">{value.comment}</li>
                            <li className="mt-3">{"-- "}{value.author}{", "}{new Date(value.date).toLocaleDateString("en-US",options)}</li>
                            </Fade>
                            </Stagger>
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
                <CommentForm dishId={dishId} postComment={postComment} />
            </div>
        );
    }
    

    const  DishDetail = (props,addComment,dishId) =>  {
    
           
    
        
        const DISH = props.selectedDish;
        if(props.isLoading){
            return(
                <div className="container">
                    <div className="row">
                        <Loading />
                    </div>
                </div>

            );
        }
        else if (props.errMess) {
            return(
                <div className="container">
                    <div className="row">            
                        <h4>{props.errMess}</h4>
                    </div>
                </div>
            );
        }
       else  if(DISH != null) {
            
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
                        <RenderComments commentsArray={commentsArray}
                        postComment={props.postComment}
                        dishId={DISH.id}/>
                       
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