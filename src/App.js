import React from 'react';
import CardEditor from './CardEditor';
import CardViewer from './CardViewer';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: [],
      editor: true,
    };
  }

  addCard = card => {
    const cardFront = card.front;
    const cardBack = card.back;
    if (cardFront === cardFront.trim() && cardBack === cardBack.trim()) {
      const cards = this.state.cards.slice().concat(card);
      this.setState({ cards });
    }
  };

  deleteCard = index => {
    const cards = this.state.cards.slice();
    cards.splice(index, 1);
    this.setState({ cards });
  }

  getCard = index => {
    return this.state.cards[index];
  }

  getAmount = () => {
    return this.state.cards.length;
  }

  switchMode = () => {
    if (this.state.cards.length !== 0) {
      this.setState({ editor: !this.state.editor });
    }
  }


  render() {
    if (this.state.editor) {
      return (
        <CardEditor 
          addCard={this.addCard} 
          cards={this.state.cards} 
          deleteCard={this.deleteCard}
          switchMode={this.switchMode} 
        />
      );
    }
    else {
      return <CardViewer switchMode={this.switchMode} getCard={this.getCard} getAmount={this.getAmount}/>;
    }
  }
}

export default App;
