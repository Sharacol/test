import React from 'react';
import { withAuthorization } from '../Session'

const HomePage = ()=>{
    return(
        <div>
            Home
        </div>
    )
};

const renderCondition = authUser => !!authUser;

export default withAuthorization(renderCondition)(HomePage);