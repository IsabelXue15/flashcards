import React from 'react';

import { Link } from "react-router-dom";

function Homepage() {
    return (
        <div>
            <Link to="/editor">Go to Card Editor</Link>
            <br></br>
            <Link to="/viewer">Go to Card Viewer</Link>
        </div>
    );
}

export default Homepage;