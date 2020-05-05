import React, { Component } from "react";
import FriendCard from "./components/FriendCard/NostalgiaCard";
import Wrapper from "./components/Wrapper/Wrapper";
import Title from "./components/Title/Title";
import Nav from "./components/Nav/Nav";
import Message from "./components/Message/Message";
import Container from "./Container";
import friends from "./friends.json";


function shuffleFriends(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

class App extends Component {
  // Set this.state
  state = {
    friends,
    currentScore: 0,
    topScore: 0,
    rightWrong: "",
    clicked: [],
  };

  handleClick = id => {
    if (this.state.clicked.indexOf(id) === -1) {
      this.handleIncrement();
      this.setState({ clicked: this.state.clicked.concat(id) });
    } else {
      this.handleReset();
    }
  };

  handleIncrement = () => {
    const newScore = this.state.currentScore + 1;
    this.setState({
      currentScore: newScore,
      rightWrong: ""
    });
    if (newScore >= this.state.topScore) {
      this.setState({ topScore: newScore });
    }
    else if (newScore === 12) {
      this.setState({ rightWrong: "You win, totally tubular!" });
    }
    this.handleShuffle();
  };

  handleReset = () => {
    this.setState({
      currentScore: 0,
      topScore: this.state.topScore,
      rightWrong: "GAG ME WITH A SPOON! Click a card to restart.",
      clicked: []
    });
    this.handleShuffle();
  };

  handleShuffle = () => {
    let shuffledFriends = shuffleFriends(friends);
    this.setState({ friends: shuffledFriends });
  };

  render() {
    return (
      <Wrapper>
        <Nav
          title="Do you remember the 80s?"
          score={this.state.currentScore}
          topScore={this.state.topScore}
        />

        <Title>
          Try to click on each 80s icon, but don't hit any duplicates
        </Title>

        <Container>
            {this.state.friends.map(friend => (
              <div className="card-container">
                <FriendCard
                  key={friend.id}
                  handleClick={this.handleClick}
                  handleIncrement={this.handleIncrement}
                  handleReset={this.handleReset}
                  handleShuffle={this.handleShuffle}
                  id={friend.id}
                  image={friend.image}
                  />
              </div>
            ))}
        </Container>

        <Message
          rightWrong={this.state.rightWrong}
        />
      </Wrapper>
    );
  }
}

export default App;