import React, { Component } from 'react';
import firebase from 'firebase/app';
import 'firebase/database';
import AppBar from './AppBar';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {
  CssBaseline,
  CircularProgress,
  Typography,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Button
} from '@material-ui/core';

const styles = theme => ({
  container: {
    padding: theme.spacing.unit * 2
  }
});

class QuizContainer extends Component {
  state = {};
  componentDidMount = async () => {
    // Initialize Firebase
    const config = {
      apiKey: 'AIzaSyAz8vbYYqBYwqRo_Me4gzSaLAUQ3Dj--4c',
      authDomain: 'sassy-sensei.firebaseapp.com',
      databaseURL: 'https://sassy-sensei.firebaseio.com',
      projectId: 'sassy-sensei',
      storageBucket: 'sassy-sensei.appspot.com',
      messagingSenderId: '517378806197'
    };
    firebase.initializeApp(config);
    const snapshot = await firebase
      .database()
      .ref('/')
      .once('value');
    this.setState({ ...snapshot.val(), currentQuestion: 0, correctAnswers: 0 });
  };
  handleAnswerChoice = evt => {
    this.setState({ answerGiven: evt.target.value });
  };

  submitAnswer = () => {
    const {
      questions,
      currentQuestion,
      correctAnswers,
      answerGiven
    } = this.state;
    const correctAnswer = questions[currentQuestion].correctAnswer;

    if (answerGiven === correctAnswer) {
      this.setState({ correctAnswers: correctAnswers + 1 });
    }
    this.setState({ currentQuestion: currentQuestion + 1, answerGiven: null });
  };
  render() {
    const {
      questions,
      currentQuestion,
      answerGiven,
      correctAnswers
    } = this.state;
    const { classes } = this.props;

    let content;
    if (!questions) {
      content = <CircularProgress />;
    } else if (questions.length === currentQuestion) {
      content = (
        <Typography variant="h6" gutterBottom>
          Score: {correctAnswers} / {questions.length}
        </Typography>
      );
    } else if (questions) {
      content = (
        <React.Fragment>
          <Typography variant="subtitle1" gutterBottom>
            Question {currentQuestion + 1} / {questions.length}
          </Typography>
          <Typography variant="h6" gutterBottom>
            {questions[currentQuestion].question}
          </Typography>
          <FormControl component="fieldset" className={classes.formControl}>
            <RadioGroup
              aria-label="answer"
              name="answer"
              className={classes.group}
              value={answerGiven}
              onChange={this.handleAnswerChoice}
            >
              {Object.keys(questions[currentQuestion].answers).map(key => {
                const answer = questions[currentQuestion].answers[key];
                return (
                  <FormControlLabel
                    value={key}
                    key={key}
                    control={<Radio color="primary" />}
                    label={answer}
                  />
                );
              })}
            </RadioGroup>
            <Button
              variant="contained"
              size="medium"
              color="primary"
              onClick={() => this.submitAnswer()}
              disabled={!answerGiven}
            >
              Submit
            </Button>
          </FormControl>
        </React.Fragment>
      );
    }

    return (
      <React.Fragment>
        <CssBaseline />
        <AppBar />
        <div className={classes.container}>{content}</div>
      </React.Fragment>
    );
  }
}

QuizContainer.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(QuizContainer);
