import React, {Component} from 'react';
import {withFirebase} from '../Firebase'
import {Link, withRouter} from 'react-router-dom';

import { compose } from 'recompose'

import * as ROUTES from '../../Constants/routes';

const INITIAL_STATE ={
    username: "",
    email :"",
    password1 : "",
    password2 : "",
    error : null
}

const SignUpPage = () =>(
    <div>
        <h1>
            Do the things!!!
        </h1>
        <SignUpForm />
    </div>
)

class SignUpFormBase extends Component{

    constructor(props){
        super(props);
        this.state = {...INITIAL_STATE};
    }

    onSubmit = event =>{
        const {username, password1, email} = this.state;

        this.props.firebase.createNewUser(email, password1)
            .then( authUser=>{
                    this.setState({...INITIAL_STATE})
                    this.props.history.push(ROUTES.HOME)
                }
            ).catch(error=>{
                console.log(error)
                this.setState({error})
            })

        event.preventDefault();
    }

    onChange = event =>{
        this.setState({
            [event.target.name] : event.target.value
        })
    }
    render(){
        const {
            username,
            password1,
            password2,
            email,
            error
        }= this.state;

        const isValid = 
            username !== "" &&
            password1 === password2 &&
            password1 !== "" &&
            email !== "";

        return(
            <form onSubmit = {this.onSubmit} >
                <input
                name="username"
                value={username}
                onChange={this.onChange}
                type="text"
                placeholder="Full Name"
                />
                <input
                name="email"
                value={email}
                onChange={this.onChange}
                type="text"
                placeholder="Email Address"
                />
                <input
                name="password1"
                value={password1}
                onChange={this.onChange}
                type="password"
                placeholder="Password"
                />
                <input
                name="password2"
                value={password2}
                onChange={this.onChange}
                type="password"
                placeholder="Confirm Password"
                />
                <button disabled = {!isValid} type="submit">Sign Up</button>

                {error && <p>{error.message}</p>}
            </form >
        )
    }


};

const SignUpLink = ()=>(
    <p>
        No account? easy: <Link to = {ROUTES.SIGN_UP}>Sign up, YO </Link>
    </p>
)

const SignUpForm = compose( 
    withRouter, 
    withFirebase,
)(SignUpFormBase)

export default SignUpPage;

export {SignUpLink, SignUpForm}