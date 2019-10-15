import React from 'react';

import { PasswordForgetLink } from '../PasswordForget';
import PasswordChangeForm from '../PasswordChange';
import { withAuthorization, AuthUserContext } from '../Session'

const AccountPage = () => (
    <AuthUserContext.Consumer>
        {
            authUser =>(
                <div>
                    <h1>Account: {authUser.email}</h1>
                    <PasswordForgetLink />
                    <PasswordChangeForm />
                </div>
            )
        }

    </AuthUserContext.Consumer>

);

const renderCondition = authUser => !!authUser;

export default withAuthorization(renderCondition)(AccountPage);