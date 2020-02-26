import React, { Component } from 'react'

import { withFirebase } from '../../User Code/Firebase'
import { withAuthentication } from '../../User Code/Session'
import { Form, InputGroup, Button } from 'react-bootstrap'

import { lastDayOfWeek, isSunday, subDays, getDate, getYear, getMonth } from 'date-fns'

class PurchaseForm extends Component {

    constructor(props) {
        super(props)

        this.state = {
            uid: null,
            title: '',
            price: 0,
            categoriesAvailable: [
                "Food", 'Housing', 'Transportation',
                "Entertainment", "Miscellaneous",
                "Personal", "Medical"
            ],
            necessitiesAvailable: ["Critical", "Optional", "Unnecessary"],
            categoryChosen: 'Food',
            necessityChosen: 'Critical',
            dateRange: '',
            monthRange: ''
        }
    }

    componentDidMount() {
        this.setPurchaseRanges();
        let uid = this.props.firebase.auth.currentUser.uid ? this.props.firebase.auth.currentUser.uid : null;

        this.setState({
            uid
        })
    }

    onChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    onSubmit = event => {
        event.preventDefault();
        let uid = this.state.uid;
        if(uid){
            this.props.firebase.purchases(uid).set({
            t: 'sdf',

            })
        }

        this.setState({
            categoryChosen: 'Food',
            necessityChosen: 'Critical',
            title: '',
            price: 0,
        })
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
                    <Form.Control name="title" onChange={this.onChange} value={title} />
                </Form.Group>
                <Form.Group controlId="PurchasePrice">
                    <InputGroup.Prepend>
                        <InputGroup.Text id="MoneyPrepend">$</InputGroup.Text>
                    </InputGroup.Prepend>
                    <Form.Label>Price</Form.Label>
                    <Form.Control name="price" onChange={this.onChange} aria-describedby="MoneyPrepend" value={price} />
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
                <Button type="submit">
                    Submit
                </Button>
            </Form>
        )
    }

}

export default withAuthentication(PurchaseForm);