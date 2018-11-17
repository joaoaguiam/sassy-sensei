import React, { Component } from 'react';
import AppBar from './AppBar';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

const styles = theme => ({});

class QuizContainer extends Component {
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
