import React, {useContext, useEffect, useRef} from 'react';
import {AuthContext} from "../../context/AuthContext";

function SignedOut() {
    const auth = useContext(AuthContext);

    //Trigger userLogout on mounting page, only then toggle the state
    //even when user uses the Back button on the browser the logged-in state does not show up again as the state remains 'not logged in'
    useEffect(() => {
        auth.logout(); //set the state to logout inside AuthContextProvider
    }, []);


    return (
        <>
            <h1>U bent nu uitgelogd</h1>
            <p>Tot ziens, u mag de browser nu afsluiten.</p>
        </>
    );
}

export default SignedOut;