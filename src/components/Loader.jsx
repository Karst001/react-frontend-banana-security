import React from 'react';
import './Loader.css';

function Loader() {
    return (
        <div className="loader-container">
            <div className="spinner"></div>
            <p>Please be patient...</p>
        </div>
    );
}

export default Loader;