import React from 'react';

import { Link, withRouter } from "react-router-dom";
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { compose } from 'redux';

class CardViewer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            side: false, // boolean to keep track of what side of card
            num: 0, // keeps track on what card we are on
            cardClicked: false, // boolean for progress bar
        };
    }

    switchSide = number => {
        this.setState( {side: !this.state.side }); // switches "side" boolean
        if (this.state.side){ // if it is front side
            document.getElementById("cardSide").innerHTML = "Front"; // show that card is on front side
            document.getElementById("cardContent").innerHTML = this.props.cards[(number)].front; // show content of card.front
        }
        else { // if it is now on back side, do the opposite
            document.getElementById("cardSide").innerHTML = "Back";
            document.getElementById("cardContent").innerHTML = this.props.cards[(number)].back;
        }
    }

    nextCard = () => {
        this.setState( {cardClicked: true} ); // allows progressBar to know that element has been rendered
        if (this.state.num !== (this.props.cards.length - 1)){ // makes sure it doesn't go out of bounds
            this.setState({ num: (this.state.num + 1), side: false }); // goes to next card and makes sure it is on front side
            document.getElementById("cardSide").innerHTML = "Front";
        }   
    }

    previousCard = () => {
        this.setState( {cardClicked: true} ); // allows progressBar to know that element has rendered
        if (this.state.num !== 0) { // makes sure not out of bounds
            this.setState({ num: (this.state.num - 1), side: false }); // goes to previous card and makes sure it is on front side
            document.getElementById("cardSide").innerHTML = "Front";
        }
    }
    
    progressBar = () => {
        if (this.state.cardClicked) { // makes sure that the element it is changing has rendered to not throw error
            document.getElementById("progress").innerHTML = "Card " + (this.state.num + 1) + "/" + this.props.cards.length;
            // updates progress bar to show what card it is on
        }
    }


    render() {
        if (!isLoaded(this.props.cards)) {
            return<div>Loading...</div>;
        }

        if (isEmpty(this.props.cards)) {
            return <div>Page Not Found</div>;
        }

        const number = this.state.num;
        const card = this.props.cards[(number)];
        this.progressBar(); // calls progress bar to appear

        
        return (
            <div>
                <h2>{ this.props.name }</h2>
                <div id="progress">First Card</div>
                <table onClick= {() => this.switchSide(number)}>
                    <thead>
                        <tr><th id="cardSide">Front</th></tr>
                    </thead>
                    <tbody>
                        <tr><td id="cardContent">{ card.front }</td></tr>
                    </tbody>
                </table>
                <br></br>
                <button onClick = {this.previousCard}> Backward </button>
                <button onClick = {this.nextCard}> Forward </button>
                <hr></hr>
                <br></br>
                <Link to="/">Go to Home</Link>
            </div>
        );
    }
}

const mapStateToProps = (state, props) => {
    console.log(state);
    const deck = state.firebase.data[props.match.params.deckId];
    const name = deck && deck.name;
    const cards = deck && deck.cards;
    return { cards: cards, name: name, };
}

export default compose(
    withRouter,
    firebaseConnect(props => {
        console.log('props', props);
        const deckId = props.match.params.deckId;
        return [{ path: `/flashcards/${deckId}`, storeAs: deckId }];
    }),
    connect(mapStateToProps),
)(CardViewer);