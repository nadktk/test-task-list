import React, { Component } from "react";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import TasksListItem from "./TasksListItem";

class TasksList extends Component {
  showContent() {
    const { isLoading, tasks } = this.props;
    if (isLoading)
      return (
        <div className="ui active centered inline text loader">
          Loading tasks
        </div>
      );
    if (tasks.length > 0)
      return (
        <table className="ui celled padded center aligned table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Tags</th>
              <th>Actual Effort</th>
              <th>Estimated Effort</th>
              <th>Due Date</th>
            </tr>
          </thead>
          <tbody>
            {tasks
              .filter(task => task.obj_status === "active")
              .map(task => (
                <TasksListItem key={task.id} task={task} />
              ))}
          </tbody>
        </table>
      );
  }

  render() {
    return (
      <div className="ui vertical segment">
        <div className="ui container">
          <h1 className="ui header">Tasks List</h1>
          <div className="ui message">
            <p>
              This table shows all active tasks. Click on the task name to see
              all task details.
            </p>
          </div>
          {this.showContent()}
        </div>
      </div>
    );
  }
}

TasksList.propTypes = {
  tasks: PropTypes.array.isRequired,
  isLoading: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  tasks: state.tasks,
  isLoading: state.isLoading
});

export default connect(mapStateToProps)(TasksList);
