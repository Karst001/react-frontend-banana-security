import React from 'react';
import {Routes, Route} from 'react-router-dom';
import NavBar from './components/NavBar';
import Profile from './pages/profile/Profile';
import Home from './pages/home/Home';
import SignIn from './pages/signin/SignIn';
import SignUp from './pages/signup/SignUp';
import SignedOut from './pages/signout/SignedOut';
import PrivateRoute from './components/PrivateRoute'; //this is a wrapper that checks if the user is authorized or not
import './App.css';

function App() {
    return (
        <>
            <NavBar/>
            <div className="content">
                <Routes>
                    <Route path="/" element={<Home/>}/>

                    {/*wrap the <Profile/> component inside the <PrivateRoute/> component to protect it from tampering*/}
                    <Route
                        path="/profile"
                        element={
                            <PrivateRoute>
                                <Profile/>
                            </PrivateRoute>
                        }
                    />

                    <Route path="/signin" element={<SignIn/>}/>
                    <Route path="/signup" element={<SignUp/>}/>
                    <Route path="/signedout" element={<SignedOut/>}/>
                </Routes>
            </div>
        </>
    );
}

export default App;
