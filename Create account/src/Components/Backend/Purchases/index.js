import React, { Component } from 'react'

import { withFirebase } from '../../User Code/Firebase'

class Purchases extends Component{

    constructor(props){
        super(props)

        this.state = {
            test: "I'm decent",
            purchases: "blank"
        }
    }

    componentDidMount(){
        this.props.firebase.purchases().on("value", snapshot =>{
            let purchases = snapshot.val();
            // this.setState({
            //     purchases
            // })
            purchases.map(value =>{
                console.log(value)
            })
        })


    }

    render(){
        let {test, purchases } = this.state;
        return(
            <div>
                {test}
                {purchases}
            </div>
        )
    }

}

export default withFirebase(Purchases);