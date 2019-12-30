import React, { Component } from 'react'

import { withFirebase } from '../../User Code/Firebase'
import { withAuthentication } from '../../User Code/Session'
import { Form, InputGroup } from 'react-bootstrap'

import { lastDayOfWeek, isSunday, subDays, getDate, getYear, getMonth } from 'date-fns'

class PurchaseForm extends Component {

    constructor(props) {
        super(props)

        this.state = {
            title: '',
            price: 0,
            categoriesAvailable: ["b", 'B', 'SD'],
            necessitiesAvailable: ["Need", "Want", "Optional"],
            categoryChosen: 'b',
            necessityChosen: 'Need',
            dateRange: '',
            monthRange: ''
        }
    }

    componentDidMount() {
        this.setPurchaseRanges();
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
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    onSubmit = event => {
        event.preventDefault();
        console.log("SUBMITTED")
    }

    setPurchaseRanges = () => {
        const currentDate = new Date();
        let nextSaturday = lastDayOfWeek(currentDate)
        let isItSunday = false;
        let pastSunday = currentDate;
        while (!isSunday(pastSunday)) {
            pastSunday = subDays(pastSunday, 1);
        }
        let dateRange =
            `${getDate(pastSunday)}\\${getYear(pastSunday)}-` +
            `${getDate(nextSaturday)}\\${getYear(nextSaturday)}`
        let monthRange =
            `${getMonth(pastSunday) + 1}\\${getYear(pastSunday)}-` +
            `${getMonth(nextSaturday) + 1}\\${getYear(nextSaturday)}`

        this.setState({
            dateRange,
            monthRange
        })
    }


    render() {
        const { title,
            price,
            categoriesAvailable,
            necessitiesAvailable,
            categoryChosen,
            necessityChosen,
            dateRange,
            monthRange } = this.state;
        console.log(title, price, categoryChosen, necessityChosen)
        return (
            <Form onSubmit={this.onSubmit}>
                <Form.Group controlId="PurchaseTitle">
                    <Form.Label>Title</Form.Label>
                    <Form.Control name="title" onChange={this.onChange} />
                </Form.Group>
                <Form.Group controlId="PurchasePrice">
                    <InputGroup.Prepend>
                        <InputGroup.Text id="MoneyPrepend">$</InputGroup.Text>
                    </InputGroup.Prepend>
                    <Form.Label>Price</Form.Label>
                    <Form.Control name="price" onChange={this.onChange} aria-describedby="MoneyPrepend" />
                </Form.Group>
                <Form.Group controlId="CategoryChoice" >
                    <Form.Label>Category</Form.Label>
                    <Form.Control as="select" name="categoryChosen" onChange={this.onChange}>
                        {
                            categoriesAvailable.map((val, index) => {
                                return (
                                    <option key={index}>{val}</option>
                                )
                            })
                        }
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId="NecessityChoice">
                    <Form.Label>Necessity</Form.Label>
                    <Form.Control as="select" name="necessityChosen" onChange={this.onChange}>
                        {
                            necessitiesAvailable.map((val, index) => {
                                return (
                                    <option id={index} key={index}>{val}</option>
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