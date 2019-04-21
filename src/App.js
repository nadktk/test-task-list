import React, { Component } from "react";
import PropTypes from "prop-types";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import "./App.css";
import TasksList from "./components/TasksList";
import TaskDetails from "./components/TaskDetails";
import Default from "./components/Default";

import { getTasks } from "./actions/tasksActions";

class App extends Component {
  componentDidMount() {
    this.props.getTasks();
  }

  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={TasksList} />
          <Route exact path="/details/:id" component={TaskDetails} />
          <Route component={Default} />
        </Switch>
      </Router>
    );
  }
}

App.propTypes = {
  tasks: PropTypes.array.isRequired,
  getTasks: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  tasks: state.tasks
});

export default connect(
  mapStateToProps,
  { getTasks }
)(App);
