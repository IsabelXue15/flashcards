import React from 'react';
// import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { firebaseConnect, isLoaded } from 'react-redux-firebase';
import { compose } from 'redux';

const Test = (props) => {
    if (!isLoaded(props.flashcards)) {
        return <div>Loading...</div>;
    }
    return <div> Hi</div>;
};

const mapStateToProps = state => {
    console.log(state);
    const flashcards = state.firebase.data.flashcards;
    return { flashcards: flashcards };
};

export default compose(
    firebaseConnect(["/flashcards"]), 
    connect(mapStateToProps),
)(Test);