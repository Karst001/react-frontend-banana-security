import React, {useContext, useEffect, useRef, useState} from 'react';
import {Link} from 'react-router-dom';
import {AuthContext} from "../../context/AuthContext";
import axios from 'axios';

function SignIn() {
    //initialize states
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    //initialize context
    const auth = useContext(AuthContext);

    //initialize abortController
    const abortControllerRef = useRef(null);

    //function that makes the call to api for Signing In
    async function handleSubmit(e) {
        e.preventDefault();

        //clear any previous error messages
        setErrorMessage('');

        // check if there are any previous request, if so, cancel them
        if (abortControllerRef.current) {
            abortControllerRef.current.abort();
        }

        const controller = new AbortController();
        abortControllerRef.current = controller;

        const projectID = 'a7b1a986-f092-4bc0-b189-ce44d694a02c';
        const baseUrl = 'https://novi-backend-api-wgsgz.ondigitalocean.app';

        try {
            const response = await axios.post(
                `${baseUrl}/api/login`,
                {
                    email: email,
                    password: password,
                },
                {
                    headers: {
                        'novi-education-project-id': projectID,
                        'Content-Type': 'application/json',
                    },
                    signal: controller.signal,
                }
            );

            //verify if login was successful by checking for response status 200
            if (response.status === 200) {
                console.log('Login succes:', response.data);

                //pass data to AuthContext to update states and handle token / user details
                auth.login(response.data);
            }

        } catch (error) {
            const msg = error.response?.data?.error;
            setErrorMessage(msg);
            console.error('Login mislukt:', error.response?.data || error.message);

            //reset login credentials
            setEmail('');
            setPassword('');
        }
    }

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            if (abortControllerRef.current) {
                abortControllerRef.current.abort();
            }
        };
    }, []);

    return (
        <>
            <h1>Inloggen</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab alias cum debitis dolor dolore fuga id
                molestias qui quo unde?</p>

            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="email">Emailadres:</label><br/>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>

                <div>
                    <label htmlFor="password">Wachtwoord:</label><br/>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>

                <button type="submit">
                    Inloggen
                </button>

                {/*if there was an error, display it here*/}
                {errorMessage && (
                    <p className="error-message">{errorMessage}</p>
                )}
            </form>

            <p>Heb je nog geen account? <Link to="/signup">Registreer</Link> je dan eerst.</p>
        </>
    );
}

export default SignIn;