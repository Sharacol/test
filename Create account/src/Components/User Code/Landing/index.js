import React, { Component } from 'react';

import { withFirebase } from '../../User Code/Firebase'
import { withAuthentication } from '../../User Code/Session'

class Landing extends Component {

    constructor(props) {
        super(props)
        this.state = ({
            errors: []
        })
    }

    componentDidMount() {
        console.log(this.props.firebase.auth, this.props.firebase.auth.currentUser)
        const userUid = this.props.firebase.auth.currentUser ? this.props.firebase.auth.currentUser.uid : '';
    if (userUid !== ''){
        this.props.firebase.purchases(userUid).on("value", snapshot => {
            if (snapshot.exists()) {
                purchases.map(value => {
                    console.log(value)
                })
            } else {

            }
            let purchases = snapshot.val();
            console.log(snapshot.exists())
        })
    }else{
        this.setState({
            errors: ['User not identified']
        })
    }

    }

    render() {
        const {errors } = this.state
        return (
            <div>
                {
                    errors.map((error, index)=>{
                        return(<div key = {index}>
                                {error}
                            </div>)
                    })
                }
                Landing
            </div>
        )
    }

};

export default withAuthentication(Landing);