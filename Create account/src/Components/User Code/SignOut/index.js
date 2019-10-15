import React from 'react';

import { withFirebase } from '../Firebase';

const SignOutButton = ({ firebase }) => (
    <button type = "button" onClick = {firebase.signOut} >
        Sign out
    </button>
);

export default withFirebase(SignOutButton);