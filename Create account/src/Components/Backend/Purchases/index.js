import React, { Component } from 'react'

import { withFirebase } from '../../User Code/Firebase'
import { withAuthentication } from '../../User Code/Session'
import { Form, InputGroup } from 'react-bootstrap'

class PurchaseForm extends Component {

    constructor(props) {
        super(props)

        this.state = {
            test: "I'm decent",
            purchases: "blank",
            category: ["b", 'B', 'SD'],

            necessity: ["Need", "Want", "Optional"]
        }
    }

    componentDidMount() {
        const userUid = this.props.firebase.auth.currentUser.uid;

        this.props.firebase.purchases(userUid).on("value", snapshot => {
            if (snapshot.exists()) {
                purchases.map(value => {
                    console.log(value)
                })
            } else {

            }
            let purchases = snapshot.val();
            // this.setState({
            //     purchases
            // })
            console.log(snapshot.exists())
        })
    }

    onChange = event => {
        console.log(event.target.name)
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    onSubmit = event => {
        event.preventDefault();
        console.log("GOOD")
    }

    render() {
        const { test, purchases, category, necessity } = this.state;

        return (
            <Form onSubmit={this.onSubmit}>
                <Form.Group controlId="exampleForm.ControlInput1">
                    <Form.Label>Title</Form.Label>
                    <Form.Control name="Title" onChange={this.onChange} />
                </Form.Group>
                <Form.Group controlId="exampleForm.ControlInput1">
                    <InputGroup.Prepend>
                        <InputGroup.Text id="inputGroupPrepend">$</InputGroup.Text>
                    </InputGroup.Prepend>
                    <Form.Label>Price</Form.Label>
                    <Form.Control name="Price" onChange={this.onChange} aria-describedby="inputGroupPrepend"/>
                </Form.Group>
                <Form.Group controlId="exampleForm.ControlSelect2">
                    <Form.Label>Necessity</Form.Label>
                    <Form.Control as="select" name="Necessity" onChange={this.onChange}>
                        {
                            necessity.map((val, index) => {
                                return (
                                    <option key={index}>{val}</option>
                                )
                            })
                        }
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId="exampleForm.ControlSelect2" >
                    <Form.Label>Category</Form.Label>
                    <Form.Control as="select" name="Category" onChange={this.onChange}>
                        {
                            category.map((val, index) => {
                                return (
                                    <option key={index}>{val}</option>
                                )
                            })
                        }
                    </Form.Control>
                </Form.Group>
            </Form>
        )
    }

}

export default withAuthentication(PurchaseForm);