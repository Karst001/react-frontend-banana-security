import React, {createContext, useEffect, useState} from 'react';
import Loader from "../components/Loader";
import {useNavigate} from "react-router-dom";
import axios from 'axios';
import { validateToken } from '../helpers/ValidateToken';


//assignment part 2
//https://github.com/hogeschoolnovi/frontend-react-banana-security-professional/blob/master/README.md

// Define a context object that will provide auth data and functions
export const AuthContext = createContext({});

function AuthContextProvider({ children }) {
    // authState tracks if user is logged in, name of user, loading status
    const [authState, setAuthState] = useState({
        isAuth: false,       // whether the user is authenticated
        user: '',            // user info (object or empty initially)
        status: 'pending',   // 'pending' means we’re still checking (e.g. on refresh)
    });

    const navigate = useNavigate();

    useEffect(() => {
        console.log("Context was refreshed");

        const token = localStorage.getItem('token');
        const decodedToken = validateToken(token);

        if (!decodedToken) {
            setAuthState({
                isAuth: false,
                user: null,
                status: 'done',
            });
            return;
        }

        const userId = decodedToken.userId;

        const getUser = async () => {
            try {
                // Simulate a delay to invoke the spinner, would be the same with slow internet or delayed response from the server
                await new Promise(resolve => setTimeout(resolve, 350));

                const response = await axios.get(
                    `https://novi-backend-api-wgsgz.ondigitalocean.app/api/users/${userId}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            'novi-education-project-id': 'a7b1a986-f092-4bc0-b189-ce44d694a02c',
                        },
                    }
                );

                //store response
                const userData = response.data;

                //the endpoint doesn't return a userName so hardcoded for now otherwise on refresh the username is empty
                userData.username = 'karst001';

                //update state
                setAuthState({
                    isAuth: true,
                    user: userData,
                    status: 'done',
                });

                //save in localStorage
                localStorage.setItem('user', JSON.stringify(userData));

            } catch (error) {
                console.error("Could not retrieve user data for user with id: " + {userId}, error);

                setAuthState({
                    isAuth: false,
                    user: null,
                    status: 'done',
                });
            }
        };

        getUser();
    }, []);


    //this function is called from the login page via the context provider, able to update the local state and email address
    function login(userDetails) {
        console.log(userDetails);

        const token = userDetails.token;
        localStorage.setItem('token', token);

        const fetchedUser = {
            username: 'karst001', //the endpoint doesn't return a userName so hardcoded for now
            email: userDetails.user.email,
        };

        // save user info to localStorage
        localStorage.setItem('user', JSON.stringify(fetchedUser));

        // Logged in so set state to 'logged in', status to 'done' and save user state
        setAuthState({
            isAuth: true,
            user: fetchedUser,
            status: 'done',
        });

        console.log('User is logged in as:', fetchedUser);

        navigate('/profile');
    }


    //this function is called from the logout page via the context provider, able to update the local state and reset email address
    function logout() {
        // Remove saved token and user info
        localStorage.removeItem('token');
        localStorage.removeItem('user');

        // Update state to logged out
        setAuthState({
            isAuth: false,
            user: null,
            status: 'done',
        });
        console.log('User is logged out');
    }


    //updated data object, now with user details so it can be passed on to other pages
    const data = {
        ...authState,
        userIsAuthenticated: authState.isAuth,
        user: authState.user,           // the current user object
        login: login,               // function to log in
        logout: logout,             // function to log out
    };

    // Finally, render loader if status is pending, otherwise show app content
    return (
        <AuthContext.Provider value={data}>
            {authState.status === 'pending' ? (
                <Loader />
            ) : (
                children
            )}
        </AuthContext.Provider>
    );
}

export default AuthContextProvider;

