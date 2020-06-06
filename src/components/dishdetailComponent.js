import React from "react";
import { Card, CardImg, CardBody, CardText, CardTitle, BreadcrumbItem, Breadcrumb } from "reactstrap";
import { Link } from 'react-router-dom'

function RenderComments({ comments }) {
    if (comments != null) {
        const commentList = comments.map((comment) => {
            return (
                <li key={comment.id} className="row list-group-item">
                    <div className="col-12">
                        {comment.comment}
                    </div>
                    <div className="col-12">
                        -- {comment.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit' }).format(new Date(Date.parse(comment.date)))}
                    </div>
                </li>
            );
        });
        return commentList;
    }
    else
        return (<div></div>);
}

function Dishdetail(props) {

    const dish = props.dish;
    const comments = props.comments;
    if (dish != null) {
        return (
            <div className='container'>
                <div className="row">
                    <Breadcrumb>
                        
                        <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{props.dish.name}</h3><hr />
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 col-md-5 m-1">
                        <Card>
                            <CardImg width="100%" src={dish.image} alt={dish.name} />
                            <CardBody>
                                <CardTitle>{dish.name}</CardTitle>
                                <CardText>{dish.description}</CardText>
                            </CardBody>
                        </Card>
                    </div>
                    <div className="col-12 col-md-5 m-1">
                        <h4>Comments</h4>
                        <ul className="list-unstyled">
                            <RenderComments comments={comments} />
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
    else
        return (<div></div>);
}


export default Dishdetail;