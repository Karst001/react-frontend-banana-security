import React from 'react';
import logo from '../assets/banana-01.png';
import {useNavigate, Link} from 'react-router-dom';
import './NavBar.css';

import {useContext} from "react";
import {AuthContext} from "../context/AuthContext.jsx";

function NavBar() {
    const navigate = useNavigate();
    const auth = useContext(AuthContext);

    return (
        <nav>
            <Link to="/">
              <span className="logo-container">
                <img src={logo} alt="logo"/>
                <h3>
                  Banana Security
                </h3>
              </span>
            </Link>

            <div>
                {auth.userIsAuthenticated ? (
                    // show logout button when user is Authenticated
                    <>
                        {/*grab user (email) and display in navbar*/}
                        <span className="userEmail">
                            Welkom, {auth?.user?.username}
                        </span>

                        <button
                            type="button"
                            onClick={() => {
                                navigate('/signedout');  //in the mounting of the SignOut page the auth.logout is called
                            }}
                        >
                            Log out
                        </button>
                    </>
                ) : (
                    // show default buttons
                    <>
                        <button
                            type="button"
                            onClick={() => navigate('/signin')}
                        >
                            Log in
                        </button>
                        <button
                            type="button"
                            onClick={() => navigate('/signup')}
                        >
                            Registreren
                        </button>
                    </>
                )}
            </div>
        </nav>
    );
}

export default NavBar;