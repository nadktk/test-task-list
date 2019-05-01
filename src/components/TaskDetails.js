import React, { Component } from "react";
import { PropTypes } from "prop-types";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Moment from "react-moment";
import { Link } from "react-router-dom";
import { updateTask } from "../actions/tasksActions";

class TaskDetails extends Component {
  handleKeyDown(e) {
    if (e.keyCode === 13) {
      e.preventDefault();
      e.target.blur();
    }
  }

  handleBlur(e) {
    const { id } = this.props.match.params;
    const { tasks, updateTask } = this.props;
    const task = tasks.find(task => String(task.id) === id);
    let newName = e.target.innerText.trim() || "Task";

    if (task.name !== newName) {
      const updatedTask = { ...task };
      updatedTask.name = newName;
      const newTasks = [];
      tasks.forEach(task => {
        if (String(task.id) === id) newTasks.push(updatedTask);
        else newTasks.push({ ...task });
      });
      updateTask(id, updatedTask, newTasks);
    }

    e.target.innerText = newName;
  }

  renderTaskName(name) {
    return (
      <h2>
        <i className="pencil icon grey small" />{" "}
        <span
          className="ui header blue"
          contentEditable={true}
          suppressContentEditableWarning={true}
          onBlur={this.handleBlur.bind(this)}
          onKeyDown={this.handleKeyDown}
        >
          {name}
        </span>
      </h2>
    );
  }

  renderPriority(isHighPriority) {
    return isHighPriority ? (
      <div className="ui vertical segment">
        <h3 className="ui header orange">
          {" "}
          <i className="flag icon small" />
          High Priority Task!
        </h3>
      </div>
    ) : null;
  }

  renderDescription(description) {
    return (
      <div className="ui vertical segment">
        <h3 className="ui header blue">Descrpiption:</h3>
        <p>{description ? description : "No description"}</p>
      </div>
    );
  }

  renderTags(tags) {
    return tags && Array.isArray(tags) && tags.length > 0 ? (
      <div className="ui vertical segment">
        <h3 className="ui header blue">Tags:</h3>
        <p>
          <i className="tag icon small grey" />
          {tags.join`, `}
        </p>
      </div>
    ) : null;
  }

  renderEffort(effort, type) {
    return effort ? (
      <div className="ui vertical segment">
        <h3 className="ui header blue">{type} Effort:</h3>
        <p>{effort}</p>
      </div>
    ) : null;
  }

  renderProgress(progress) {
    return progress ? (
      <div className="ui vertical segment center aligned">
        <div className="ui statistic">
          <div className="ui blue statistic">
            <div className="value">{progress + "%"}</div>
            <div className="label">Physical Progress</div>
          </div>
        </div>
      </div>
    ) : null;
  }

  renderDate(date, type) {
    return (
      <p>
        <strong>{type} Date:</strong>{" "}
        {date ? <Moment format="DD/MM/YYYY">{date}</Moment> : "No date"}
      </p>
    );
  }

  render() {
    const { id } = this.props.match.params;
    const { tasks } = this.props;
    const task = tasks.find(task => String(task.id) === id);

    // if (id === undefined || task === undefined) return <Redirect to="/404" />;

    return (
      <div className="ui vertical segment">
        <div className="ui container">
          <h1 className="ui header">Task Details</h1>
          <div className="ui divider" />
          {this.renderTaskName(task.name)}
          <div className="ui message">
            {this.renderPriority(task.is_high_priority)}
            {this.renderDescription(task.description)}
            {this.renderTags(task.tags)}
            {this.renderEffort(task.estimated_effort, "Estimated")}
            {this.renderEffort(task.actual_effort, "Actual")}
            {this.renderProgress(task.physical_progress)}
          </div>
          {this.renderDate(task.creation_date, "Creation")}
          {this.renderDate(task.due_date, "Due")}
          {this.renderDate(task.start_date, "Start")}

          <div className="ui divider" />
          <Link to="/" className="ui button primary">
            Back to Tasks List
          </Link>
        </div>
      </div>
    );
  }
}

TaskDetails.propTypes = {
  updateTask: PropTypes.func.isRequired,
  tasks: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  tasks: state.tasks
});

export default connect(
  mapStateToProps,
  { updateTask }
)(TaskDetails);
