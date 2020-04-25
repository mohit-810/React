import React  from 'react';

import { Card, CardImg, CardText, CardBody,
    CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';

  
    
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