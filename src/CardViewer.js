import React from 'react';

class CardViewer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            side: false,
            num: 0,
            cardClicked: false,
        };
    }

    switchSide = number => {
        this.setState( {side: !this.state.side });
        const cardFront = this.getCard(number).front;
        const cardBack = this.getCard(number).back;
        if (this.state.side){
            document.getElementById("cardSide").innerHTML = "Front";
            document.getElementById("cardContent").innerHTML = cardFront;
        }
        else {
            document.getElementById("cardSide").innerHTML = "Back";
            document.getElementById("cardContent").innerHTML = cardBack;
        }
    }

    nextCard = () => {
        this.setState( {cardClicked: true} );
        if (this.state.num !== (this.props.getAmount() - 1)){
            console.log(this.state.num);
            this.setState({ num: (this.state.num + 1), side: false });
            document.getElementById("cardSide").innerHTML = "Front";
        }   
    }

    previousCard = () => {
        this.setState( {cardClicked: true} );
        if (this.state.num !== 0) {
            this.setState({ num: (this.state.num - 1), side: false });
            document.getElementById("cardSide").innerHTML = "Front";
        }
        console.log(this.state.num);
    }
    
    progressBar = () => {
        if (this.state.cardClicked) {
            document.getElementById("progress").innerHTML = "Card " + (this.state.num + 1) + "/" + this.props.getAmount();
        }
    }

    getCard = index => this.props.getCard(index); 

    render() {
        const number = this.state.num;
        const card = this.getCard(number);
        this.progressBar();

        return (
            <div>
                <h2>Card Viewer</h2>
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
                <button onClick={this.props.switchMode}>Go to Card Editor</button>
            </div>
        );
    }
}

export default CardViewer;