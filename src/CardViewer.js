import React from 'react';

class CardViewer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            number: 0,
            side: true,
        };
    }
    
    switchSide = () => {
        this.setState( {side: !this.state.side });
        if (this.state.side){
            console.log("true");
        }
    }

    getCard = index => this.props.getCard(index); 

    render() {
        let number = 0;
        const card = this.getCard(number);

        return (
            <div>
                <h2>Card Viewer</h2>
                <table>
                    <thead>
                        <tr><th>Side</th></tr>
                    </thead>
                    <tbody>
                        <tr><td>{ card.front }</td></tr>
                    </tbody>
                </table>
                <button onClick= {this.switchSide}>Flip</button>
                <br></br>
                <br></br>
                <button> Backward </button>
                <button> Forward </button>
                <hr></hr>
                <br></br>
                <button onClick={this.props.switchMode}>Go to Card Editor</button>
            </div>
        );
    }
}

export default CardViewer;