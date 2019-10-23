import React from 'react';
import { withAuthorization } from '../Session'
import Purchases from '../../Backend/Purchases'

const HomePage = ()=>{
    return(
        <div>
            <Purchases/>
            Home
        </div>
    )
};

const renderCondition = authUser => !!authUser;

export default withAuthorization(renderCondition)(HomePage);