import React, { Component } from 'react'

import { withFirebase } from '../../User Code/Firebase'
import { withAuthentication } from '../../User Code/Session'

class PurchaseForm extends Component{

    constructor(props){
        super(props)

        this.state = {
            test: "I'm decent",
            purchases: "blank",
            category: ''
        }
    }

    componentDidMount(){
        const userUid = this.props.firebase.auth.currentUser.uid;

            this.props.firebase.purchases(userUid).on("value", snapshot =>{
                if(snapshot.exists()){
                   purchases.map(value =>{
                       console.log(value)
                   })
                }else{

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
            [event.target.name] : event.target.value
        })
    }

    onSubmit = event =>{
        event.preventDefault();
        console.log("GOOD")
    }

    render(){
        const {test, purchases, category } = this.state;

        return(
            <form onSubmit = {this.onSubmit}>
                <input
                    name = 'category'
                    value= {category}
                    onChange = {this.onChange}
                    type= "text"
                    />
            </form>
        )
    }

}

export default withAuthentication(PurchaseForm);