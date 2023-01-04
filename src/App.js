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
    const cards = this.state.cards.slice().concat(card);
    this.setState({ cards });
  };

  deleteCard = index => {
    const cards = this.state.cards.slice();
    cards.splice(index, 1);
    this.setState({ cards });
  }

  getCard = index => {
    return this.state.cards[index];
  }

  switchMode = () => this.setState({ editor: !this.state.editor });


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
      return <CardViewer switchMode={this.switchMode} getCard={this.getCard}/>;
    }
  }
}

export default App;
