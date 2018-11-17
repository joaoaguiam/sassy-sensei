import React, { Component } from 'react';
import firebase from 'firebase';
import AppBar from './AppBar';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

const styles = theme => ({});

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
    this.setState(snapshot.val());
  };

  render() {
    return (
      <React.Fragment>
        <CssBaseline />
        <AppBar />
        <div>Hello!</div>
      </React.Fragment>
    );
  }
}

QuizContainer.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(QuizContainer);
