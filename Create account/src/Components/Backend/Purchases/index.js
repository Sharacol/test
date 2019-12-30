import React, { Component } from 'react'

import { withFirebase } from '../../User Code/Firebase'
import { withAuthentication } from '../../User Code/Session'
import { Form, InputGroup } from 'react-bootstrap'

import { lastDayOfWeek, isSunday, subDays, getDate, getYear, getMonth} from 'date-fns'

class PurchaseForm extends Component {

    constructor(props) {
        super(props)

        this.state = {
            test: "I'm decent",
            purchases: "blank",
            categories: ["b", 'B', 'SD'],
            necessities: ["Need", "Want", "Optional"]
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

    getPurchaseRanges = () =>{
        const currentDate = new Date();
        let nextSaturday = lastDayOfWeek(currentDate)
        let isItSunday = false;
        let pastSunday = currentDate;
        while(!isSunday(pastSunday)){
            pastSunday = subDays(pastSunday,1);
        }
        let dateRange = 
            `${getDate(pastSunday)}\\${getYear(pastSunday)}-`+
            `${getDate(nextSaturday)}\\${getYear(nextSaturday)}`
        let monthRange = 
            `${getMonth(pastSunday) + 1}\\${getYear(pastSunday)}-`+
            `${getMonth(nextSaturday) + 1}\\${getYear(nextSaturday)}`

        return ({
            dateRange,
            monthRange
        })
    }


    render() {
        const { test, purchases, categories, necessities } = this.state;
        console.log(this.getPurchaseRanges().monthRange)
        return (
            <Form onSubmit={this.onSubmit}>
                <Form.Group controlId="PurchaseTitle">
                    <Form.Label>Title</Form.Label>
                    <Form.Control name="Title" onChange={this.onChange} />
                </Form.Group>
                <Form.Group controlId="PurchasePrice">
                    <InputGroup.Prepend>
                        <InputGroup.Text id="inputGroupPrepend">$</InputGroup.Text>
                    </InputGroup.Prepend>
                    <Form.Label>Price</Form.Label>
                    <Form.Control name="Price" onChange={this.onChange} aria-describedby="inputGroupPrepend"/>
                </Form.Group>
                <Form.Group controlId="NecessityChoice">
                    <Form.Label>Necessity</Form.Label>
                    <Form.Control as="select" name="Necessity" onChange={this.onChange}>
                        {
                            necessities.map((val, index) => {
                                return (
                                    <option id = {index} key={index}>{val}</option>
                                )
                            })
                        }
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId="CategoryChoice" >
                    <Form.Label>Category</Form.Label>
                    <Form.Control as="select" name="Category" onChange={this.onChange}>
                        {
                            categories.map((val, index) => {
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