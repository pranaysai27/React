import React , { Component } from 'react'
import { Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem,Button, Label, Row,Modal,ModalBody,ModalHeader, Col } from 'reactstrap'
import { Link } from 'react-router-dom'
import { Control , LocalForm,  Errors } from 'react-redux-form'
import { Loading } from './LoadingComponent'
import {baseUrl} from '../shared/baseUrl'

const minLength = (len) => (val) => val && (val.length >= len )
const maxLength = (len) => (val) => !(val) || (val.length <= len )


function RenderDish({dish}){
	return(
		<div className="col-12 col-md-5 m-1">
			<Card>
				<CardImg width="100%" src={baseUrl + dish.image} alt={dish.name}/>
				<CardBody>
					<CardTitle>{dish.name}</CardTitle>
					<CardText>{dish.description}</CardText>
				</CardBody>
			</Card>
		</div>
	)
}
function RenderComments({comments,postComment,dishId}){
	if(comments!=null){
		return(
			<div >
				{
					comments.map((comment, i) => {
						return (
							
							<ul className ='list-unstyled' key = {comment.id}>
								<li>
									<div>{comment.comment}</div>
									<div>{`-- ${comment.author} , ${new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day:'2-digit'}).format(new Date(Date.parse(comment.date)))}`}</div>
								</li>
							</ul>
							
						)
					})
				}
				<CommentForm dishId={dishId} postComment={postComment} />
			</div>
			
		)
	}
}
const  DishDetail = (props) => {

    if(props.isLoading ) {
        return(
            <div className="container">
                <div className="row">
                    <Loading/>
                </div>
            </div>
        )
    }
    else if(props.errMess) {
        return(
            <div className="container">
                <div className="row">
                    <h4>{props.errMess}</h4>
                </div>
            </div>
        )
    }
	if(props.dish!=null){
        return (
            <div className = "container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to="/home">Home</Link> </BreadcrumbItem>
                        <BreadcrumbItem><Link to="/menu">Menu</Link> </BreadcrumbItem>
                        <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{props.dish.name}</h3>
                        <hr/>
                    </div>
                </div>
                <div className = "row">
                    <RenderDish dish={props.dish}/>
                    <div className = 'col-12 col-md-5 m-1'>
                        <h4>Comments</h4>
                        <RenderComments comments={props.comments}
                                        postComment={props.postComment}
                                        dishId = {props.dish.id} />
                        
                    </div>
                </div>
            </div>
        )
    }
    else{
        return (<div></div>)
    }
}

class CommentForm extends Component {

    constructor(props) {
        super(props)
        this.state= {
            isModalOpen:false,
            isNavOpen : false
        }
        this.toggleModal=this.toggleModal.bind(this);
        this.handleSubmit=this.handleSubmit.bind(this)
    }
    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }
    handleSubmit(values) {
        this.toggleModal()
        this.props.postComment(this.props.dishId,values.rating,values.username,values.comment)
    }
    render() {
        return(
            <>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader  toggle={this.toggleModal}>Submit Comment</ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={ (values) => this.handleSubmit(values)}>
                            
                            <Row className="form-group">
                                <Col sm = {12}><Label htmlFor = 'rating'>Rating</Label></Col>
                                <Col md={10}>
                                    <Control.select model=".rating" className="form-control" name="rating">
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                    </Control.select>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col sm = {12}><Label htmlFor = 'username'>Your Name</Label></Col>
                                <Col md={10}>
                                    <Control.text model=".username" className="form-control" name="username"
                                        placeholder="Your Name"
                                        validators={{
                                            minLength:minLength(3),maxLength:maxLength(15)
                                        }}
                                    />
                                    <Errors 
                                        className="text-danger"
                                        model=".username"
                                        show="touched"
                                        messages= {{
                                            minLength:"Must be greater than 2 characters",
                                            maxLength:"Must be 15 characters or less",
                                        }}
                                    />
                                </Col>
                            </Row>
                            
                            <Row className="form-group">
                                <Col sm = {12}><Label htmlFor = 'comment'>Comment</Label></Col>
                                <Col md={10}>
                                    <Control.textarea model=".comment" className="form-control" name="comment"
                                        rows="6"
                                    />
                                         
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col md={{size:10,offset:2}}>
                                    <Button type="submit" color="primary">
                                        Submit
                                    </Button>
                                </Col>
                            </Row>
                        </LocalForm>
                    </ModalBody>
                </Modal>
                <Button outline onClick={this.toggleModal}>
                    <span className="fa fa-pencil fa-lg"></span>
                    Submit Comment
                </Button>
            </>
        )
    }
}


export default DishDetail  





