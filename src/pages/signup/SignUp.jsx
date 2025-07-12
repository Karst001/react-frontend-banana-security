import React, {useEffect, useRef, useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './signup.css';

function SignUp() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState('');

    //initialize abortController
    const abortControllerRef = useRef(null);

    async function register(e) {
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

        //unable to submit the username to the API, the endpoint doesn't allow that
        //Sidenote: in a ideal world the API should also check if:
        //- the username or email already exists and return a message
        //Currently I can create several users with same email address
        try {
            const response = await axios.post(
                `${baseUrl}/api/users`,
                {
                    email: email,
                    password: password,
                    roles: ['admin']
                },
                {
                    headers: {
                        'novi-education-project-id': projectID,
                        'Content-Type': 'application/json'
                    },
                    signal: controller.signal,
                }
            );

            //verify if registration was successful by checking for response status 201
            if (response.status === 201) {
                console.log('Registratie succesvol:', response.data);

                //registration was successful, navigate to SignIn page so user can login
                navigate('/signin');
            }

        } catch (error) {
            const msg = error.response?.data?.message || 'Er is iets misgegaan bij de registratie.';
            setErrorMessage(msg);
            console.error('Fout bij registratie:', msg);
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
            <h1>Registreren</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur atque consectetur, dolore eaque
                eligendi
                harum, numquam, placeat quisquam repellat rerum suscipit ullam vitae. A ab ad assumenda, consequuntur
                deserunt
                doloremque ea eveniet facere fuga illum in numquam quia reiciendis rem sequi tenetur veniam?</p>

            <form onSubmit={register}>
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

                <div>
                    <label htmlFor="username">Gebruikersnaam:</label><br/>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>

                <button type="submit">
                    Registreren
                </button>

                {/*if there was an error, display it here*/}
                {errorMessage && (
                    <p className="error-message">{errorMessage}</p>
                )}
            </form>

            <p>Heb je al een account? Je kunt je <Link to="/signin">hier</Link> inloggen.</p>
        </>
    );
}

export default SignUp;