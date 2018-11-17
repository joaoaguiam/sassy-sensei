import React, { Component } from "react";
import "./App.css";
import QuizContainer from "./components/QuizContainer";

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <QuizContainer />
      </React.Fragment>
    );
  }
}

export default App;
