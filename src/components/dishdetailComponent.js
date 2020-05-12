import React, { Component } from "react";
import { Card, CardImg, CardImgOverlay, CardBody, CardText, CardTitle } from "reactstrap";


class Dishdetail extends Component {
    constructor(props) {
        super(props);
    }
    renderComments(comments) {
        if (comments != null) {
            const commentList = comments.map((comment) => {
                return (
                    <div key={comment.id} className="row list-group-item">
                        <div className="col-12">
                            {comment.comment}
                        </div>
                        <div className="col-12">
                            -- {comment.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit' }).format(new Date(Date.parse(comment.date)))}
                        </div>
                    </div>
                );
            });
            return commentList;
        }
        else
            return (<div></div>);

    }
    render() {
        const dish = this.props.dish;
        if (dish != null) {
            return (
                <div className='container'>
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
                                {this.renderComments(dish.comments)}
                            </ul>
                        </div>
                    </div>
                </div>
            );
        }
        else
            return (<div></div>);
    }
}

export default Dishdetail;