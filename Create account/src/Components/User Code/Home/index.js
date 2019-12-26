import React from 'react';
import { withAuthorization } from '../Session'
import Purchases from '../../Backend/Purchases'

const PurchasePage = ()=>{
    return(
        <div>
            <Purchases/>
            Purchases
        </div>
    )
};

const renderCondition = authUser => !!authUser;

export default withAuthorization(renderCondition)(PurchasePage);