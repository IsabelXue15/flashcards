import React from 'react';

import { Link } from "react-router-dom";
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { compose } from 'redux';

const Homepage = (props) => {

    if (!isLoaded(props.decks)) {
        return<div>Loading...</div>;
    }

    if(isEmpty(props.decks)) {
        return (
            <div>
                <h1>Flashcards</h1>
                <h3><Link to="/editor">Go to Card Editor</Link></h3>
                <br></br>
            </div>
        );
    }

    const nameList = Object.keys(props.decks).map((deckId, index) => {
    console.log(props.decks);
    return (
        <tr key={index}>
            <td><Link to={`/viewer/${deckId}`}>{ props.decks[deckId].name }</Link></td>
        </tr>
    );
    });

    return (
        <div>
            <h1>Flashcards</h1>
            <h3><Link to="/editor">Go to Card Editor</Link></h3>
            <br></br>
            <table>
                <thead><tr><th>My Decks</th></tr></thead>
                <tbody>{ nameList }</tbody>
            </table>
        </div>
    ); 
}

const mapStateToProps = (state) => {
    console.log(state.firebase.data);
    const decks = state.firebase.data.homepage;
    return { decks: decks };
}

export default compose(
    firebaseConnect(props => {
        console.log('props', props);
        return [{ path: "/homepage", storeAs: "homepage" }];
    }),
    connect(mapStateToProps),
)(Homepage);