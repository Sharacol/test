import React, { Component } from 'react';

import { withFirebase } from '../../User Code/Firebase'
import { withAuthentication } from '../../User Code/Session'

class Landing extends Component {

    constructor(props) {
        super(props)

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
            console.log(snapshot.exists())
        })
    }

    render() {

        return (
            <div>
                Landing
            </div>
        )
    }

};

export default Landing;