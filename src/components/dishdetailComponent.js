import React, { Component } from "react";
import { Card, CardImg, CardBody, CardText, CardTitle, BreadcrumbItem, Breadcrumb, Button, Modal, ModalHeader, ModalBody, Label, Input, Row, Col } from "reactstrap";
import { Link } from 'react-router-dom'
import { Control, LocalForm, Errors } from 'react-redux-form';


const maxLength = (length) => (val) => !val || val.length <= length;
const minLength = (length) => (val) => !val || val.length >= length;
class CommentForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isModalOpen: false
        };

        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    toggleModal() {
        this.setState({ isModalOpen: !this.state.isModalOpen });
    }

    handleSubmit(values) {
        this.toggleModal();
        console.log("Current State is : " + JSON.stringify(values));
        alert("Current State is : " + JSON.stringify(values));
    }
    render() {
        return (
            <React.Fragment>
                <Button outline onClick={this.toggleModal}>
                    <span className="fa fa-pencil fa-lg"></span> Submit Comment
                </Button>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader isOpen={this.state.isModalOpen} toggle={this.toggleModal}>Submit Comment</ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                            <Row className='form-group'>
                                <Label htmlFor="rating" md={2}>Rating</Label>
                                <Col md={12}>
                                    <Control.select model=".rating" name="rating" className='form-control'>
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                    </Control.select>
                                </Col>
                            </Row>
                            <Row className='form-group'>
                                <Label htmlFor="name" md={3}>Your Name</Label>
                                <Col md={12}>
                                    <Control.text model=".name" name="name" placeholder="Your Name" className='form-control' 
                                        validators={{
                                            maxLength:maxLength(15),minLength:minLength(3)
                                        }}
                                    />
                                    <Errors className='text-danger'
                                        model='.name'
                                        show='touched'
                                        messages={{
                                            minLength: 'Must be greater than 2 characters',
                                            maxLength: 'Must be less than 15 characters',
                                        }}
                                    />
                                </Col>
                            </Row>
                            <Row className='form-group'>
                                <Label htmlFor='comment' md={2}>Comment</Label>
                                <Col md={12}>
                                    <Control.textarea rows="6" model=".comment" name="comment" className='form-control' />
                                </Col>
                            </Row>
                            <Col>
                                <Button type="submit" color="primary">Submit</Button>
                            </Col>
                        </LocalForm>
                    </ModalBody>
                </Modal>
            </React.Fragment>
        );
    }
};

function RenderComments({ comments }) {
    if (comments != null) {
        const commentList = comments.map((comment) => {
            return (
                <ul>
                    <li key={comment.id} className="row list-group-item">
                        <div className="col-12">
                            {comment.comment}
                        </div>
                        <div className="col-12">
                            -- {comment.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit' }).format(new Date(Date.parse(comment.date)))}
                        </div>
                    </li>
                </ul>
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
                        <RenderComments comments={comments} />
                        <CommentForm />
                    </div>
                </div>
            </div>
        );
    }
    else
        return (<div></div>);
}


export default Dishdetail;