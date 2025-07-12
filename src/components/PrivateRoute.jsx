import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext.jsx';

function PrivateRoute({ children }) {
    const { userIsAuthenticated } = useContext(AuthContext);

    if (!userIsAuthenticated) {
        // Redirect to sign-in page in case the user is not authenticated
        //you can test this by entering http://localhost:5173/profile, it will redirect to the login page so manually tampering with the url is blocked now for this url
        return <Navigate to="/signin" replace />;
    }

    // Render the protected component when authenticated
    return children;
}

export default PrivateRoute;