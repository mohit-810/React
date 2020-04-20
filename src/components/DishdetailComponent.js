import React,{Component} from 'react';
import { Card, CardImg, CardBody, CardTitle, CardText } from 'reactstrap';

class DishDetail extends Component{
    constructor(props){
        super(props);
    }

    renderDish(dish) {
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

    renderComments(commentsArray) {
        let options = { year: "numeric", month: "short", day: "numeric"};
        if(commentsArray != null) {
            this.item = commentsArray.map((value) => {
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
                {this.item}
            </div>
        );
    }

    render(){
        const DISH = this.props.selectedDish;
        if(DISH != null) {
            
            const commentsArray = DISH.comments;
            return(
                <div className="row">
                    <div className="col-12 col-md-5 m-1">
                        {this.renderDish(DISH)}
                    </div>
                    <div className="col-12 col-md-5 m-1">
                        <h4>Comments</h4>
                        {this.renderComments(commentsArray)}
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
}

    export default DishDetail;