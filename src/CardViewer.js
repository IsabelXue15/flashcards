import React from 'react';

class CardViewer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            side: false,
            num: 0,
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
    let newIndex = this.state.num + 1;
    this.setState({ num: newIndex, side: false });
    document.getElementById("cardSide").innerHTML = "Front";
   }

    getCard = index => this.props.getCard(index); 

    render() {
        const number = this.state.num;
        const card = this.getCard(number);

        return (
            <div>
                <h2>Card Viewer</h2>
                <table>
                    <thead>
                        <tr><th id="cardSide">Front</th></tr>
                    </thead>
                    <tbody>
                        <tr><td id="cardContent">{ card.front }</td></tr>
                    </tbody>
                </table>
                <button onClick= {() => this.switchSide(number)}>Flip</button>
                <br></br>
                <br></br>
                <button> Backward </button>
                <button onClick = {this.nextCard}> Forward </button>
                <hr></hr>
                <br></br>
                <button onClick={this.props.switchMode}>Go to Card Editor</button>
            </div>
        );
    }
}

export default CardViewer;